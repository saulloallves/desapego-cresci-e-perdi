import { useState, useCallback, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Instagram, Navigation, Share2, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo cresci-header.png";

const searchSchema = z.object({
  address: z.string().min(5, "Digite um endereço ou CEP válido"),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface NearestUnit {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  uf: string;
  postalCode: string;
  phone: string;
  instagram: string;
  latitude: number;
  longitude: number;
  distance: number;
}

interface ClientLocation {
  latitude: number;
  longitude: number;
  address: string;
}

interface RouteDetails {
  distance: string;
  duration: string;
  unit: NearestUnit;
  encodedPolyline: string;
}

const mapContainerStyle = {
  width: "100%",
  height: "600px", // Altura fixa para mobile
};

const defaultCenter = {
  lat: -15.7942,
  lng: -47.8822, // Centro do Brasil
};

const FindUnitPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSearching, setIsSearching] = useState(false);
  const [nearestUnits, setNearestUnits] = useState<NearestUnit[]>([]);
  const [clientLocation, setClientLocation] = useState<ClientLocation | null>(
    null
  );
  const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[]>([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<RouteDetails | null>(null);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const leadId = searchParams.get("leadId");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    language: "pt-BR",
    region: "BR",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  // Verificar se a chave API está configurada
  if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
    console.error(
      "VITE_GOOGLE_MAPS_API_KEY não está configurada no arquivo .env"
    );
  }

  // Log de erro do Google Maps
  if (loadError) {
    console.error("Erro ao carregar Google Maps:", loadError);
  }

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      address: "",
    },
  });

  const handleSearch = async (values: SearchFormValues) => {
    setIsSearching(true);
    setNearestUnits([]);
    setClientLocation(null);
    setRoutePath([]);
    setSelectedRoute(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const response = await fetch(
        `${supabaseUrl}/functions/v1/find-nearest-unit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            address: values.address,
            leadId,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao buscar unidade");
      }

      const data = await response.json();
      setNearestUnits(data.nearestUnits);
      setClientLocation(data.clientLocation);

      // Smooth zoom animation to client location
      if (map) {
        map.panTo({
          lat: data.clientLocation.latitude,
          lng: data.clientLocation.longitude,
        });
        
        // Gradually zoom in
        setTimeout(() => {
          map.setZoom(12);
        }, 500);
      } else {
        // Fallback if map is not loaded yet
        setMapCenter({
          lat: data.clientLocation.latitude,
          lng: data.clientLocation.longitude,
        });
      }

      toast({
        title: `${data.nearestUnits.length} unidades encontradas!`,
        description: `A mais próxima fica a ${data.nearestUnits[0].distance} km de você.`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro ao buscar unidade",
        description:
          error instanceof Error
            ? error.message
            : "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  // Helper function to decode Google's encoded polyline
  const decodePolyline = (encoded: string): google.maps.LatLngLiteral[] => {
    const poly: google.maps.LatLngLiteral[] = [];
    let index = 0;
    const len = encoded.length;
    let lat = 0;
    let lng = 0;

    while (index < len) {
      let b;
      let shift = 0;
      let result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({
        lat: lat / 1e5,
        lng: lng / 1e5,
      });
    }
    return poly;
  };

  const handleViewRoute = async (unit: NearestUnit) => {
    if (!clientLocation) return;

    setIsLoadingRoute(true);
    setRoutePath([]);

    try {
      // Call Google Routes API
      const response = await fetch(
        "https://routes.googleapis.com/directions/v2:computeRoutes",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
            "X-Goog-FieldMask":
              "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
          },
          body: JSON.stringify({
            origin: {
              location: {
                latLng: {
                  latitude: clientLocation.latitude,
                  longitude: clientLocation.longitude,
                },
              },
            },
            destination: {
              location: {
                latLng: {
                  latitude: unit.latitude,
                  longitude: unit.longitude,
                },
              },
            },
            travelMode: "DRIVE",
            routingPreference: "TRAFFIC_AWARE",
            computeAlternativeRoutes: false,
            languageCode: "pt-BR",
            units: "METRIC",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao calcular rota");
      }

      const data = await response.json();
      console.log("Routes API response:", data);

      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];

        // Convert distance from meters to km
        const distanceKm = (route.distanceMeters / 1000).toFixed(1);

        // Convert duration from seconds to readable format
        const durationSeconds = parseInt(route.duration.replace("s", ""));
        const hours = Math.floor(durationSeconds / 3600);
        const minutes = Math.floor((durationSeconds % 3600) / 60);
        const durationText =
          hours > 0 ? `${hours}h ${minutes}min` : `${minutes} min`;

        // Decode polyline from Routes API
        const encodedPolyline = route.polyline.encodedPolyline;
        const decodedPath = decodePolyline(encodedPolyline);
        console.log("Decoded path points:", decodedPath.length);

        setSelectedRoute({
          distance: `${distanceKm} km`,
          duration: durationText,
          unit,
          encodedPolyline,
        });

        // Set the route path to render on map
        setRoutePath(decodedPath);

        // Center map to show entire route
        if (map && decodedPath.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          decodedPath.forEach((point) => bounds.extend(point));
          map.fitBounds(bounds);
        }

        // Scroll to map on mobile/tablet
        if (mapContainerRef.current) {
          const isMobile = window.innerWidth < 1024; // lg breakpoint
          if (isMobile) {
            mapContainerRef.current.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }

        toast({
          title: "Rota calculada!",
          description: `${distanceKm} km · ${durationText}`,
        });
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      toast({
        title: "Erro ao calcular rota",
        description: "Não foi possível calcular a rota. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRoute(false);
    }
  };

  const handleShareRoute = async () => {
    if (!selectedRoute || !clientLocation) return;

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${clientLocation.latitude},${clientLocation.longitude}&destination=${selectedRoute.unit.latitude},${selectedRoute.unit.longitude}&travelmode=driving`;

    const shareData = {
      title: "Rota para " + selectedRoute.unit.name,
      text: `Rota até ${selectedRoute.unit.name} - ${selectedRoute.distance} · ${selectedRoute.duration}`,
      url: googleMapsUrl,
    };

    try {
      // Try Web Share API (works on mobile and modern browsers)
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Rota compartilhada!",
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(googleMapsUrl);
        toast({
          title: "Link copiado!",
          description:
            "O link da rota foi copiado para a área de transferência.",
        });
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Error sharing:", error);
        toast({
          title: "Erro ao compartilhar",
          description: "Não foi possível compartilhar a rota.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white backdrop-blur-sm shadow-sm z-50 border-b-2 border-primary">
        <div className="flex container mx-auto px-4 py-6 items-center justify-between">
          {/* Botão Voltar */}
          <a
            href="/"
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft size={24} />
            <span className="hidden md:inline font-semibold">Voltar</span>
          </a>

          {/* Logo */}
          <a href="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Cresci e Perdi" className="h-10 md:h-12" />
          </a>

          {/* Espaço vazio para manter o logo centralizado */}
          <div className="w-20 md:w-24"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-black text-3xl md:text-4xl lg:text-5xl text-primary mb-8 text-center">
          ENCONTRE A UNIDADE MAIS PRÓXIMA
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side - Form and Units List */}
          <div className="space-y-6 order-1 lg:order-1">
            <div className="bg-secondary/10 rounded-3xl p-8 shadow-lg">
              <h2 className="font-bold text-2xl mb-4">
                Digite seu endereço ou CEP
              </h2>
              <p className="text-muted-foreground mb-6">
                Vamos encontrar a unidade Cresci e Perdi mais perto de você para
                facilitar o seu desapego!
              </p>

              <form
                onSubmit={form.handleSubmit(handleSearch)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Input
                    placeholder="Ex: Rua das Flores, 123 ou 12345-678"
                    {...form.register("address")}
                    className="text-lg py-6"
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSearching}
                  className="w-full text-xl py-6"
                >
                  {isSearching ? "Buscando..." : "Encontrar Unidade"}
                </Button>
              </form>
            </div>

            {/* Units Info */}
            {nearestUnits.length > 0 && (
              <div className="space-y-4">
                {nearestUnits.map((unit, index) => (
                  <div
                    key={unit.id}
                    className={`bg-gradient-to-br ${
                      index === 0
                        ? "from-yellow-50 to-orange-50 border-2 border-yellow-400"
                        : index === 1
                        ? "from-green-50 to-slate-50 border-2 border-green-300"
                        : "from-amber-50 to-yellow-50 border-2 border-amber-300"
                    } rounded-3xl p-6 shadow-lg animate-fade-in-up`}
                  >
                    <div className="flex items-start gap-4">
                      {/* Ranking Badge */}
                      <div
                        className={`${
                          index === 0
                            ? "bg-yellow-500"
                            : index === 1
                            ? "bg-green-400"
                            : "bg-amber-600"
                        } text-white p-3 rounded-full font-bold text-xl w-12 h-12 flex items-center justify-center`}
                      >
                        {index + 1}º
                      </div>

                      <div className="flex-1">
                        <h3 className="font-bold text-xl text-primary mb-1">
                          {unit.name}
                        </h3>
                        <p className="text-sm">
                          📍 {unit.address}, {unit.neighborhood}
                        </p>
                        <p className="text-sm">
                          {unit.city} - {unit.uf} | CEP: {unit.postalCode}
                        </p>
                        <p className="text-accent font-bold text-lg mt-1">
                          📏 {unit.distance} km de você
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-4">
                      {unit.phone && (
                        <a
                          href={`https://wa.me/55${unit.phone.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors text-sm"
                        >
                          <Phone size={16} />
                          <span className="font-semibold">WhatsApp</span>
                        </a>
                      )}

                      {unit.instagram && (
                        <a
                          href={`https://instagram.com/${unit.instagram.replace(
                            "@",
                            ""
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-full transition-colors text-sm"
                        >
                          <Instagram size={16} />
                          <span className="font-semibold">Instagram</span>
                        </a>
                      )}

                      <button
                        onClick={() => handleViewRoute(unit)}
                        disabled={isLoadingRoute}
                        className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-full transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Navigation size={16} />
                        <span className="font-semibold">
                          {isLoadingRoute ? "Calculando..." : "Ver Rota"}
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Side - Map */}
          <div
            ref={mapContainerRef}
            className="order-2 lg:order-2 lg:sticky lg:top-4 lg:self-start"
          >
            <div className="rounded-3xl overflow-hidden shadow-lg bg-gray-100 min-h-[500px] lg:min-h-[600px]">
              {loadError ? (
                <div className="flex flex-col items-center justify-center gap-4 p-8 h-[500px] lg:h-[600px]">
                  <div className="text-destructive text-center">
                    <MapPin size={48} className="mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      Erro ao carregar o mapa
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Não foi possível carregar o Google Maps. Verifique se a
                      chave de API está configurada corretamente e se a API Maps
                      JavaScript está habilitada no Google Cloud Console.
                    </p>
                    <p className="text-xs text-muted-foreground mt-4">
                      Erro: {loadError.message}
                    </p>
                  </div>
                </div>
              ) : !isLoaded ? (
                <div className="flex items-center justify-center h-[500px] lg:h-[600px]">
                  <p className="text-muted-foreground">Carregando mapa...</p>
                </div>
              ) : (
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={mapCenter}
                  zoom={5}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                  options={{
                    streetViewControl: false,
                    mapTypeControl: true,
                    clickableIcons: false, // Remove ícones de POI (shoppings, restaurantes, etc)
                    controlSize: 30,
                    zoomControl: true,
                    fullscreenControl: false,
                    styles: [
                      {
                        featureType: "poi",
                        stylers: [{ visibility: "off" }], // Esconde todos os pontos de interesse
                      },
                      {
                        featureType: "transit",
                        stylers: [{ visibility: "off" }], // Esconde estações de metrô, trem, ônibus
                      },
                    ],
                  }}
                >
                  {/* Client Location Marker */}
                  {clientLocation && (
                    <Marker
                      position={{
                        lat: clientLocation.latitude,
                        lng: clientLocation.longitude,
                      }}
                      icon={{
                        url: "https://gzuotqtebrvvzakeoodd.supabase.co/storage/v1/object/public/Type/casa.png",
                        scaledSize: new google.maps.Size(30, 30), // Tamanho do ícone no mapa
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(15, 25), // Ancora o ícone no ponto correto (meio/base)
                      }}
                    />
                  )}

                  {/* Unit Markers - Different colors for 1st, 2nd, 3rd */}
                  {nearestUnits.map((unit, index) => (
                    <>
                      {/* Pin marker */}
                      <Marker
                        key={`pin-${unit.id}`}
                        position={{ lat: unit.latitude, lng: unit.longitude }}
                        icon={{
                          url:"https://gzuotqtebrvvzakeoodd.supabase.co/storage/v1/object/public/Type/cabeca-girafa.png",
                          scaledSize: new google.maps.Size(40, 40), // Tamanho do ícone no mapa
                          origin: new google.maps.Point(0, 0),
                          anchor: new google.maps.Point(20, 20), // Ancora o ícone no ponto correto (meio/base)
                        }}
                        title={`${index + 1}º - ${unit.name} (${
                          unit.distance
                        } km)`}
                      />
                    </>
                  ))}

                  {/* Route polyline from Routes API */}
                  {routePath.length > 0 && (
                    <Polyline
                      path={routePath}
                      options={{
                        strokeColor: "#2563eb", // Azul forte
                        strokeWeight: 6, // Linha grossa
                        strokeOpacity: 0.9,
                        geodesic: true,
                      }}
                    />
                  )}
                </GoogleMap>
              )}
            </div>
          </div>
        </div>

        {/* Route Details Section */}
        {selectedRoute && (
          <div className="container mx-auto px-4 mt-8 animate-fade-in-up">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-6 md:p-8 shadow-xl border-2 border-primary/20">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Route Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary text-primary-foreground p-3 rounded-full">
                      <Navigation size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-primary">
                        Rota Selecionada
                      </h3>
                      <p className="text-muted-foreground">
                        Destino: {selectedRoute.unit.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Distância
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {selectedRoute.distance}
                      </p>
                    </div>
                    <div className="bg-white/50 rounded-2xl p-4">
                      <p className="text-sm text-muted-foreground mb-1">
                        Tempo estimado
                      </p>
                      <p className="text-2xl font-bold text-accent">
                        {selectedRoute.duration}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-white/50 rounded-2xl">
                    <p className="text-sm text-muted-foreground mb-2">
                      📍 Endereço completo
                    </p>
                    <p className="font-semibold">
                      {selectedRoute.unit.address},{" "}
                      {selectedRoute.unit.neighborhood}
                    </p>
                    <p className="text-sm">
                      {selectedRoute.unit.city} - {selectedRoute.unit.uf} | CEP:{" "}
                      {selectedRoute.unit.postalCode}
                    </p>
                  </div>
                </div>

                {/* Share Button */}
                <div className="w-full md:w-auto">
                  <Button
                    onClick={handleShareRoute}
                    size="lg"
                    className="w-full md:w-auto text-lg gap-3 py-6 px-8 rounded-full"
                  >
                    <Share2 size={24} />
                    <span className="font-bold">Compartilhar Rota</span>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Compartilhe com amigos ou salve para depois
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FindUnitPage;

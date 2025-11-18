// @ts-nocheck
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };

interface FindNearestUnitRequest {
  address: string
  leadId?: string
}

interface Unit {
  id: string
  group_name: string
  fantasy_name: string
  address: string
  number_address: string
  neighborhood: string
  city: string
  state: string
  uf: string
  postal_code: string
  phone: string
  instagram_profile: string
  latitude?: number
  longitude?: number
}

// Haversine formula to calculate distance between two coordinates in km
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

async function geocodeAddress(address: string, apiKey: string): Promise<{ lat: number; lng: number } | null> {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
  
  console.log('Geocoding request:', {
    address,
    url: url.replace(apiKey, 'API_KEY_HIDDEN'),
    apiKeyLength: apiKey?.length || 0
  })
  
  const response = await fetch(url)
  const data = await response.json()

  console.log('Geocoding response:', {
    status: data.status,
    resultsCount: data.results?.length || 0,
    errorMessage: data.error_message,
    fullResponse: JSON.stringify(data)
  })

  if (data.status === 'OK' && data.results.length > 0) {
    const location = data.results[0].geometry.location
    console.log('Geocoding successful:', location)
    return { lat: location.lat, lng: location.lng }
  }
  
  console.error('Geocoding failed:', {
    status: data.status,
    errorMessage: data.error_message,
    results: data.results
  })
  
  return null
}

serve(async (req)=> {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { address, leadId }: FindNearestUnitRequest = await req.json()

    if (!address) {
      return new Response(
        JSON.stringify({ error: 'address is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Get secrets
    const googleApiKey = Deno.env.get('GOOGLE_MAPS_API_KEY')
    const matrizUrl = Deno.env.get('MATRIZ_SUPABASE_URL')
    const matrizKey = Deno.env.get('MATRIZ_SERVICE_ROLE_KEY')
    const localUrl = Deno.env.get('SUPABASE_URL')
    const localKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

    // Log available environment variables (for debugging)
    console.log('Environment check:', {
      hasGoogleApiKey: !!googleApiKey,
      hasMatrizUrl: !!matrizUrl,
      hasMatrizKey: !!matrizKey,
      hasLocalUrl: !!localUrl,
      hasLocalKey: !!localKey,
      googleApiKeyLength: googleApiKey?.length || 0,
      matrizUrlValue: matrizUrl || 'MISSING',
      localUrlValue: localUrl || 'MISSING'
    })

    const missingVars = []
    if (!googleApiKey) missingVars.push('GOOGLE_MAPS_API_KEY')
    if (!matrizUrl) missingVars.push('MATRIZ_SUPABASE_URL')
    if (!matrizKey) missingVars.push('MATRIZ_SERVICE_ROLE_KEY')

    if (missingVars.length > 0) {
      console.error('Missing environment variables:', missingVars)
      return new Response(
        JSON.stringify({ 
          error: 'Missing required environment variables',
          missing: missingVars,
          details: 'Check function logs for more information'
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 1. Geocode client address
    console.log('Starting geocoding for address:', address)
    const clientLocation = await geocodeAddress(address, googleApiKey)
    if (!clientLocation) {
      console.error('Geocoding failed for address:', address)
      return new Response(
        JSON.stringify({ error: 'Could not geocode the provided address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    console.log('Client location found:', clientLocation)

    // 2. Get active units from matriz (without lat/lng)
    console.log('Fetching active units from matriz...')
    const matrizClient = createClient(matrizUrl, matrizKey)
    const testMakeUnitId = 'c8d293c7-a23c-413b-a158-4f1f7ada5a91'
    const { data: units, error: unitsError } = await matrizClient
      .from('unidades')
      .select('id, group_name, fantasy_name, address, number_address, neighborhood, city, state, uf, postal_code, phone, instagram_profile')
      .eq('is_active', true)
      .eq('purchases_active', true)
      .neq('id', testMakeUnitId)

    if (unitsError) {
      console.error('Error fetching units:', unitsError)
      return new Response(
        JSON.stringify({ 
          error: 'Error fetching units from database',
          details: unitsError.message 
        }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Found ${units?.length || 0} active units`)

    if (!units || units.length === 0) {
      console.log('No active units found in database')
      return new Response(
        JSON.stringify({ error: 'No active units found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 3. Get cached coordinates from local database
    console.log('Fetching cached unit coordinates from local database...')
    const localClient = createClient(localUrl, localKey)
    const unitIds = units.map((u: Unit) => u.id)
    const { data: cachedLocations } = await localClient
      .from('unit_locations')
      .select('unit_id, latitude, longitude')
      .in('unit_id', unitIds)

    const locationMap = new Map()
    if (cachedLocations) {
      cachedLocations.forEach((loc: any) => {
        locationMap.set(loc.unit_id, { lat: loc.latitude, lng: loc.longitude })
      })
      console.log(`Found ${cachedLocations.length} cached unit locations`)
    }

    // 4. Geocode units that don't have cached lat/lng and calculate distances
    console.log('Calculating distances for units...')
    const unitsWithDistance = await Promise.all(
      units.map(async (unit: Unit) => {
        // Check if we have cached coordinates
        let unitCoords = locationMap.get(unit.id)
        let unitLat = unitCoords?.lat
        let unitLng = unitCoords?.lng

        // If unit doesn't have cached coordinates, geocode it
        if (!unitLat || !unitLng) {
          console.log(`Geocoding unit ${unit.group_name}...`)
          const fullAddress = `${unit.address}, ${unit.number_address}, ${unit.neighborhood}, ${unit.city}, ${unit.uf}, ${unit.postal_code}, Brazil`
          const unitLocation = await geocodeAddress(fullAddress, googleApiKey)
          if (unitLocation) {
            unitLat = unitLocation.lat
            unitLng = unitLocation.lng
            console.log(`Unit ${unit.group_name} geocoded:`, { lat: unitLat, lng: unitLng })
            
            // Save to local database for future use
            await localClient.from('unit_locations').upsert({
              unit_id: unit.id,
              latitude: unitLat,
              longitude: unitLng,
              address_geocoded: fullAddress
            })
            console.log(`Cached coordinates for unit ${unit.group_name}`)
          } else {
            console.warn(`Failed to geocode unit ${unit.group_name}`)
          }
        }

        const distance = unitLat && unitLng
          ? calculateDistance(clientLocation.lat, clientLocation.lng, unitLat, unitLng)
          : Infinity

        return {
          ...unit,
          latitude: unitLat,
          longitude: unitLng,
          distance,
        }
      })
    )

    // 5. Find 3 nearest units
    const sortedUnits = unitsWithDistance
      .filter(unit => unit.latitude && unit.longitude) // Only units with valid coordinates
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3) // Get top 3
    
    console.log(`Found ${sortedUnits.length} nearest units:`, 
      sortedUnits.map(u => ({ name: u.group_name, distance: u.distance }))
    )
    
    if (sortedUnits.length === 0) {
      console.error('No units with valid coordinates found')
      return new Response(
        JSON.stringify({ error: 'No units with valid coordinates found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // 5. Save client location if leadId provided
    if (leadId && localUrl && localKey) {
      console.log('Saving client location for leadId:', leadId)
      const localClient = createClient(localUrl, localKey)
      const { error: insertError } = await localClient.from('lead_locations').insert({
        lead_id: leadId,
        latitude: clientLocation.lat,
        longitude: clientLocation.lng,
        address_searched: address,
      })
      if (insertError) {
        console.error('Error saving client location:', insertError)
      } else {
        console.log('Client location saved successfully')
      }
    }

    // 6. Return result
    console.log('Returning successful response')
    return new Response(
      JSON.stringify({
        nearestUnits: sortedUnits.map(unit => ({
          id: unit.id,
          name: unit.fantasy_name || unit.group_name,
          address: `${unit.address}, ${unit.number_address}`,
          neighborhood: unit.neighborhood,
          city: unit.city,
          state: unit.state,
          uf: unit.uf,
          postalCode: unit.postal_code,
          phone: unit.phone,
          instagram: unit.instagram_profile,
          latitude: unit.latitude,
          longitude: unit.longitude,
          distance: Math.round(unit.distance * 10) / 10, // Round to 1 decimal
        })),
        clientLocation: {
          latitude: clientLocation.lat,
          longitude: clientLocation.lng,
          address,
        },
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('CRITICAL ERROR in find-nearest-unit function:', error)
    console.error('Error stack:', error.stack)
    console.error('Error message:', error.message)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message,
        type: error.name
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

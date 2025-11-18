// src/components/UnitInfoModal.tsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
  } from "@/components/ui/dialog";
  import { Button } from "./ui/button";
  import { Separator } from "./ui/separator";
  import {
    MapPin,
    Clock,
    Phone,
    Instagram,
    Building,
    Calendar,
  } from "lucide-react";
  
  interface Unit {
    id: string;
    name: string;
    address: string;
    number_address: string;
    neighborhood: string;
    city: string;
    state: string;
    uf: string;
    postalCode: string;
    phone: string;
    instagram: string;
    operation_mon: string;
    operation_tue: string;
    operation_wed: string;
    operation_thu: string;
    operation_fri: string;
    operation_sat: string;
    operation_sun: string;
  }
  
  interface UnitInfoModalProps {
    unit: Unit | null;
    isOpen: boolean;
    onClose: () => void;
  }
  
  const UnitInfoModal = ({ unit, isOpen, onClose }: UnitInfoModalProps) => {
    if (!unit) return null;
  
    // Adicionando log para depuração
    console.log("Dados recebidos pelo modal:", unit);

    const operationHours = [
      { day: "Segunda-feira", time: unit.operation_mon },
      { day: "Terça-feira", time: unit.operation_tue },
      { day: "Quarta-feira", time: unit.operation_wed },
      { day: "Quinta-feira", time: unit.operation_thu },
      { day: "Sexta-feira", time: unit.operation_fri },
      { day: "Sábado", time: unit.operation_sat },
      { day: "Domingo", time: unit.operation_sun },
    ];
  
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-primary">
              {unit.name}
            </DialogTitle>
            <DialogDescription>
              Informações detalhadas da unidade.
            </DialogDescription>
          </DialogHeader>
  
          <Separator />
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
            {/* Left Column: Address */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="text-primary" size={24} />
                <h3 className="font-bold text-lg">Endereço</h3>
              </div>
              <div className="pl-9 space-y-2 text-sm">
                <p>
                  {unit.address}, {unit.number_address}
                </p>
                <p>{unit.neighborhood}</p>
                <p>
                  {unit.city} - {unit.uf}
                </p>
                <p>CEP: {unit.postalCode}</p>
              </div>
            </div>
  
            {/* Right Column: Operation Hours */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="text-primary" size={24} />
                <h3 className="font-bold text-lg">Horário de Funcionamento</h3>
              </div>
              <div className="pl-9 space-y-2 text-sm">
                {operationHours.map((item) => (
                  <div key={item.day} className="flex justify-between">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-semibold">
                      {item.time || "Fechado"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <Separator />
  
          <DialogFooter>
            <Button onClick={onClose} variant="outline">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default UnitInfoModal;
  
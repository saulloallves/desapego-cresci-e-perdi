import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLead } from "@/lib/leads";
import { useToast } from "@/hooks/use-toast";
import banner from "@/assets/banner.png";

const Hero = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleDesapegarClick = async () => {
    setIsRedirecting(true);
    try {
      const newLead = await createLead({
        type: "sell_items",
        sourceSection: "hero_banner",
      });
      navigate(`/encontrar-unidade?leadId=${newLead.id}`);
    } catch (error) {
      console.error("Failed to create lead:", error);
      toast({
        title: "Erro",
        description: "Não foi possível iniciar o processo. Tente novamente.",
        variant: "destructive",
      });
      setIsRedirecting(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden pt-16 md:pt-20">
      <div
        onClick={!isRedirecting ? handleDesapegarClick : undefined}
        className={`cursor-pointer hover:opacity-95 transition-opacity duration-300 w-full ${
          isRedirecting ? "opacity-70 cursor-wait" : ""
        }`}
      >
        <img
          src={banner}
          alt="Não serve mais para seus filhos? Nós compramos!"
          className="w-full h-auto object-contain"
        />
      </div>
    </section>
  );
};
export default Hero;
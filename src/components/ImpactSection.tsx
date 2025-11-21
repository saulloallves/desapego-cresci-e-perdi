import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { createLead } from "@/lib/leads";
import { useToast } from "@/hooks/use-toast";
import lojaGirafa from "@/assets/loja-girafa.png";

const ImpactSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleDesapegarClick = async () => {
    setIsRedirecting(true);
    try {
      const newLead = await createLead({
        type: "sell_items",
        sourceSection: "impact_section_cta",
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

  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: finalRef, isVisible: finalVisible } = useIntersectionObserver();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Título centralizado */}
        <div ref={titleRef} className="text-center mb-12">
          <h2
            className={`font-black text-4xl md:text-5xl lg:text-6xl text-primary mb-8 transition-all duration-700 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            O IMPACTO DO DESAPEGO
          </h2>
        </div>
        <div
          ref={finalRef}
          className={`bg-gradient-to-br from-accent/30 to-secondary/30 rounded-3xl p-4 md:p-8 lg:p-10 shadow-lg border-2 border-accent/30 transition-all duration-700 ${
            finalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-center">
            {/* Imagem à esquerda */}
            <div className="flex justify-center lg:justify-center">
              <img
                src={lojaGirafa}
                alt="Loja Cresci e Perdi"
                className="w-full max-w-[250px] md:max-w-xs lg:max-w-sm"
              />
            </div>

            {/* Texto e botão à direita */}
            <div className="flex flex-col justify-center items-center text-center gap-4 md:gap-6 lg:gap-10">
              <p className="text-lg md:text-2xl lg:text-4xl font-display text-secondary uppercase font-black leading-tight">
                Venha fazer parte dessa transformação!
              </p>
              <p className="text-sm md:text-base lg:text-xl leading-relaxed font-semibold px-2">
                A Cresci e Perdi acredita que o desapego é uma forma de crescer e
                transformar. Ele traz não só benefícios materiais, mas também o
                sentimento de fazer parte de algo maior.
              </p>
              <Button
                onClick={handleDesapegarClick}
                disabled={isRedirecting}
                size="lg"
                className="w-full lg:w-auto font-black bg-[#00aeff] hover:bg-[#00aeff]/90 text-primary-foreground font-display text-base md:text-xl lg:text-2xl px-6 md:px-10 py-4 md:py-6 lg:py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
              >
                {isRedirecting ? "Aguarde..." : "CLIQUE AQUI E DESAPEGUE!"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

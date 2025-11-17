import { Button } from "@/components/ui/button";
import { Store, TrendingUp, Users, Heart } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const FranchiseSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver();
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const benefits = [
    {
      icon: Store,
      title: "Modelo Testado",
      description: "Sistema de franquia comprovado e em expansão",
    },
    {
      icon: TrendingUp,
      title: "Negócio Sustentável",
      description: "Mercado em crescimento com propósito social",
    },
    {
      icon: Users,
      title: "Suporte Completo",
      description: "Acompanhamento e treinamento contínuo",
    },
    {
      icon: Heart,
      title: "Faça a Diferença",
      description: "Transforme vidas na sua comunidade",
    },
  ];

  return (
    <section id="franquia" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título com fade-in */}
          <div ref={titleRef} className="text-center mb-12">
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-6 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              SEJA UM FRANQUEADO
            </h2>
            <p className={`text-xl md:text-2xl text-foreground font-semibold transition-all duration-700 delay-150 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Quer abrir uma unidade Cresci e Perdi na sua cidade?
            </p>
          </div>

          {/* Card principal com slide-up */}
          <div 
            ref={contentRef}
            className={`bg-gradient-to-br from-secondary/10 to-accent/10 rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] mb-12 transition-all duration-700 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed text-center mb-8">
              Faça parte de um movimento que une propósito e lucratividade!
              A franquia Cresci e Perdi é uma oportunidade de empreender
              com impacto social, ajudando famílias e promovendo uma economia
              mais consciente e sustentável.
            </p>

            {/* Grid de benefícios com animação escalonada */}
            <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const delay = index * 100;
                return (
                  <div
                    key={index}
                    className="bg-background rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-700"
                    style={{
                      transitionDelay: `${delay}ms`,
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full flex-shrink-0">
                        <Icon size={28} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-primary mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-base text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA com scale-in */}
            <div 
              ref={ctaRef}
              className={`text-center transition-all duration-700 delay-400 ${
                ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <Button
                size="lg"
                onClick={() => {
                  if ((window as any).Typebot) {
                    (window as any).Typebot.open();
                  }
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
              >
                SEJA UM FRANQUEADO
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                Entre em contato e descubra como levar essa transformação
                para sua região!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FranchiseSection;

import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { LeadFormDialog } from "@/components/LeadFormDialog";
import lojaGirafa from "@/assets/loja-girafa.png";

const ImpactSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();
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
          className={`bg-gradient-to-br from-accent/30 to-secondary/30 rounded-3xl p-8 md:p-10 shadow-lg border-2 border-accent/30 transition-all duration-700 ${
            finalVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-0 items-center">
            {/* Imagem à esquerda */}
            <div className="flex justify-center lg:justify-center">
              <img
                src={lojaGirafa}
                alt="Loja Cresci e Perdi"
                className="w-full max-w-sm"
              />
            </div>

            {/* Texto e botão à direita */}
            <div className="justify-center items-center text-center" style={{ gap: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              <p className="text-base md:text-lg lg:text-xl leading-relaxed font-semibold mb-6">
                A Cresci e Perdi acredita que o desapego é uma forma de crescer e
                transformar. Ele traz não só benefícios materiais, mas também o
                sentimento de fazer parte de algo maior: a construção de um futuro
                mais consciente para todos.
              </p>
              <p className="text-xl md:text-2xl lg:text-3xl font-display text-primary mb-6">
                Venha fazer parte dessa transformação!
              </p>
              <LeadFormDialog
                type="sell_items"
                sourceSection="impact_section"
                trigger={
                  <Button
                    size="lg"
                    className="w-full lg:w-auto font-black bg-secondary hover:bg-secondary/90 text-primary-foreground font-display text-xl md:text-2xl px-10 py-6 md:py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
                  >
                    CLIQUE AQUI!
                  </Button>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

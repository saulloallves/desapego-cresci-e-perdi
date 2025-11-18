import { Button } from "@/components/ui/button";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { LeadFormDialog } from "@/components/LeadFormDialog";

const ImpactSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();
  const { ref: finalRef, isVisible: finalVisible } = useIntersectionObserver();

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Impact Text */}
        {/* Título com fade-in */}
        <div ref={titleRef} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8 transition-all duration-700 ${
            titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            O IMPACTO DO DESAPEGO
          </h2>
          
          <div 
            ref={textRef}
            className={`bg-curve-bg rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] wavy-bg transition-all duration-700 delay-200 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed">
              Ao desapegar com a Cresci e Perdi, você ajuda outras famílias
              a acessarem produtos de qualidade, com economia e sem abrir mão
              de bons materiais para seus filhos. O desapego vai além do simples
              ato de "deixar ir", ele é um ato de generosidade, que envolve a
              solidariedade de compartilhar o que já não serve mais para
              alguém que precisa.
            </p>
          </div>
        </div>

        {/* CTA com gradient - slide-up */}
        <div 
          ref={ctaRef}
          className={`relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)] mb-16 transition-all duration-700 ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-30'
          }`}
        >
          <div className="relative bg-gradient-to-br from-primary via-accent/50 to-accent min-h-[400px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            <div className="relative z-10 text-center px-4 py-12">
              <div className="bg-secondary/95 backdrop-blur-sm text-secondary-foreground inline-block px-8 py-6 mr-5 rounded-2xl shadow-lg mb-6 transform -rotate-1">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl">
                  A UNIDADE MAIS PRÓXIMA
                  <br />
                  PARA VOCÊ DESAPEGAR
                </p>
              </div>
              
              <LeadFormDialog
                type="sell_items"
                sourceSection="impact_section"
                trigger={
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground font-display ml-5 text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform transform rotate-1"
                  >
                    CLIQUE AQUI!
                  </Button>
                }
              />
            </div>
          </div>
        </div>

        {/* Transform Message */}
        {/* Mensagem final com scale-in */}
        <div ref={finalRef} className="max-w-4xl mx-auto text-center">
          <div className={`bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl p-8 md:p-12 shadow-lg border-2 border-accent/30 transition-all duration-700 ${
            finalVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <p className="text-lg md:text-xl leading-relaxed font-semibold">
              A Cresci e Perdi acredita que o desapego é uma forma de crescer
              e transformar. Ele traz não só benefícios materiais, mas também
              o sentimento de fazer parte de algo maior: a construção
              de um futuro mais consciente para todos.
            </p>
            <p className="text-2xl md:text-3xl font-display text-primary mt-6">
              Venha fazer parte dessa transformação! 🦒 💛
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;

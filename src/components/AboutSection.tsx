import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const AboutSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: contentRef, isVisible: contentVisible } = useIntersectionObserver();
  const { ref: cardRef, isVisible: cardVisible } = useIntersectionObserver();

  return (
    <section id="sobre" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          {/* Títulos com fade-in */}
          <div ref={titleRef}>
            <h2 className={`font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-4 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              O DESAPEGO DA CRESCI E PERDI
            </h2>
            <h3 className={`font-display text-2xl md:text-3xl lg:text-4xl text-secondary mb-8 transition-all duration-700 delay-150 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              DÊ UM NOVO CICLO PARA O QUE NÃO SERVE MAIS
            </h3>
          </div>

          {/* Card principal com slide-up */}
          <div 
            ref={contentRef}
            className={`bg-curve-bg rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] wavy-bg transition-all duration-700 ${
              contentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-foreground">
              Na Cresci e Perdi, o desapego é muito mais do que simplesmente se livrar
              de itens que já não têm mais uso. Nosso conceito de desapego é baseado na
              ideia de renovação. Cada peça que passa pelas nossas mãos tem uma nova
              chance de transformar a vida de outra pessoa em forma de economia.
            </p>

            {/* Card interno com delay */}
            <div 
              ref={cardRef}
              className={`bg-background rounded-2xl p-6 md:p-8 shadow-md transition-all duration-700 delay-300 ${
                cardVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            >
              <h4 className="font-bold text-xl md:text-2xl text-primary mb-4">
                Desapegar é valorizar:
              </h4>
              <p className="text-base md:text-lg leading-relaxed text-foreground">
                sabemos que cada item, desde um simples par de sapatos
                até um brinquedo querido, carrega histórias e memórias. Quando você traz
                esses objetos para a Cresci e Perdi, está nos permitindo dar a eles um novo propósito,
                fazendo com que eles continuem a cumprir a função para a qual foram criados,
                mas agora com um novo dono e uma nova vida.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

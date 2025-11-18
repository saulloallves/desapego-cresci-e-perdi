import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { LeadFormDialog } from "./LeadFormDialog";
import { Button } from "@/components/ui/button";
import mockup from "@/assets/mockup-girafa.png";

const AboutSection = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: contentRef, isVisible: contentVisible } =
    useIntersectionObserver();
  const { ref: cardRef, isVisible: cardVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  return (
    <section id="sobre" className="py-15 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto text-center">
          {/* Títulos com fade-in */}
          <div ref={titleRef}>
            <h2
              className={`pt-6 md:pt-0 lg:pt-0 text-4xl md:text-5xl lg:text-6xl text-[#ff0000] mb-4 font-black transition-all duration-700 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              O DESAPEGO DA CRESCI E PERDI
            </h2>
            <h3
              className={`font-black text-2xl md:text-3xl lg:text-4xl text-[#00aeff] mb-8 transition-all duration-700 delay-150 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              DÊ UM NOVO CICLO PARA O QUE NÃO SERVE MAIS
            </h3>
          </div>

          {/* Card principal com slide-up */}
          <div
            ref={contentRef}
            className={`bg-curve-bg rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] wavy-bg transition-all duration-700 ${
              contentVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-foreground">
              Você já sentiu isso? Seu filho cresceu, as roupinhas não servem mais, 
              o armário mal fecha. E aí, você olha e pensa: aquele macacão que ele 
              usou só uma vez, o brinquedo que arrancava risadas, o sapatinho do 
              primeiro passo... tudo ali, parado, mas cheio de lembranças.
            </p>

            {/* Card interno com delay */}
            <div
              ref={cardRef}
              className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-md transition-all duration-700 delay-300 ${
                cardVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <h4 className="font-extrabold text-xl md:text-2xl text-secondary mb-4">
                E se essas histórias pudessem continuar em outro lugar?
              </h4>
              <p className="text-base md:text-2xl leading-relaxed text-[#00aeff] font-bold">
                Esse é o propósito da Cresci e Perdi: fazer esses itens que marcaram momentos girarem.
              </p>
            </div>
          </div>
          {/* CTA com gradient - slide-up */}
          <div
            ref={ctaRef}
            className={`relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)] mt-16 transition-all duration-700 ${
              ctaVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-30"
            }`}
          >
            <div className="relative bg-gradient-to-br from-secondary via-accent to-accent/80">
              {/* Decorative Blobs */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl"></div>
              
              {/* Decorative Pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>

              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center px-6 md:px-12 py-12 md:py-16">
                {/* Lado Esquerdo - Texto e Botão */}
                <div className="flex flex-col items-center lg:items-start justify-center space-y-6 md:space-y-8 text-center lg:text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
                    <span className="text-2xl">🎯</span>
                    <span className="font-bold text-primary text-sm md:text-base">
                      Encontre a unidade ideal
                    </span>
                  </div>

                  {/* Título Principal */}
                  <div className="w-full">
                    <h3 className="font-black text-3xl md:text-5xl lg:text-6xl text-white mb-4 leading-tight drop-shadow-lg">
                      Pronto para
                      <br />
                      <span className="text-primary bg-white px-4 py-1 rounded-lg inline-block transform -rotate-2">
                        Desapegar?
                      </span>
                    </h3>
                    <p className="text-white/90 text-base md:text-lg lg:text-xl font-medium">
                      A unidade mais próxima está esperando por você!
                    </p>
                  </div>

                  {/* CTA Button com ícone */}
                  <LeadFormDialog
                    type="sell_items"
                    sourceSection="about_section"
                    trigger={
                      <Button
                        size="lg"
                        className="w-full lg:w-auto group bg-primary hover:bg-primary/90 text-white font-black text-lg md:text-xl lg:text-2xl px-8 md:px-10 py-6 md:py-8 h-auto rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <span>ENCONTRAR UNIDADE</span>
                        <span className="text-2xl md:text-3xl group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </Button>
                    }
                  />

                  {/* Features */}
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4 text-white/90">
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl">✓</span>
                      <span className="font-medium text-sm md:text-base">Rápido e fácil</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl">✓</span>
                      <span className="font-medium text-sm md:text-base">Atendimento próximo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg md:text-xl">✓</span>
                      <span className="font-medium text-sm md:text-base">Dinheiro na hora</span>
                    </div>
                  </div>
                </div>

                {/* Lado Direito - Mascote Girafa */}
                <div className="flex lg:hidden justify-center items-center mt-8">
                  <div className="relative max-w-xs">
                    {/* Versão mobile simplificada */}
                    <div className="relative">
                      <img 
                        src={mockup} 
                        alt="Mascote Cresci e Perdi" 
                        className="w-full object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop - Mascote Girafa */}
                <div className="hidden lg:flex justify-center items-center">
                  <div className="relative">
                    {/* Círculo decorativo atrás */}
                    <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl scale-110"></div>
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/30 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/40 rounded-full blur-xl"></div>
                    
                    {/* Imagem do Mascote */}
                    <div className="relative animate-float">
                      <img 
                        src={mockup} 
                        alt="Mascote Cresci e Perdi" 
                        className="w-full max-w-sm object-contain drop-shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

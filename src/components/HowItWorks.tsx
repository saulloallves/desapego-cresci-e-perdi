import { Sparkles, Heart, Home } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import moeda from "@/assets/moeda.png";

const HowItWorks = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const benefits = [
    {
      icon: "moeda",
      title: "GIRA",
      description:
        "Ao vender, você recebe em PIX, ou em GIRA, crédito da Cresci e Perdi que vale mais que dinheiro, e ele pode ser usado na compra de novos itens nas lojas.",
    },
    {
      icon: Sparkles,
      title: "Variedade de Itens",
      description:
        "Compramos tudo do universo infantil: roupas, calçados e brinquedos infantis em ótimo estado, para que outras famílias possam aproveitar.",
    },
    {
      icon: Home,
      title: "Facilidade no Desapego",
      description: "Ao chegar na loja, nossa equipe cuida de todo o processo de avaliação e compra dos seus itens, tornando tudo rápido e simples para você.",
    },
    {
      icon: Heart,
      title: "Ajude outras famílias",
      description:
        "O que para você já não tem uso, pode ser exatamente o que outra pessoa estava procurando, você contribui com um família e ainda ganha espaço em casa.",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-curve-bg wavy-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título com fade-in */}
          <div ref={titleRef} className="text-center mb-12">
            <h2
              className={`font-black text-4xl md:text-5xl lg:text-6xl text-primary mb-8 transition-all duration-700 ${
                titleVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              COMO FUNCIONA O DESAPEGO?
            </h2>
          </div>

          {/* Card de texto com slide-up */}
          <div
            ref={textRef}
            className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] mb-12 transition-all duration-700 ${
              textVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed text-center mb-8">
              Fazer isso é muito fácil: Separa tudo que os seus filhos não usam
              mais, leva até a loja mais próxima e pronto! <br></br>Você recebe PIX na
              hora, ou <span className="font-bold text-secondary">GIRA</span>, que vale mais do que dinheiro, e para quem
              quer só comprar, esse é o lugar para você economizar.
            </p>

            {/* Grid de benefícios com animação escalonada */}
            <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const delay = index * 100;
                return (
                  <div
                    key={index}
                    className="bg-curve-bg rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-700"
                    style={{
                      transitionDelay: `${delay}ms`,
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {benefit.icon === "moeda" ? (
                        <div className="p-0 rounded-full flex-shrink-0">
                          <img 
                            src={moeda} 
                            alt="Giracrédito" 
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                      ) : (
                        <div className="bg-[#00aeff] text-white p-3 rounded-full flex-shrink-0">
                          {benefit.icon === Sparkles && <Sparkles size={24} />}
                          {benefit.icon === Home && <Home size={24} />}
                          {benefit.icon === Heart && <Heart size={24} />}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-xl text-primary mb-2">
                          {benefit.title}
                        </h4>
                        <p className="text-base leading-relaxed text-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

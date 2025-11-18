import { Coins, Sparkles, Heart, Home } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

const HowItWorks = () => {
  const { ref: titleRef, isVisible: titleVisible } = useIntersectionObserver();
  const { ref: textRef, isVisible: textVisible } = useIntersectionObserver();
  const { ref: cardsRef, isVisible: cardsVisible } = useIntersectionObserver();
  const { ref: ctaRef, isVisible: ctaVisible } = useIntersectionObserver();

  const benefits = [
    {
      icon: Coins,
      title: "Economize",
      description: "ao vender seus itens seminovos, você ganha um valor que pode ser usado para renovar o guarda-roupa ou a brinquedoteca dos seus filhos.",
    },
    {
      icon: Sparkles,
      title: "Ganhe espaço",
      description: "seu armário fica mais organizado, com apenas o que realmente é necessário.",
    },
    {
      icon: Home,
      title: "Dê um novo propósito",
      description: "seus itens ganham uma nova chance.",
    },
    {
      icon: Heart,
      title: "Ajude outras famílias",
      description: "o que para você já não tem uso, pode ser exatamente o que outra pessoa estava procurando.",
    },
  ];

  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-curve-bg wavy-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Título com fade-in */}
          <div ref={titleRef} className="text-center mb-12">
            <h2 className={`font-black text-4xl md:text-5xl lg:text-6xl text-primary mb-8 transition-all duration-700 ${
              titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              COMO FUNCIONA O DESAPEGO?
            </h2>
          </div>

          {/* Card de texto com slide-up */}
          <div 
            ref={textRef}
            className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] mb-12 transition-all duration-700 ${
              textVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed text-center mb-8">
              Desapegar com a Cresci e Perdi é simples e vantajoso! Ao trazer seus
              itens seminovos, como roupas, calçados e brinquedos infantis, para uma
              de nossas lojas, você tem a oportunidade de receber dinheiro ou
              giracrédito na loja para adquirir novos produtos, que passaram por uma
              curadoria de qualidade e estão disponíveis por preços mais acessíveis.
            </p>

            {/* Grid de benefícios com animação escalonada */}
            <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                const delay = index * 100;
                return (
                  <div
                    key={index}
                    className="bg-curve-bg rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-700"
                    style={{
                      transitionDelay: `${delay}ms`,
                      opacity: cardsVisible ? 1 : 0,
                      transform: cardsVisible ? 'translateY(0)' : 'translateY(20px)'
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-accent text-accent-foreground p-3 rounded-full flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl text-primary mb-2">
                          {benefit.title}:
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

          {/* CTA final com scale-in */}
          <div 
            ref={ctaRef}
            className={`bg-secondary text-secondary-foreground rounded-3xl p-8 md:p-12 shadow-lg text-center transition-all duration-700 ${
              ctaVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <p className="text-lg md:text-xl leading-relaxed">
              Esse processo não só beneficia você financeiramente, mas também
              contribui com um ciclo de consumo mais consciente e duradouro.
              Ao escolher a Cresci e Perdi, você faz parte de um movimento que
              promove uma economia mais circular, onde nada é descartado sem
              antes ser reutilizado e valorizado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

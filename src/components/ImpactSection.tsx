import { Button } from "@/components/ui/button";
import ctaImage from "@/assets/cta-final.png";

const ImpactSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Impact Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mb-8">
            O IMPACTO DO DESAPEGO
          </h2>
          
          <div className="bg-curve-bg rounded-3xl p-8 md:p-12 shadow-[var(--shadow-soft)] wavy-bg">
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

        {/* CTA with Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-strong)] mb-16">
          <div 
            className="relative bg-cover bg-center min-h-[400px] flex items-center justify-center"
            style={{ backgroundImage: `url(${ctaImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
            
            <div className="relative z-10 text-center px-4 py-12">
              <div className="bg-secondary/95 backdrop-blur-sm text-secondary-foreground inline-block px-8 py-6 rounded-2xl shadow-lg mb-6 transform -rotate-1">
                <p className="font-display text-2xl md:text-3xl lg:text-4xl">
                  A UNIDADE MAIS PRÓXIMA
                  <br />
                  PARA VOCÊ DESAPEGAR
                </p>
              </div>
              
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform transform rotate-1"
              >
                <a
                  href="https://crescieperdi.com.br/unidades"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CLIQUE AQUI!
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Transform Message */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-3xl p-8 md:p-12 shadow-lg border-2 border-accent/30">
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

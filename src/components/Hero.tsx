import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-background/90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Main Message */}
          <div className="text-center lg:text-left">
            <div className="bg-primary text-primary-foreground inline-block px-8 py-4 rounded-2xl shadow-[var(--shadow-strong)] mb-6 transform -rotate-1">
              <h1 className="font-display text-3xl md:text-5xl lg:text-6xl leading-tight">
                NÃO SERVE MAIS
                <br />
                PARA SEUS FILHOS?
              </h1>
            </div>
            <div className="bg-background text-foreground inline-block px-8 py-4 rounded-2xl shadow-lg transform rotate-1">
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-primary">
                NÓS COMPRAMOS!
              </h2>
            </div>
          </div>

          {/* Right Side - CTA */}
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="bg-secondary text-secondary-foreground px-8 py-6 rounded-2xl shadow-lg text-center transform rotate-1">
              <p className="font-bold text-xl md:text-2xl mb-4">
                A UNIDADE MAIS PRÓXIMA
                <br />
                PARA VOCÊ DESAPEGAR
              </p>
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
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
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" className="w-full h-20 fill-background">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;

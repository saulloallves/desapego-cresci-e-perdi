import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section className="relative py-16 md:py-20 lg:py-24 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-primary"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Main Message */}
          <div className="text-center lg:text-left animate-fade-in-up">
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
          <div className="flex flex-col items-center lg:items-end gap-6" style={{
          animation: "fade-in-up 0.6s ease-out 0.3s both"
        }}>
            <div className="bg-secondary text-secondary-foreground px-8 py-6 rounded-2xl shadow-lg text-center transform rotate-1">
              <p className="font-bold text-xl md:text-2xl mb-4">
                A UNIDADE MAIS PRÓXIMA
                <br />
                PARA VOCÊ DESAPEGAR
              </p>
              <Button size="lg" onClick={() => {
              if ((window as any).Typebot) {
                (window as any).Typebot.open();
              }
            }} className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform">
                CLIQUE AQUI!
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        
      </div>
    </section>;
};
export default Hero;
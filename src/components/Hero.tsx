import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-20 flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-accent/30 to-background">
        {/* Decorative Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v6h6V4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
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
                size="lg"
                onClick={() => {
                  if ((window as any).Typebot) {
                    (window as any).Typebot.open();
                  }
                }}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
              >
                CLIQUE AQUI!
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

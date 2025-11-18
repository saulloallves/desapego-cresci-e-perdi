import { Button } from "@/components/ui/button";
import { LeadFormDialog } from "@/components/LeadFormDialog";
import mockup from "@/assets/mockup.png";

const Hero = () => {
  return <section className="relative py-16 md:py-20 lg:py-24 flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-[#ffa81f]"></div>

      {/* Content */}
      <div className="container mx-auto px-4 py-5 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Main Message */}
          <div className="text-left animate-fade-in-up">
            <img src={mockup} alt="Não serve mais para seus filhos? Nós compramos!" className="w-full max-w-2xl" />
          </div>

          {/* Right Side - CTA */}
          <div className="flex flex-col items-center lg:items-end gap-6" style={{
          animation: "fade-in-up 0.6s ease-out 0.3s both"
        }}>
            <div className="bg-primary text-secondary-foreground px-8 py-6 rounded-2xl shadow-lg text-center transform rotate-1">
              <p className="font-bold text-xl md:text-2xl mb-4 text-white">
                A UNIDADE MAIS PRÓXIMA
                <br />
                PARA VOCÊ DESAPEGAR
              </p>
              <LeadFormDialog
                type="sell_items"
                sourceSection="hero"
                trigger={
                  <Button
                    size="lg"
                    className="bg-[#00aeff] hover:bg-[#00aeff]/95 text-primary-foreground font-display text-2xl md:text-3xl px-12 py-8 h-auto rounded-full shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
                  >
                    CLIQUE AQUI!
                  </Button>
                }
              />
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
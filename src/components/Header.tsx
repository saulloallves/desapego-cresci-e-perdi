import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="text-2xl md:text-3xl font-display text-primary">
              CRESCI
              <span className="text-accent">E</span>PERDI
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("como-funciona")}
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Como Funciona
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              FAQ
            </button>
            <button
              onClick={() => scrollToSection("franquia")}
              className="text-foreground hover:text-primary transition-colors font-semibold"
            >
              Franquia
            </button>
            <Button
              onClick={() => {
                if ((window as any).Typebot) {
                  (window as any).Typebot.open();
                }
              }}
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              SEJA UM FRANQUEADO
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-left text-foreground hover:text-primary transition-colors font-semibold"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("como-funciona")}
                className="text-left text-foreground hover:text-primary transition-colors font-semibold"
              >
                Como Funciona
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-foreground hover:text-primary transition-colors font-semibold"
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("franquia")}
                className="text-left text-foreground hover:text-primary transition-colors font-semibold"
              >
                Franquia
              </button>
              <Button
                onClick={() => {
                  if ((window as any).Typebot) {
                    (window as any).Typebot.open();
                  }
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
              >
                SEJA UM FRANQUEADO
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

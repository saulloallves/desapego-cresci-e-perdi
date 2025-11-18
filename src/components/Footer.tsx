import { Facebook, Instagram } from "lucide-react";
import logo from "@/assets/logo-branco.png";

const Footer = () => {
  return (
    <footer className="bg-secondary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          {/* Logo */}
          <div>
            <img src={logo} alt="Cresci e Perdi" className="h-12 md:h-14" />
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/crescieperdi/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary p-3 rounded-full hover:scale-110 transition-transform"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://www.facebook.com/crescieperdi"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary-foreground text-primary p-3 rounded-full hover:scale-110 transition-transform"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm md:text-base">
            <p>© 2025 Cresci e Perdi — Todos os direitos reservados.</p>
            <p className="mt-2 text-primary-foreground/80">
              Desapego com propósito • Economia consciente
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

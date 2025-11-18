import { LeadFormDialog } from "@/components/LeadFormDialog";
import banner from "@/assets/banner.png";

const Hero = () => {
  return <section className="relative w-full overflow-hidden pt-16 md:pt-20">
      <LeadFormDialog
        type="sell_items"
        sourceSection="hero"
        trigger={
          <div className="cursor-pointer hover:opacity-95 transition-opacity duration-300 w-full">
            <img 
              src={banner} 
              alt="Não serve mais para seus filhos? Nós compramos!" 
              className="w-full h-auto object-contain"
            />
          </div>
        }
      />
    </section>;
};
export default Hero;
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Quais itens vocês aceitam?",
      answer:
        "Aceitamos roupas, calçados e brinquedos infantis em bom estado de conservação. Os produtos passam por uma curadoria de qualidade para garantir que estejam em condições adequadas para revenda.",
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Você pode escolher entre receber dinheiro ou giracrédito na loja. O giracrédito pode ser usado para adquirir novos produtos em nossas unidades, oferecendo ainda mais economia.",
    },
    {
      question: "Preciso agendar para levar meus itens?",
      answer:
        "Recomendamos entrar em contato com a unidade mais próxima para verificar o melhor horário. Algumas lojas trabalham com agendamento para oferecer um atendimento mais personalizado.",
    },
    {
      question: "Como sei se meu item será aceito?",
      answer:
        "Os itens devem estar limpos, sem manchas, rasgos ou defeitos graves. Nossa equipe faz uma avaliação no momento da entrega e informa quais produtos podem ser aceitos.",
    },
    {
      question: "Posso comprar produtos seminovos na loja?",
      answer:
        "Sim! Todos os produtos que passam pela nossa curadoria ficam disponíveis para venda em nossas lojas, oferecendo qualidade por preços mais acessíveis.",
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 bg-curve-bg wavy-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary text-center mb-12">
            DÚVIDAS FREQUENTES
          </h2>

          <div className="bg-background rounded-3xl p-6 md:p-8 shadow-[var(--shadow-soft)]">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

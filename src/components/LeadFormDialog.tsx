import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { createLead, LeadType } from "@/lib/leads";
import { useToast } from "@/hooks/use-toast";
import { trackLeadEvent, trackFormOpen } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const leadSchema = z.object({
  name: z
    .string()
    .min(2, "Digite pelo menos 2 letras")
    .max(100, "Nome muito longo"),
  phone: z
    .string()
    .min(1, "Digite um WhatsApp válido")
    .regex(/^[\d\s()-]+$/, "Digite apenas números")
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 11, {
      message: "Digite um telefone válido (10 ou 11 dígitos)",
    }),
  city: z
    .string()
    .max(100, "Cidade muito longa")
    .optional()
    .or(z.literal("")),
  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve aceitar os termos de uso.",
    }),
  contactConsent: z
    .boolean()
    .refine((val) => val === true, {
      message: "Você deve permitir o contato.",
    }),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

interface LeadFormDialogProps {
  type: LeadType;
  sourceSection: string;
  trigger: React.ReactNode;
}

export function LeadFormDialog({ type, sourceSection, trigger }: LeadFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneDisplay, setPhoneDisplay] = useState("");

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      phone: "",
      city: "",
      acceptedTerms: false,
      contactConsent: false,
    },
  });

  const isFranchise = type === "franchise";

  // Rastrear abertura do formulário
  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      trackFormOpen(type, sourceSection);
    }
  };

  // Função para formatar telefone brasileiro
  const formatPhoneBR = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Formata conforme o tamanho
    if (numbers.length <= 10) {
      // (XX) XXXX-XXXX
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    } else {
      // (XX) XXXXX-XXXX
      return numbers
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatPhoneBR(value);
    setPhoneDisplay(formatted);
    
    // Salva apenas números no form
    const numbersOnly = value.replace(/\D/g, "");
    form.setValue("phone", numbersOnly);
  };

  const handleSubmit = async (values: LeadFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createLead({
        type,
        name: values.name,
        phone: values.phone,
        city: values.city || undefined,
        sourceSection,
        acceptedTerms: values.acceptedTerms,
        contactConsent: values.contactConsent,
      });

      // Rastrear evento de lead no GTM e Facebook Pixel
      trackLeadEvent(type, {
        name: values.name,
        phone: values.phone,
        city: values.city,
        sourceSection,
      });

      toast({
        title: "Dados enviados com sucesso!",
        description: isFranchise
          ? "Em breve entraremos em contato para falar sobre a franquia."
          : "Redirecionando para encontrar a unidade mais próxima...",
      });

      form.reset();
      setOpen(false);
      setPhoneDisplay("");

      // Redirect to find unit page for sell_items type
      if (!isFranchise && result?.id) {
        setTimeout(() => {
          navigate(`/encontrar-unidade?leadId=${result.id}`);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Não foi possível enviar seus dados.",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const title = isFranchise ? "Seja um franqueado" : "Quero desapegar";
  const description = isFranchise
    ? "Preencha seus dados e vamos falar sobre abrir uma unidade Cresci e Perdi."
    : "Preencha seus dados e te ajudaremos a encontrar a melhor forma de desapegar.";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form
          className="space-y-4 mt-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium">Nome</label>
            <Input
              placeholder="Seu nome"
              {...form.register("name")}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">WhatsApp</label>
            <Input
              placeholder="(00) 00000-0000"
              value={phoneDisplay}
              onChange={handlePhoneChange}
              maxLength={15}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Cidade (opcional)</label>
            <Input
              placeholder="Sua cidade"
              {...form.register("city")}
            />
            {form.formState.errors.city && (
              <p className="text-sm text-red-500">{form.formState.errors.city.message}</p>
            )}
          </div>

          {isFranchise && (
            <div className="space-y-4 pt-2">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="acceptedTerms"
                  checked={form.watch("acceptedTerms")}
                  onCheckedChange={(checked) =>
                    form.setValue("acceptedTerms", checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="acceptedTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Eu li e aceito os{" "}
                    <Link
                      to="/termos-de-uso"
                      target="_blank"
                      className="text-primary underline hover:text-primary/80"
                    >
                      Termos de Uso e LGPD
                    </Link>
                    .
                  </label>
                  {form.formState.errors.acceptedTerms && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.acceptedTerms.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="contactConsent"
                  checked={form.watch("contactConsent")}
                  onCheckedChange={(checked) =>
                    form.setValue("contactConsent", checked as boolean)
                  }
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="contactConsent"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Concordo em receber contato da equipe Cresci e Perdi.
                  </label>
                  {form.formState.errors.contactConsent && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.contactConsent.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full mt-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

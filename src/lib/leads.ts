import { supabase } from "@/lib/supabaseClient";

export type LeadType = "franchise" | "sell_items";

export interface CreateLeadInput {
  type: LeadType;
  name?: string;
  phone?: string;
  city?: string;
  sourceSection?: string;
  acceptedTerms?: boolean;
  contactConsent?: boolean;
}

export async function createLead(input: CreateLeadInput) {
  const { data, error } = await supabase
    .from("leads")
    .insert({
      type: input.type,
      name: input.name,
      phone: input.phone,
      city: input.city,
      source_section: input.sourceSection,
      accepted_terms: input.acceptedTerms,
      contact_consent: input.contactConsent,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

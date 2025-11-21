-- Adiciona a coluna para o consentimento de contato.
ALTER TABLE public.leads
ADD COLUMN contact_consent BOOLEAN DEFAULT FALSE;

-- Adiciona a coluna para a aceitação dos termos de uso (LGPD).
ALTER TABLE public.leads
ADD COLUMN accepted_terms BOOLEAN DEFAULT FALSE;

-- Adiciona comentários para documentação (opcional, mas recomendado).
COMMENT ON COLUMN public.leads.contact_consent IS 'Indica se o lead consentiu em ser contatado.';
COMMENT ON COLUMN public.leads.accepted_terms IS 'Indica se o lead aceitou os termos de uso e privacidade.';

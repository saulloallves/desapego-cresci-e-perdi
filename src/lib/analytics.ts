// Google Tag Manager e Facebook Pixel - Utilitários de Analytics
// GTM ID: AW-11559938958
// Facebook Pixel ID: 782764614795788

type AnalyticsValue = string | number | boolean | undefined | null;
type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer: unknown[];
    fbq: (...args: unknown[]) => void;
    _fbq: unknown;
    gtag: (...args: unknown[]) => void;
  }
}

// ============================================
// GOOGLE TAG MANAGER / GOOGLE ADS
// ============================================

/**
 * Envia evento para o Google Tag Manager/Google Ads
 */
export function gtagEvent(
  eventName: string,
  eventParams?: AnalyticsParams
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
    console.log("[GTM] Event:", eventName, eventParams);
  }
}

/**
 * Evento de conversão do Google Ads
 * Use para rastrear conversões importantes (leads, vendas, etc.)
 */
export function gtagConversion(
  conversionLabel: string,
  value?: number,
  currency: string = "BRL"
) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: `AW-11559938958/${conversionLabel}`,
      value: value,
      currency: currency,
    });
    console.log("[GTM] Conversion:", conversionLabel);
  }
}

/**
 * Rastreia pageview no Google Analytics/GTM
 */
export function gtagPageView(pagePath: string, pageTitle?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
    });
    console.log("[GTM] PageView:", pagePath);
  }
}

// ============================================
// FACEBOOK PIXEL
// ============================================

/**
 * Envia evento padrão do Facebook Pixel
 */
export function fbqEvent(
  eventName: string,
  eventParams?: AnalyticsParams
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, eventParams);
    console.log("[FB Pixel] Event:", eventName, eventParams);
  }
}

/**
 * Envia evento customizado do Facebook Pixel
 */
export function fbqCustomEvent(
  eventName: string,
  eventParams?: AnalyticsParams
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, eventParams);
    console.log("[FB Pixel] Custom Event:", eventName, eventParams);
  }
}

/**
 * Rastreia pageview no Facebook Pixel
 */
export function fbqPageView() {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "PageView");
    console.log("[FB Pixel] PageView");
  }
}

// ============================================
// EVENTOS COMBINADOS (GTM + FACEBOOK)
// ============================================

export type LeadEventType = "franchise" | "sell_items";

/**
 * Rastreia evento de Lead em ambas as plataformas
 */
export function trackLeadEvent(
  type: LeadEventType,
  data: {
    name?: string;
    phone?: string;
    city?: string;
    sourceSection?: string;
  }
) {
  const eventData = {
    lead_type: type,
    source_section: data.sourceSection,
    city: data.city,
  };

  // Google Tag Manager / Google Ads
  gtagEvent("generate_lead", {
    ...eventData,
    event_category: "Lead",
    event_label: type === "franchise" ? "Franquia" : "Vender Itens",
  });

  // Facebook Pixel - Evento padrão Lead
  fbqEvent("Lead", {
    content_name: type === "franchise" ? "Franquia" : "Vender Itens",
    content_category: type,
    ...eventData,
  });

  console.log("[Analytics] Lead tracked:", type, eventData);
}

/**
 * Rastreia abertura do formulário de lead
 */
export function trackFormOpen(type: LeadEventType, sourceSection: string) {
  // Google
  gtagEvent("form_start", {
    form_type: type,
    source_section: sourceSection,
  });

  // Facebook - Evento customizado
  fbqCustomEvent("FormOpen", {
    form_type: type,
    source_section: sourceSection,
  });
}

/**
 * Rastreia clique em botão de CTA
 */
export function trackCTAClick(
  ctaName: string,
  section: string,
  additionalData?: AnalyticsParams
) {
  // Google
  gtagEvent("cta_click", {
    cta_name: ctaName,
    section: section,
    ...additionalData,
  });

  // Facebook
  fbqCustomEvent("CTAClick", {
    cta_name: ctaName,
    section: section,
    ...additionalData,
  });
}

/**
 * Rastreia visualização de página em ambas as plataformas
 */
export function trackPageView(pagePath: string, pageTitle?: string) {
  gtagPageView(pagePath, pageTitle);
  fbqPageView();
}

/**
 * Rastreia evento de encontrar unidade
 */
export function trackFindUnit(city?: string, unitFound?: boolean) {
  // Google
  gtagEvent("find_unit", {
    city: city,
    unit_found: unitFound,
  });

  // Facebook
  fbqCustomEvent("FindUnit", {
    city: city,
    unit_found: unitFound,
  });
}

/**
 * Rastreia interesse em franquia
 */
export function trackFranchiseInterest(sourceSection: string) {
  // Google
  gtagEvent("franchise_interest", {
    source_section: sourceSection,
  });

  // Facebook - Evento padrão de interesse
  fbqEvent("InitiateCheckout", {
    content_name: "Franquia Cresci e Perdi",
    content_category: "franchise",
  });
}

/**
 * Rastreia scroll depth (profundidade de rolagem)
 */
export function trackScrollDepth(percentage: number) {
  if (percentage === 25 || percentage === 50 || percentage === 75 || percentage === 100) {
    gtagEvent("scroll", {
      percent_scrolled: percentage,
    });
  }
}

/**
 * Rastreia tempo na página
 */
export function trackTimeOnPage(seconds: number) {
  gtagEvent("timing_complete", {
    name: "time_on_page",
    value: seconds,
  });
}

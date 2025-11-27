import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

/**
 * Componente que rastreia automaticamente pageviews
 * quando a rota muda no React Router
 */
export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Rastreia pageview no GTM e Facebook Pixel
    const pageTitle = document.title;
    trackPageView(location.pathname, pageTitle);
  }, [location]);

  return null;
}

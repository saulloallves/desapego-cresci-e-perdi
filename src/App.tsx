import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bubble } from "@typebot.io/react";
import ScrollToTop from "./components/ScrollToTop";
import { AnalyticsTracker } from "./components/AnalyticsTracker";
import Index from "./pages/Index";
import FindUnitPage from "./pages/FindUnitPage";
import TermsPage from "./pages/TermsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/encontrar-unidade" element={<FindUnitPage />} />
          <Route path="/termos-de-uso" element={<TermsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ScrollToTop />
      <Bubble
        typebot="meu-typebot-jsfreuf"
        apiHost="https://fluxoapi.contatocrescieperdi.com.br"
        theme={{
          button: {
            backgroundColor: "#00aeff",
            customIconSrc: "❔",
            size: "medium",
          },
        }}
      />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bubble } from "@typebot.io/react";
import Index from "./pages/Index";
import FindUnitPage from "./pages/FindUnitPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/encontrar-unidade" element={<FindUnitPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
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

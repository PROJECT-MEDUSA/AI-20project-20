import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/layout/Layout";
import ResumeBuilder from "@/pages/ResumeBuilder";
import Placeholder from "@/pages/Placeholder";
import PitchGenerator from "@/pages/PitchGenerator";
import PortfolioBuilder from "@/pages/PortfolioBuilder";
import ExportHub from "@/pages/ExportHub";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="pitch" element={<PitchGenerator />} />
            <Route path="portfolio" element={<PortfolioBuilder />} />
            <Route path="export" element={<ExportHub />} />
            <Route path="about" element={<Placeholder title="About" />} />
            <Route path="profile" element={<Placeholder title="Profile" />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Developer Routes
import DeveloperDashboard from "./pages/developer/Dashboard";
import DeveloperProjects from "./pages/developer/Projects";
import ProjectDetail from "./pages/developer/ProjectDetail";
import Marketplace from "./pages/developer/Marketplace";
import Reports from "./pages/developer/Reports";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";

// Recycler Routes
import RecyclerDashboard from "./pages/recycler/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<Auth />} />
          
          {/* Developer Routes */}
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          <Route path="/developer/projects" element={<DeveloperProjects />} />
          <Route path="/developer/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/developer/marketplace" element={<Marketplace />} />
          <Route path="/developer/reports" element={<Reports />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Recycler Routes */}
          <Route path="/recycler/dashboard" element={<RecyclerDashboard />} />
          
          {/* Landing and Not Found Routes */}
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

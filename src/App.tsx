
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

// Compliance Engine Routes
import WMUPGenerator from "./pages/developer/compliance/WMUPGenerator";
import EPRForm from "./pages/developer/compliance/EPRForm"; 
import ComplianceTracker from "./pages/developer/compliance/ComplianceTracker";
import WasteDataEntry from "./pages/developer/compliance/WasteDataEntry";
import CertificateUpload from "./pages/developer/compliance/CertificateUpload";
import QuarterlyReturns from "./pages/developer/compliance/QuarterlyReturns";

// Marketplace Routes
import MarketplaceHome from "./pages/developer/marketplace/MarketplaceHome";
import BOQSuggestions from "./pages/developer/marketplace/BOQSuggestions";
import VendorDirectory from "./pages/developer/marketplace/VendorDirectory";
import OrderPage from "./pages/developer/marketplace/OrderPage";
import OrderTracker from "./pages/developer/marketplace/OrderTracker";

// Reporting Routes
import ImpactMetrics from "./pages/developer/reporting/ImpactMetrics";
import Benchmarks from "./pages/developer/reporting/Benchmarks";
import ReportGenerator from "./pages/developer/reporting/ReportGenerator";
import DownloadCenter from "./pages/developer/reporting/DownloadCenter";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCompliance from "./pages/admin/Compliance";
import AdminReports from "./pages/admin/Reports";
import AdminUsers from "./pages/admin/Users";

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
          
          {/* Compliance Engine Routes */}
          <Route path="/developer/compliance/wmup-generator/:projectId" element={<WMUPGenerator />} />
          <Route path="/developer/compliance/epr-form/:projectId" element={<EPRForm />} />
          <Route path="/developer/compliance/tracker" element={<ComplianceTracker />} />
          <Route path="/developer/compliance/waste-data/:projectId" element={<WasteDataEntry />} />
          <Route path="/developer/compliance/certificates/:projectId" element={<CertificateUpload />} />
          <Route path="/developer/compliance/quarterly-returns/:projectId" element={<QuarterlyReturns />} />
          
          {/* Marketplace Routes */}
          <Route path="/developer/marketplace" element={<Marketplace />} />
          <Route path="/developer/marketplace/home" element={<MarketplaceHome />} />
          <Route path="/developer/marketplace/boq/:projectId" element={<BOQSuggestions />} />
          <Route path="/developer/marketplace/vendors" element={<VendorDirectory />} />
          <Route path="/developer/marketplace/order/:vendorId" element={<OrderPage />} />
          <Route path="/developer/marketplace/orders/track" element={<OrderTracker />} />
          
          {/* Reporting Routes */}
          <Route path="/developer/reports" element={<Reports />} />
          <Route path="/developer/reports/impact/:projectId" element={<ImpactMetrics />} />
          <Route path="/developer/reports/benchmarks" element={<Benchmarks />} />
          <Route path="/developer/reports/generator" element={<ReportGenerator />} />
          <Route path="/developer/reports/downloads" element={<DownloadCenter />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/compliance" element={<AdminCompliance />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          
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


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Export from "./pages/Export";
import Import from "./pages/Import";
import Settings from "./pages/Settings";
import DemoOverview from "./pages/DemoOverview";
import DemoFrameworkExplorer from "./pages/DemoFrameworkExplorer";
import Admin from "./pages/Admin";
import LicenseActivation from "./pages/LicenseActivation";
import DashboardLayout from "./components/layouts/DashboardLayout";
import DemoLayout from "./components/layouts/DemoLayout";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/license-activation" element={<LicenseActivation />} />
            
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/export" element={<Export />} />
              <Route path="/import" element={<Import />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/admin" element={<Admin />} />
            </Route>
            
            <Route element={<DemoLayout />}>
              <Route path="/demo" element={<DemoOverview />} />
              <Route path="/demo/explorer" element={<DemoFrameworkExplorer />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

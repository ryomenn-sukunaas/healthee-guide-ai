import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import SymptomChecker from "./pages/SymptomChecker.tsx";
import DoctorList from "./pages/DoctorList.tsx";
import Auth from "./pages/Auth.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";
import { AuthProvider } from "./components/AuthProvider.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import HealthChatbot from "./components/HealthChatbot.tsx";

const queryClient = new QueryClient();

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<LayoutWrapper><Auth /></LayoutWrapper>} />
            <Route path="/symptoms" element={<LayoutWrapper><ProtectedRoute><SymptomChecker /></ProtectedRoute></LayoutWrapper>} />
            <Route path="/doctors" element={<LayoutWrapper><ProtectedRoute><DoctorList /></ProtectedRoute></LayoutWrapper>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <HealthChatbot />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

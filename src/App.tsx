
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import SchoolDetail from "./pages/SchoolDetail";
import SchoolEdit from "./pages/SchoolEdit";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import FormulaireInscription from "./components/FormulaireInscription";
import Merci from "./pages/Merci";
import Blog from "./pages/Blog";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FoireOrientationForm from './components/FoireOrientationForm';
import Immo from './pages/Immo';
import Administration from './pages/Administration';


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/index" element={<Index />} />
          <Route path="/school/:id" element={<SchoolDetail />} />
          <Route path="/school/edit/:id" element={<SchoolEdit />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/formulaire" element={<FormulaireInscription />} />
          <Route path="/merci" element={<Merci />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/FoireOrientationForm" element={<FoireOrientationForm />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/immo" element={<Immo />} />
          <Route path="/administration" element={<Administration />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

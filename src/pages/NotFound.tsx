import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="medical-card p-10 max-w-md text-center"
      >
        <div className="w-16 h-16 rounded-2xl hero-gradient-bg flex items-center justify-center mx-auto mb-5 animate-pulse">
          <HeartPulse className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="font-heading text-6xl font-bold hero-gradient-text mb-2">404</h1>
        <p className="text-foreground font-semibold mb-2">Page not found</p>
        <p className="text-sm text-muted-foreground mb-6">
          The page <code className="rounded bg-muted px-1.5 py-0.5">{location.pathname}</code> doesn't exist.
        </p>
        <Button asChild className="hero-gradient-bg rounded-xl text-primary-foreground">
          <Link to="/"><Home className="h-4 w-4" /> Back home</Link>
        </Button>
      </motion.div>
    </div>
  );
};

export default NotFound;

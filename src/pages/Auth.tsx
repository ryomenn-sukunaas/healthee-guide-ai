import { FormEvent, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/components/AuthProvider";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const from = (location.state as { from?: string } | null)?.from || "/";

  if (!authLoading && user) return <Navigate to={from} replace />;

  const validate = () => {
    if (!emailPattern.test(email.trim())) return "Enter a valid email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (mode === "signup" && displayName.trim().length < 2) return "Enter your name.";
    return null;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: displayName.trim().slice(0, 80) },
          },
        });
        if (error) throw error;
        // Auto-confirm is enabled — try immediate sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });
        if (signInError) {
          toast.success("Account created! Please sign in.");
          setMode("signin");
        } else {
          toast.success("Welcome to Medicube!");
          navigate(from, { replace: true });
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
        if (error) throw error;
        navigate(from, { replace: true });
      }
    } catch (error) {
      const raw = error instanceof Error ? error.message : "Authentication failed.";
      let friendly = raw;
      if (/already registered|already been registered|user already/i.test(raw)) {
        friendly = "This email is already registered. Try signing in instead.";
        setMode("signin");
      } else if (/invalid login credentials/i.test(raw)) {
        friendly = "Incorrect email or password. Please try again.";
      } else if (/email not confirmed/i.test(raw)) {
        friendly = "Please verify your email before signing in.";
      }
      toast.error(friendly);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    setLoading(false);
    if (result.error) {
      toast.error(result.error.message);
      return;
    }
    if (!result.redirected) navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="container max-w-md mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="medical-card p-6 md:p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl hero-gradient-bg">
              <Lock className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Secure Medicube Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to use the chatbot and nearby doctor map.</p>
          </div>

          <div className="mb-6 grid grid-cols-2 rounded-xl bg-muted p-1">
            <button type="button" onClick={() => setMode("signin")} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === "signin" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              Sign in
            </button>
            <button type="button" onClick={() => setMode("signup")} className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${mode === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"}`}>
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <label className="block text-sm font-medium text-foreground">
                Name
                <div className="relative mt-1.5">
                  <UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} className="pl-10" placeholder="Your name" />
                </div>
              </label>
            )}
            <label className="block text-sm font-medium text-foreground">
              Email
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="email" maxLength={255} className="pl-10" placeholder="you@example.com" />
              </div>
            </label>
            <label className="block text-sm font-medium text-foreground">
              Password
              <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete={mode === "signin" ? "current-password" : "new-password"} maxLength={72} className="mt-1.5" placeholder="Minimum 8 characters" />
            </label>
            <Button type="submit" disabled={loading} className="hero-gradient-bg w-full rounded-xl text-primary-foreground">
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === "signin" ? "Sign in" : "Create account"}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>
          <Button type="button" variant="outline" onClick={handleGoogle} disabled={loading} className="w-full rounded-xl">
            Continue with Google
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;

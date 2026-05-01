import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Save, UserCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

const locations = ["", "New York", "Los Angeles", "Chicago", "Houston"];

const Profile = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [preferredLocation, setPreferredLocation] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).maybeSingle();
      if (data) {
        setDisplayName(data.display_name ?? "");
        setPreferredLocation(data.preferred_location ?? "");
        setAvatarUrl(data.avatar_url ?? "");
      }
      setLoading(false);
    })();
  }, [user]);

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert(
      {
        user_id: user.id,
        display_name: displayName.trim().slice(0, 80) || "Medicube User",
        preferred_location: preferredLocation || null,
        avatar_url: avatarUrl.trim() || null,
      },
      { onConflict: "user_id" },
    );
    setSaving(false);
    if (error) toast.error("Could not save profile.");
    else toast.success("Profile updated.");
  };

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="container max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your <span className="hero-gradient-text">Profile</span>
          </h1>
          <p className="text-muted-foreground mb-8">Personalize your Medicube experience.</p>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : (
            <form onSubmit={save} className="medical-card p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-4">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="" className="h-16 w-16 rounded-2xl object-cover" />
                ) : (
                  <div className="h-16 w-16 rounded-2xl hero-gradient-bg flex items-center justify-center">
                    <UserCircle className="h-8 w-8 text-primary-foreground" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                  <p className="text-xs text-muted-foreground">Signed in</p>
                </div>
              </div>

              <label className="block text-sm font-medium text-foreground">
                Display name
                <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={80} className="mt-1.5" placeholder="Your name" />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Avatar URL (optional)
                <Input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} maxLength={500} className="mt-1.5" placeholder="https://..." />
              </label>

              <label className="block text-sm font-medium text-foreground">
                Preferred city
                <select
                  value={preferredLocation}
                  onChange={(e) => setPreferredLocation(e.target.value)}
                  className="mt-1.5 w-full px-3 py-2 rounded-xl border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {locations.map((l) => <option key={l} value={l}>{l || "No preference"}</option>)}
                </select>
              </label>

              <Button type="submit" disabled={saving} className="hero-gradient-bg rounded-xl text-primary-foreground">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save changes
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
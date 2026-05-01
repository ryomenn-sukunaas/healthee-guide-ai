import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setFavorites(new Set());
      setLoading(false);
      return;
    }
    const { data } = await supabase.from("favorites").select("doctor_id").eq("user_id", user.id);
    setFavorites(new Set((data ?? []).map((d) => d.doctor_id)));
    setLoading(false);
  }, [user]);

  useEffect(() => { void refresh(); }, [refresh]);

  const toggle = async (doctorId: number) => {
    if (!user) {
      toast.error("Sign in to save favorites.");
      return;
    }
    const isFav = favorites.has(doctorId);
    setFavorites((prev) => {
      const next = new Set(prev);
      isFav ? next.delete(doctorId) : next.add(doctorId);
      return next;
    });
    if (isFav) {
      const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("doctor_id", doctorId);
      if (error) toast.error("Could not remove favorite.");
    } else {
      const { error } = await supabase.from("favorites").insert({ user_id: user.id, doctor_id: doctorId });
      if (error) toast.error("Could not save favorite.");
      else toast.success("Added to favorites.");
    }
  };

  return { favorites, toggle, loading, refresh };
};
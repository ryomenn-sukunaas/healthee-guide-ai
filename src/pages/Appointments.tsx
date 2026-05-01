import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2, Stethoscope, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/AuthProvider";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  doctor_name: string;
  doctor_specialization: string;
  appointment_date: string;
  appointment_time: string;
  reason: string | null;
  status: string;
}

const Appointments = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", user.id)
      .order("appointment_date", { ascending: true });
    setItems((data as Appointment[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { void load(); }, [user]);

  const cancel = async (id: string) => {
    const { error } = await supabase.from("appointments").update({ status: "cancelled" }).eq("id", id);
    if (error) toast.error("Could not cancel.");
    else { toast.success("Appointment cancelled."); void load(); }
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("appointments").delete().eq("id", id);
    if (error) toast.error("Could not delete.");
    else { toast.success("Removed."); void load(); }
  };

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = items.filter((a) => a.status !== "cancelled" && a.appointment_date >= today);
  const past = items.filter((a) => a.status === "cancelled" || a.appointment_date < today);

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="container max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your <span className="hero-gradient-text">Appointments</span>
          </h1>
          <p className="text-muted-foreground mb-8">All your bookings in one place.</p>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : items.length === 0 ? (
            <div className="medical-card p-10 text-center">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground">No appointments yet</p>
              <p className="text-sm text-muted-foreground mt-1">Book one from the doctor directory.</p>
            </div>
          ) : (
            <div className="space-y-8">
              <Section title="Upcoming" items={upcoming} onCancel={cancel} onDelete={remove} />
              {past.length > 0 && <Section title="Past & cancelled" items={past} onCancel={cancel} onDelete={remove} dim />}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

const Section = ({ title, items, onCancel, onDelete, dim }: { title: string; items: Appointment[]; onCancel: (id: string) => void; onDelete: (id: string) => void; dim?: boolean }) => {
  if (items.length === 0) return null;
  return (
    <div>
      <h2 className="font-heading text-lg font-semibold text-foreground mb-3">{title}</h2>
      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className={`medical-card p-5 ${dim ? "opacity-70" : ""}`}>
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl hero-gradient-bg flex items-center justify-center shrink-0">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-semibold text-foreground">{a.doctor_name}</h3>
                  <Badge variant={a.status === "cancelled" ? "destructive" : "secondary"} className="text-xs capitalize">
                    {a.status}
                  </Badge>
                </div>
                <p className="text-sm text-primary">{a.doctor_specialization}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{a.appointment_date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{a.appointment_time}</span>
                </div>
                {a.reason && <p className="mt-2 text-sm text-muted-foreground italic">"{a.reason}"</p>}
              </div>
              <div className="flex flex-col gap-2">
                {a.status !== "cancelled" && !dim && (
                  <Button size="sm" variant="outline" onClick={() => onCancel(a.id)} className="rounded-lg">Cancel</Button>
                )}
                <Button size="icon" variant="ghost" onClick={() => onDelete(a.id)} className="rounded-lg" aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
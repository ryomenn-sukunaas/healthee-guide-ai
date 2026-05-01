import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, DollarSign, Clock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { doctors, type Doctor } from "@/data/mockData";
import DoctorMap from "@/components/DoctorMap";
import BookingDialog from "@/components/BookingDialog";

const locations = ["All", ...Array.from(new Set(doctors.map(d => d.location)))];
const ratings = ["All", "4.5+", "4.7+", "4.9+"];

const DoctorList = () => {
  const [locFilter, setLocFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  const filtered = doctors.filter(d => {
    if (locFilter !== "All" && d.location !== locFilter) return false;
    if (ratingFilter !== "All") {
      const min = parseFloat(ratingFilter.replace("+", ""));
      if (d.rating < min) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
            Find <span className="hero-gradient-text">Doctors</span>
          </h1>
          <p className="text-muted-foreground mb-8">Browse top-rated specialists near you.</p>

          <div className="mb-8">
            <DoctorMap doctors={filtered} />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Location</label>
              <select
                value={locFilter}
                onChange={e => setLocFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">Min Rating</label>
              <select
                value={ratingFilter}
                onChange={e => setRatingFilter(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-input bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {ratings.map(r => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Doctor cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="medical-card p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl hero-gradient-bg flex items-center justify-center shrink-0">
                    <span className="text-primary-foreground font-bold text-sm">{doc.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-foreground">{doc.name}</h3>
                    <p className="text-sm text-primary font-medium">{doc.specialization}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-foreground">{doc.rating}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{doc.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${doc.fees}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{doc.experience}yr</span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground italic">"{doc.feedback}"</p>

                <Button
                  onClick={() => setBookingDoctor(doc)}
                  className="mt-4 w-full rounded-xl hero-gradient-bg text-primary-foreground"
                >
                  <CalendarCheck className="h-4 w-4" /> Book appointment
                </Button>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground mt-12">No doctors match your filters.</p>
          )}
        </motion.div>
      </div>
      <BookingDialog doctor={bookingDoctor} open={bookingDoctor !== null} onOpenChange={(o) => !o && setBookingDoctor(null)} />
    </div>
  );
};

export default DoctorList;

import { motion } from "framer-motion";
import { Heart, Star, MapPin, IndianRupee, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { doctors } from "@/data/mockData";

const Favorites = () => {
  const { favorites, toggle, loading } = useFavorites();
  const list = doctors.filter((d) => favorites.has(d.id));

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="container max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Saved <span className="hero-gradient-text">Doctors</span>
          </h1>
          <p className="text-muted-foreground mb-8">Your shortlist for quick access.</p>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : list.length === 0 ? (
            <div className="medical-card p-10 text-center">
              <Heart className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-medium text-foreground">No favorites yet</p>
              <p className="text-sm text-muted-foreground mt-1 mb-4">Tap the heart on any doctor to save them.</p>
              <Button asChild className="rounded-xl"><Link to="/doctors">Browse doctors</Link></Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {list.map((doc) => (
                <div key={doc.id} className="medical-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl hero-gradient-bg flex items-center justify-center shrink-0">
                      <span className="text-primary-foreground font-bold text-sm">{doc.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground">{doc.name}</h3>
                      <p className="text-sm text-primary font-medium">{doc.specialization}</p>
                    </div>
                    <button onClick={() => toggle(doc.id)} aria-label="Remove favorite">
                      <Heart className="h-5 w-5 fill-rose-500 text-rose-500" />
                    </button>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{doc.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" />₹{doc.fees}</span>
                    <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5" />{doc.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Favorites;
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  { name: "Aisha Khan", role: "Patient", text: "The symptom checker spotted my migraine pattern and pointed me to the right specialist. Booking took two clicks.", rating: 5 },
  { name: "Marcus Lee", role: "Patient", text: "I love the dark mode and the chatbot. It explained my fever options calmly at 2am when I was worried.", rating: 5 },
  { name: "Priya Patel", role: "Patient", text: "Found a top-rated dermatologist nearby on the map and saved her to favorites. Super smooth.", rating: 4 },
];

const Testimonials = () => (
  <section className="px-4 py-20">
    <div className="container max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Loved by <span className="hero-gradient-text">Patients</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Real stories from people who trust Medicube with their daily health questions.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="medical-card p-6 relative"
          >
            <Quote className="absolute right-5 top-5 h-8 w-8 text-primary/15" />
            <div className="flex gap-0.5 mb-3 text-amber-500">
              {Array.from({ length: t.rating }).map((_, idx) => (
                <Star key={idx} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">"{t.text}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full hero-gradient-bg flex items-center justify-center text-primary-foreground text-sm font-bold">
                {t.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
import { motion } from "framer-motion";
import { Activity, Stethoscope, Heart, Shield } from "lucide-react";

const features = [
  { icon: Activity, title: "AI Symptom Check", desc: "Get instant health insights powered by AI" },
  { icon: Stethoscope, title: "Find Specialists", desc: "Connect with top-rated doctors near you" },
  { icon: Heart, title: "Health Tracking", desc: "Monitor your wellness journey over time" },
  { icon: Shield, title: "Secure & Private", desc: "Your health data stays protected always" },
];

const Features = () => (
  <section className="py-20 px-4 bg-muted/50">
    <div className="container max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-3">
          Why Choose <span className="hero-gradient-text">Medicube</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Intelligent healthcare tools designed to keep you informed and connected.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="medical-card p-6 text-center"
          >
            <div className="w-14 h-14 rounded-2xl hero-gradient-bg flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;

import { motion } from "framer-motion";
import { Apple, Brain, Dumbbell, Moon } from "lucide-react";

const tips = [
  { icon: Apple, title: "Eat the rainbow", desc: "Fill half your plate with vegetables and fruits across multiple colors for a wide micronutrient range.", color: "from-emerald-500 to-teal-500" },
  { icon: Moon, title: "Protect your sleep", desc: "Aim for 7–9 hours and keep a steady wind-down routine. Sleep is the best free medicine you have.", color: "from-indigo-500 to-blue-500" },
  { icon: Dumbbell, title: "Move every day", desc: "150 minutes of moderate movement per week lowers risk of nearly every chronic condition.", color: "from-orange-500 to-amber-500" },
  { icon: Brain, title: "Mind your mind", desc: "Two minutes of breathing breaks lower cortisol. Small habits compound into real resilience.", color: "from-pink-500 to-rose-500" },
];

const HealthTips = () => (
  <section className="px-4 py-20 bg-secondary/30">
    <div className="container max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Daily <span className="hero-gradient-text">Health Tips</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Small evidence-backed habits that add up to a stronger you.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {tips.map((tip, i) => (
          <motion.article
            key={tip.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="medical-card p-6 group"
          >
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tip.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <tip.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{tip.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default HealthTips;
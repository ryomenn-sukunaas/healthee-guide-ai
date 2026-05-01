import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Active users" },
  { value: 500, suffix: "+", label: "Verified doctors" },
  { value: 24, suffix: "/7", label: "AI assistance" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

const CountUp = ({ end, suffix }: { end: number; suffix: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    let raf = 0;
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.floor(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
};

const Stats = () => (
  <section className="px-4 py-12">
    <div className="container max-w-6xl mx-auto">
      <div className="medical-card grid grid-cols-2 gap-6 p-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center"
          >
            <p className="font-heading text-3xl md:text-4xl font-bold hero-gradient-text">
              <CountUp end={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
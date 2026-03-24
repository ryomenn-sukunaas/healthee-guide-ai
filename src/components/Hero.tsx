import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-medical.png";

const Hero = () => (
  <section className="relative overflow-hidden py-16 md:py-24 px-4">
    <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background" />
    <div className="container max-w-6xl mx-auto relative z-10">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            AI-Powered Healthcare
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-foreground leading-tight mb-6">
            Your Health,{" "}
            <span className="hero-gradient-text">Intelligently Guided</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg">
            Check symptoms instantly with AI, find top-rated doctors, and take control of your health journey — all in one place.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="hero-gradient-bg text-primary-foreground rounded-xl px-8 text-base font-semibold shadow-lg hover:opacity-90 transition-opacity">
              <Link to="/symptoms">Check Symptoms</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-xl px-8 text-base font-semibold border-primary/30 text-primary hover:bg-primary/5">
              <Link to="/doctors">Find Doctors</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <img src={heroImage} alt="AI Healthcare illustration" className="w-full max-w-md drop-shadow-2xl" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default Hero;

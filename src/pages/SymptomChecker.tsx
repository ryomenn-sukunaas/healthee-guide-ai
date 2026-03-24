import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { availableSymptoms, predictDisease, type SymptomCondition } from "@/data/mockData";

const severityConfig = {
  low: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", icon: CheckCircle, label: "Low Severity" },
  medium: { color: "bg-amber-100 text-amber-700 border-amber-200", icon: AlertCircle, label: "Medium Severity" },
  high: { color: "bg-red-100 text-red-700 border-red-200", icon: AlertTriangle, label: "High Severity" },
};

const SymptomChecker = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState<SymptomCondition | null>(null);
  const [checked, setChecked] = useState(false);

  const filtered = availableSymptoms.filter(
    s => s.includes(search.toLowerCase()) && !selected.includes(s)
  );

  const toggle = (symptom: string) => {
    setSelected(prev =>
      prev.includes(symptom) ? prev.filter(s => s !== symptom) : [...prev, symptom]
    );
    setChecked(false);
    setResult(null);
  };

  const handleCheck = () => {
    setResult(predictDisease(selected));
    setChecked(true);
  };

  const sev = result ? severityConfig[result.severity] : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
            AI Symptom <span className="hero-gradient-text">Checker</span>
          </h1>
          <p className="text-muted-foreground mb-8">Select your symptoms and get an instant AI-powered assessment.</p>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search symptoms..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Available symptoms */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filtered.slice(0, 12).map(s => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className="px-3 py-1.5 rounded-full text-sm border border-border bg-card text-foreground hover:border-primary hover:bg-primary/5 transition-colors capitalize"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Selected */}
          {selected.length > 0 && (
            <div className="medical-card p-4 mb-6">
              <p className="text-sm font-medium text-muted-foreground mb-3">Selected symptoms:</p>
              <div className="flex flex-wrap gap-2">
                {selected.map(s => (
                  <Badge key={s} variant="secondary" className="capitalize gap-1 pr-1.5">
                    {s}
                    <button onClick={() => toggle(s)}>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleCheck}
            disabled={selected.length < 2}
            size="lg"
            className="hero-gradient-bg text-primary-foreground rounded-xl px-8 font-semibold w-full md:w-auto disabled:opacity-50"
          >
            Analyze Symptoms
          </Button>

          {/* Result */}
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-8"
              >
                {result ? (
                  <div className="medical-card p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {sev && <sev.icon className="w-6 h-6" />}
                      <h3 className="text-xl font-bold font-heading text-foreground">{result.disease}</h3>
                      {sev && (
                        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${sev.color}`}>
                          {sev.label}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-4">{result.description}</p>
                    <div className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm font-medium text-foreground mb-1">Recommendation</p>
                      <p className="text-sm text-muted-foreground">{result.recommendation}</p>
                    </div>
                  </div>
                ) : (
                  <div className="medical-card p-6 text-center">
                    <AlertCircle className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium text-foreground">No matching condition found</p>
                    <p className="text-sm text-muted-foreground mt-1">Try adding more symptoms or consult a doctor for a proper diagnosis.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SymptomChecker;

import { FormEvent, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Loader2, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/components/AuthProvider";

type ChatMessage = {
  id: number;
  role: "bot" | "user";
  text: string;
};

const starterMessages: ChatMessage[] = [
  {
    id: 1,
    role: "bot",
    text: "Hi, I’m Medicube Assist. Tell me what you’re feeling and I’ll share safe next steps. For emergencies, contact local emergency services immediately.",
  },
];

const suggestions = ["I have a fever and cough", "Bad headache since morning", "Find a doctor near me"];

const createReply = (message: string) => {
  const text = message.toLowerCase();
  if (/chest|breath|faint|severe|stroke|bleed/.test(text)) {
    return "Those symptoms can be urgent. Please seek immediate medical care or call emergency services. If possible, stay with someone while you wait.";
  }
  if (/fever|temperature|flu|cough|cold/.test(text)) {
    return "Rest, fluids, and monitoring your temperature may help. If fever persists, breathing worsens, or symptoms last more than a few days, book a doctor visit.";
  }
  if (/headache|migraine|dizzy/.test(text)) {
    return "Try resting in a quiet space, hydrate, and avoid bright light. Sudden severe headache, confusion, weakness, or vision changes need urgent care.";
  }
  if (/doctor|appointment|specialist|near/.test(text)) {
    return "You can use Find Doctors to filter specialists by city and rating, then use the map to compare locations near you.";
  }
  return "I can help with general guidance only. Share your main symptoms, how long they’ve lasted, and any red flags like severe pain, breathing trouble, or dizziness.";
};

const HealthChatbot = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const nextId = useRef(2);

  const initials = useMemo(() => user?.email?.slice(0, 1).toUpperCase() || "U", [user?.email]);

  if (!user) return null;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const clean = input.trim().slice(0, 500);
    if (!clean || loading) return;

    setInput("");
    setLoading(true);
    setMessages((prev) => [...prev, { id: nextId.current++, role: "user", text: clean }]);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, { id: nextId.current++, role: "bot", text: createReply(clean) }]);
      setLoading(false);
    }, 650);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="mb-4 flex h-[min(560px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
          >
            <div className="hero-gradient-bg flex items-center justify-between p-4 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-foreground/15">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-heading font-semibold">Medicube Assist</p>
                  <p className="text-xs opacity-90">Simulated health guidance</p>
                </div>
              </div>
              <button aria-label="Close chatbot" onClick={() => setOpen(false)} className="rounded-lg p-1.5 hover:bg-primary-foreground/15">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-secondary/25 p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground border border-border"}`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" /> Thinking
                  </div>
                </div>
              )}
              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setInput(s)}
                      className="rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-t border-border p-3">
              <Input value={input} onChange={(e) => setInput(e.target.value)} maxLength={500} placeholder="Ask about symptoms..." />
              <Button type="submit" size="icon" disabled={loading || input.trim().length === 0} className="shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <Button onClick={() => setOpen((value) => !value)} className="hero-gradient-bg h-14 w-14 rounded-full text-primary-foreground shadow-xl" aria-label="Open Medicube chatbot">
        {open ? <span className="font-bold">{initials}</span> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
};

export default HealthChatbot;

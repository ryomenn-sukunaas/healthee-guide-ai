import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg hero-gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Medicube</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</Link>
          <Link to="/symptoms" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Symptom Checker</Link>
          <Link to="/doctors" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Find Doctors</Link>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Home</Link>
          <Link to="/symptoms" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Symptom Checker</Link>
          <Link to="/doctors" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Find Doctors</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

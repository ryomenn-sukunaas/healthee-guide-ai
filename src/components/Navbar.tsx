import { Link, NavLink, useLocation } from "react-router-dom";
import { Calendar, Heart, LogOut, Menu, Moon, Sun, UserCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthProvider";
import { useTheme } from "@/components/ThemeProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { to: "/", label: "Home" },
  { to: "/symptoms", label: "Symptom Checker" },
  { to: "/doctors", label: "Find Doctors" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { theme, toggle } = useTheme();
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container max-w-6xl mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg hero-gradient-bg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">M</span>
          </div>
          <span className="font-heading font-bold text-xl text-foreground">Medicube</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}

          <button
            onClick={toggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-9 w-9 rounded-full hero-gradient-bg text-primary-foreground text-sm font-semibold flex items-center justify-center hover:opacity-90">
                  {user.email?.[0].toUpperCase()}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer"><UserCircle className="h-4 w-4" /> Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/appointments" className="cursor-pointer"><Calendar className="h-4 w-4" /> Appointments</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/favorites" className="cursor-pointer"><Heart className="h-4 w-4" /> Favorites</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => void signOut()} className="cursor-pointer">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" className="rounded-xl">
              <Link to={`/auth${location.pathname !== "/" ? `?from=${location.pathname}` : ""}`}>Sign in</Link>
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button className="text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3 animate-fade-in">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Profile</Link>
              <Link to="/appointments" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Appointments</Link>
              <Link to="/favorites" onClick={() => setOpen(false)} className="block text-sm font-medium text-muted-foreground">Favorites</Link>
              <button onClick={() => { void signOut(); setOpen(false); }} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)} className="block text-sm font-medium text-primary">Sign in</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

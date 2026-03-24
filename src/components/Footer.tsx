const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-10 px-4">
    <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg hero-gradient-bg flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-xs">M</span>
        </div>
        <span className="font-heading font-bold text-foreground">Medicube</span>
      </div>
      <p className="text-sm text-muted-foreground">© 2026 Medicube. AI-powered health guidance.</p>
    </div>
  </footer>
);

export default Footer;

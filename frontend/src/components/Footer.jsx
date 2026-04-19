function Footer() {
  return (
    <footer className="section-shell border-t border-white/8 py-10">
      <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <div>© 2026 Vyapara Commerce. Crafted for premium storefronts.</div>
        <div className="flex gap-6">
          <a href="#men">MEN</a>
          <a href="#women">WOMEN</a>
          <a href="#kids">KIDS</a>
          <a href="#beauty">BEAUTY</a>
          <a href="#studio">STUDIO</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

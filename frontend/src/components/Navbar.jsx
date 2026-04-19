import { motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import CommandPalette from "./CommandPalette";
import AtmospherePicker from "./AtmospherePicker";
import IconButton from "./IconButton";

function SearchIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="11" cy="11" r="6" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path d="M3 5h2l2.2 9.2a1 1 0 0 0 1 .8h8.6a1 1 0 0 0 1-.78L20 8H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="19" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="17" cy="19" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
    </svg>
  );
}

function AtmosphereIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const { openCart } = useCart();
  const [commandOpen, setCommandOpen] = useState(false);
  const [atmosphereOpen, setAtmosphereOpen] = useState(false);
  const navItems = ["MEN", "WOMEN", "KIDS", "BEAUTY", "STUDIO"];

  return (
    <>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />

      <motion.header
        className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl"
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-shell flex h-20 items-center justify-between gap-6">
          <div className="flex items-center gap-10">
            <a className="flex items-center gap-3" href="#top">
              <div className="flex h-10 w-10 items-center justify-center">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]">
                  <defs>
                    <linearGradient id="lwG" x1="0%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#e879f9" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                    <linearGradient id="rwG" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00f6ff" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                    <linearGradient id="flapG" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0891b2" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="inG" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>
                    <linearGradient id="hG" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#c026d3" />
                      <stop offset="100%" stopColor="#00f6ff" />
                    </linearGradient>
                  </defs>
                  <path d="M 36 38 A 14 14 0 0 1 64 38" fill="none" stroke="url(#hG)" strokeWidth="4.5" strokeLinecap="round" />
                  <polygon points="70,38 88,48 55,88 45,88" fill="url(#flapG)" />
                  <polygon points="40,38 60,38 50,71.3" fill="url(#inG)" />
                  <polygon points="12,38 40,38 55,88 27,88" fill="url(#lwG)" />
                  <polygon points="60,38 75,38 40,88 55,88" fill="url(#rwG)" />
                </svg>
              </div>
              <div>
                <div className="text-sm font-semibold tracking-[0.24em] text-white">VYAPARA</div>
                <div className="text-[11px] uppercase tracking-[0.3em] text-slate-400">Commerce Suite</div>
              </div>
            </a>

            <nav className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            {/* Search → opens Command Palette */}
            <button onClick={() => setCommandOpen(true)}>
              <IconButton label="Search">
                <SearchIcon />
              </IconButton>
            </button>

            {/* Cart drawer */}
            <div onClick={openCart} className="cursor-pointer">
              <IconButton label="Cart">
                <CartIcon />
              </IconButton>
            </div>

            {/* Atmosphere picker */}
            <div className="relative">
              <button onClick={() => setAtmosphereOpen((v) => !v)}>
                <IconButton label="Atmosphere">
                  <AtmosphereIcon />
                </IconButton>
              </button>
              <AtmospherePicker open={atmosphereOpen} onClose={() => setAtmosphereOpen(false)} />
            </div>

            <IconButton label="Account">
              <UserIcon />
            </IconButton>
          </div>
        </div>
      </motion.header>
    </>
  );
}

export default Navbar;

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { productSections } from "../data/featuredProducts";

const allProducts = productSections.flatMap((s) => s.products);

const SUGGESTIONS = [
  "I need a minimal outfit for a beach wedding under $200",
  "Show me something for a casual night out",
  "Kids winter essentials under $50",
  "Premium skincare routine for daily glow",
  "Modern home decor for a minimalist studio",
];

function scoreProduct(product, query) {
  const q = query.toLowerCase();
  const text = `${product.title} ${product.subtitle} ${product.category}`.toLowerCase();
  if (text.includes(q)) return 2;
  const words = q.split(" ").filter((w) => w.length > 3);
  return words.filter((w) => text.includes(w)).length;
}

function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const scored = allProducts
      .map((p) => ({ ...p, score: scoreProduct(p, query) }))
      .filter((p) => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    setResults(scored.length ? scored : allProducts.slice(0, 4));
  }, [query]);

  const total = results.reduce((sum, p) => {
    const val = parseFloat(String(p.price).replace("$", ""));
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-slate-950/75 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-1/2 top-[12%] z-[201] w-full max-w-2xl -translate-x-1/2 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/95 shadow-[0_32px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
          >
            {/* Input */}
            <div className="flex items-center gap-4 border-b border-white/8 px-6 py-5">
              <svg className="h-5 w-5 flex-shrink-0 text-slate-400" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything… e.g. 'minimal beach wedding outfit under $200'"
                className="flex-1 bg-transparent text-base text-white placeholder-slate-500 outline-none"
                onKeyDown={(e) => e.key === "Escape" && onClose()}
              />
              <kbd onClick={onClose} className="cursor-pointer rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-400 hover:bg-white/10">ESC</kbd>
            </div>

            {/* Suggestions when empty */}
            {!query && (
              <div className="px-6 py-4">
                <div className="mb-3 text-xs uppercase tracking-widest text-slate-500">Try asking…</div>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <span className="text-lg">✦</span> {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4"
                >
                  <div className="mb-2 px-2 pt-4 text-xs uppercase tracking-widest text-slate-500">
                    {results.length} results
                  </div>
                  <div className="flex flex-col gap-2">
                    {results.map((product, i) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/4 p-3 transition-colors hover:border-white/10 hover:bg-white/8 cursor-pointer"
                      >
                        <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-[14px]">
                          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white truncate">{product.title}</div>
                          <div className="text-sm text-slate-400 truncate">{product.subtitle}</div>
                          <div className="mt-1 text-xs text-slate-500 uppercase tracking-wider">{product.category}</div>
                        </div>
                        <div className="text-sm font-semibold text-white">{product.price}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Running total */}
                  <div className="mt-4 flex items-center justify-between rounded-2xl border border-cyan-300/15 bg-cyan-300/5 px-5 py-3">
                    <span className="text-sm text-slate-400">Outfit total</span>
                    <span className="text-lg font-semibold text-white">${total.toFixed(2)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;

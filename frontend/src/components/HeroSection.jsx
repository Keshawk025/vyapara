import { motion } from "framer-motion";
import { useAtmosphere } from "../context/AtmosphereContext";
import { productSections } from "../data/featuredProducts";

function HeroSection() {
  const { atm } = useAtmosphere();
  const heroFeature = productSections[1].products[1];
  const spotlightProducts = [
    productSections[0].products[0],
    productSections[3].products[0],
  ];

  return (
    <section className="relative flex min-h-[85vh] w-full items-center overflow-hidden">
      <div className="glass-panel absolute inset-0 rounded-none border-x-0 border-t-0 bg-hero-radial shadow-soft" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.03),transparent)] pointer-events-none" />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.4, 0.7, 0.4],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        style={{ background: atm.blob1, transition: "background 1.2s ease" }}
        className="absolute inset-x-8 top-6 h-56 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.9, 0.4],
          x: [0, 80, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 22, ease: "easeInOut", repeat: Infinity }}
        style={{ background: atm.blob2, transition: "background 1.2s ease" }}
        className="absolute right-0 top-12 h-80 w-80 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="section-shell relative z-10 py-12 sm:py-16">
        <motion.div
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] xl:gap-16"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/6 px-4 py-2 text-xs uppercase tracking-[0.32em] text-cyan-100">
              New Season — SS 2026
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Dress Like
              <span className="text-gradient block">No One Else.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
              Vyapara curates clothing that speaks before you do — bold, considered, and built for people who live in the details.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a className="premium-button" href="#men">Shop the Drop</a>
              <a className="premium-button-secondary" href="#women">Explore Looks</a>
            </div>

            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="glass-panel rounded-[22px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Shipping</div>
                <div className="mt-2 text-sm font-medium text-white">Free over ₹1999</div>
              </div>
              <div className="glass-panel rounded-[22px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Returns</div>
                <div className="mt-2 text-sm font-medium text-white">7-day easy returns</div>
              </div>
              <div className="glass-panel rounded-[22px] px-4 py-4">
                <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Drops</div>
                <div className="mt-2 text-sm font-medium text-white">Fresh weekly edits</div>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[620px] lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel absolute right-0 top-0 w-[82%] overflow-hidden rounded-[36px] border-white/12 p-3 shadow-soft"
            >
              <div className="relative overflow-hidden rounded-[28px] bg-white">
                <img
                  alt={heroFeature.title}
                  className="h-[560px] w-full object-cover"
                  src={heroFeature.image}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Look Of The Week</div>
                  <div className="mt-2 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">{heroFeature.title}</h3>
                      <p className="mt-1 text-sm text-slate-200">{heroFeature.subtitle}</p>
                    </div>
                    <div className="text-lg font-semibold text-white">{heroFeature.price}</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -18, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel absolute left-0 top-10 w-[48%] rounded-[28px] border-white/12 p-4 shadow-soft"
            >
              <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-cyan-200">Trending Now</div>
              <div className="space-y-3">
                {spotlightProducts.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-[20px] bg-white/[0.03] p-3">
                    <img
                      alt={item.title}
                      className="h-16 w-16 rounded-2xl object-cover"
                      src={item.image}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-medium text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-slate-400">{item.category}</div>
                    </div>
                    <div className="text-sm font-medium text-white">{item.price}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -12, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel absolute bottom-10 left-10 max-w-[280px] rounded-[28px] border-white/12 p-5 shadow-soft"
            >
              <div className="text-[11px] uppercase tracking-[0.28em] text-cyan-200">Why Vyapara</div>
              <p className="mt-3 text-sm leading-6 text-slate-200">
                Premium silhouettes, fast-moving seasonal edits, and clean merchandising built to feel like a modern fashion storefront.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-300">
                <span className="rounded-full border border-white/10 px-3 py-1.5">Curated Fits</span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">Fresh Drops</span>
                <span className="rounded-full border border-white/10 px-3 py-1.5">Easy Returns</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;

import { motion } from "framer-motion";

function Newsletter() {
  return (
    <motion.section
      className="section-shell py-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-panel rounded-[32px] px-6 py-10 shadow-soft sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.28em] text-cyan-100/70">Newsletter</div>
          <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Get drop alerts and product launch notes.</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
            Monthly release recaps, exclusive previews, and conversion-focused Framer resources.
          </p>
        </div>

        <form className="mt-8 flex flex-col gap-4 sm:flex-row">
          <input
            className="min-h-14 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 text-white outline-none transition-all duration-300 ease-premium placeholder:text-slate-500 focus:border-cyan-300/40 focus:bg-white/[0.06] focus:shadow-[0_0_0_1px_rgba(110,231,255,0.15),0_0_30px_rgba(110,231,255,0.12)]"
            placeholder="Enter your email"
            type="email"
          />
          <button className="premium-button min-h-14 sm:px-7" type="submit">Subscribe</button>
        </form>
      </div>
    </motion.section>
  );
}

export default Newsletter;

import { AnimatePresence, motion } from "framer-motion";
import { useAtmosphere, ATMOSPHERES } from "../context/AtmosphereContext";

function AtmospherePicker({ open, onClose }) {
  const { current, setCurrent } = useAtmosphere();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[150]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full z-[151] mt-3 w-60 overflow-hidden rounded-[20px] border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-slate-500">Atmospheres</div>
            {Object.entries(ATMOSPHERES).map(([key, atm]) => (
              <button
                key={key}
                onClick={() => { setCurrent(key); onClose(); }}
                className={`flex w-full items-center gap-3 rounded-[14px] px-3 py-2.5 text-left transition-colors ${
                  current === key ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/6 hover:text-white"
                }`}
              >
                <span className="text-xl">{atm.icon}</span>
                <div>
                  <div className="text-sm font-medium">{atm.name}</div>
                </div>
                {current === key && (
                  <svg className="ml-auto h-4 w-4 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default AtmospherePicker;

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

function Stat({ label, value }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(motionValue, value, {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    });
    const unsubscribe = rounded.on("change", (latest) => setDisplay(String(latest).padStart(2, "0")));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, rounded, value]);

  return (
    <div className="glass-panel rounded-[24px] px-5 py-4 text-center">
      <motion.div
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        className="text-3xl font-semibold text-white"
      >
        {display}
      </motion.div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.28em] text-slate-500">{label}</div>
    </div>
  );
}

function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({ days: 3, hours: 12, minutes: 29, seconds: 44 });

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft((current) => {
        let { days, hours, minutes, seconds } = current;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 23;
          days = Math.max(days - 1, 0);
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.section
      className="section-shell py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-panel overflow-hidden rounded-[32px] bg-gradient-to-r from-cyan-400/8 via-transparent to-violet-500/10 px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-100/70">Limited Release</div>
            <h3 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Midnight Commerce bundle drops soon.</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">
              New Framer kits, device mockups, and conversion-optimized graphics release in a tightly curated drop.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat label="Days" value={timeLeft.days} />
            <Stat label="Hours" value={timeLeft.hours} />
            <Stat label="Minutes" value={timeLeft.minutes} />
            <Stat label="Seconds" value={timeLeft.seconds} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default CountdownBanner;

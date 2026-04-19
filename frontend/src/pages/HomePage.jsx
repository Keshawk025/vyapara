import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountdownBanner from "../components/CountdownBanner";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Newsletter from "../components/Newsletter";
import ProductSection from "../components/ProductSection";
import { productSections } from "../data/featuredProducts";
import { usePullToRefresh } from "../hooks/usePullToRefresh";

function RefreshIndicator({ pullDistance, isRefreshing, threshold }) {
  const progress = Math.min(pullDistance / threshold, 1);
  const circumference = 2 * Math.PI * 10; // radius 10

  return (
    <AnimatePresence>
      {(pullDistance > 4 || isRefreshing) && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.22 }}
          style={{ top: Math.max(pullDistance - 36, 8) }}
          className="pointer-events-none fixed left-1/2 z-[300] -translate-x-1/2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-slate-900/80 shadow-lg backdrop-blur-md">
            {isRefreshing ? (
              /* Spinning arc when actually refreshing */
              <svg className="h-5 w-5 animate-spin text-cyan-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v3l3-3-3-3v3a10 10 0 100 20 10 10 0 010-20z"/>
              </svg>
            ) : (
              /* Progress ring while pulling */
              <svg className="h-6 w-6 -rotate-90" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                <circle
                  cx="12" cy="12" r="10" fill="none"
                  stroke={progress >= 1 ? "rgba(0,246,255,1)" : "rgba(0,246,255,0.6)"}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * (1 - progress)}
                  style={{ transition: "stroke-dashoffset 0.05s linear, stroke 0.2s ease" }}
                />
                {progress >= 1 && (
                  <path
                    d="M8 12l3 3 5-5"
                    fill="none" stroke="rgba(0,246,255,1)"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                  />
                )}
              </svg>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 1800);
    return () => window.clearTimeout(timer);
  }, [refreshKey]);

  const handleRefresh = useCallback(() => {
    return new Promise((resolve) => {
      setRefreshKey((k) => k + 1);
      setTimeout(resolve, 1200);
    });
  }, []);

  const THRESHOLD = 80;
  const { pullDistance, isRefreshing } = usePullToRefresh(handleRefresh, THRESHOLD);

  return (
    <>
      <RefreshIndicator
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        threshold={THRESHOLD}
      />

      <motion.div
        id="top"
        className="pb-8"
        style={{
          transform: pullDistance > 0 ? `translateY(${Math.min(pullDistance * 0.4, 32)}px)` : "translateY(0)",
          transition: pullDistance === 0 ? "transform 0.5s cubic-bezier(0.33,1,0.68,1)" : "none",
        }}
      >
        <HeroSection />
        {productSections.map((section) => (
          <ProductSection
            key={`${section.id}-${refreshKey}`}
            eyebrow={section.eyebrow}
            id={section.id}
            loading={loading}
            products={section.products}
            title={section.title}
          />
        ))}
        <CountdownBanner />
        <Newsletter />
        <Footer />
      </motion.div>
    </>
  );
}

export default HomePage;

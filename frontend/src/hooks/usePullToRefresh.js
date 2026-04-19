import { useEffect, useRef, useState } from "react";

/**
 * usePullToRefresh
 * Detects a downward drag gesture from the top of the page on touch devices.
 * Returns { isPulling, pullDistance, isRefreshing }
 * and calls onRefresh() when the pull threshold is exceeded.
 */
export function usePullToRefresh(onRefresh, threshold = 80) {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const startY = useRef(null);

  useEffect(() => {
    function onTouchStart(e) {
      // Only activate when at the very top of the page
      if (window.scrollY === 0) {
        startY.current = e.touches[0].clientY;
      }
    }

    function onTouchMove(e) {
      if (startY.current === null) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta <= 0) return;

      // Dampen the pull feel (elastic resistance)
      const damped = Math.min(delta * 0.45, threshold * 1.5);
      setPullDistance(damped);
      setIsPulling(true);
    }

    function onTouchEnd() {
      if (!isPulling) return;
      if (pullDistance >= threshold) {
        setIsRefreshing(true);
        setPullDistance(threshold);
        Promise.resolve(onRefresh()).finally(() => {
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
            setIsPulling(false);
            startY.current = null;
          }, 600);
        });
      } else {
        setPullDistance(0);
        setIsPulling(false);
        startY.current = null;
      }
    }

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [isPulling, pullDistance, onRefresh, threshold]);

  return { isPulling, pullDistance, isRefreshing };
}

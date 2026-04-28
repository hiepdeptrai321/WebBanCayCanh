import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const SHOW_AFTER_PX = 420;
const MIN_SCROLLABLE_PX = 360;

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3);
}

function ScrollToTopButton() {
  const location = useLocation();
  const animationFrameRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const page = document.documentElement;
      const scrollableDistance = page.scrollHeight - window.innerHeight;
      const shouldShow =
        scrollableDistance > MIN_SCROLLABLE_PX && window.scrollY > SHOW_AFTER_PX;

      setIsVisible(shouldShow);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [location.pathname, location.search]);

  useEffect(() => {
    setIsVisible(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleScrollToTop = () => {
    if (animationFrameRef.current) {
      window.cancelAnimationFrame(animationFrameRef.current);
    }

    const startY = window.scrollY;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || startY <= 0) {
      window.scrollTo(0, 0);
      return;
    }

    const duration = Math.min(1200, Math.max(780, startY * 0.45));
    let startTime = null;

    function animateScroll(timestamp) {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      window.scrollTo(0, Math.round(startY * (1 - easedProgress)));

      if (progress < 1) {
        animationFrameRef.current = window.requestAnimationFrame(animateScroll);
      } else {
        animationFrameRef.current = null;
      }
    }

    animationFrameRef.current = window.requestAnimationFrame(animateScroll);
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Quay về đầu trang"
      title="Quay về đầu trang"
      className={`fixed bottom-5 right-5 z-[70] inline-flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-emerald-200 bg-emerald-700 shadow-[0_14px_35px_rgba(15,81,50,0.2)] transition duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:bg-emerald-600 focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
        isVisible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <span aria-hidden="true" className="relative h-7 w-7">
        <span className="absolute left-1/2 top-1.5 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-l-[4px] border-t-[4px] border-white" />
        <span className="absolute left-1/2 top-3.5 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border-l-[4px] border-t-[4px] border-white" />
      </span>
    </button>
  );
}

export default ScrollToTopButton;

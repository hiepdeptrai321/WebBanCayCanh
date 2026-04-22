// Test Counter Animation
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function TestCounter({ value, duration = 2, delay = 0 }) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      console.log(`🎯 Test Counter ${value} is in view`);
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        console.log(`🚀 Starting test counter animation for value: ${value}`);

        let startTime = null;
        const startValue = 0;
        const endValue = value;

        const animateCounter = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min(
            (timestamp - startTime) / (duration * 1000),
            1,
          );

          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const currentValue =
            startValue + (endValue - startValue) * easeOutQuart;

          setDisplayValue(Math.floor(currentValue));

          if (progress < 1) {
            requestAnimationFrame(animateCounter);
          } else {
            console.log(
              `✅ Test counter animation completed for value: ${value}`,
            );
            setIsAnimating(false);
          }
        };

        requestAnimationFrame(animateCounter);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, value, delay, duration]);

  return (
    <motion.div
      ref={ref}
      className="p-8 bg-blue-100 rounded-lg m-4"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
    >
      <h2 className="text-2xl font-bold mb-4">Test Counter: {value}</h2>
      <motion.div
        className="text-6xl font-black text-blue-600"
        animate={isAnimating ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: isAnimating ? Infinity : 0 }}
      >
        {displayValue.toLocaleString()}
      </motion.div>
      <p className="mt-2 text-sm text-gray-600">
        Status: {isInView ? "In View" : "Not in View"} | Animating:{" "}
        {isAnimating ? "Yes" : "No"}
      </p>
    </motion.div>
  );
}

export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Counter Animation Test
      </h1>
      <div className="space-y-8">
        <TestCounter value={200} delay={0} />
        <TestCounter value={5000} delay={0.5} />
        <TestCounter value={4.9} delay={1} />
      </div>
      <div className="mt-16 p-8 bg-yellow-100 rounded-lg">
        <h3 className="text-xl font-bold mb-4">Debug Info:</h3>
        <p>Open browser console (F12) to see animation logs</p>
        <p>Scroll down to trigger animations</p>
      </div>
    </div>
  );
}

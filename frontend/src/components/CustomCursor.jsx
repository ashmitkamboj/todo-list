import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({
    x: -100,
    y: -100,
  });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show on desktop (no touch devices)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const updateMousePosition = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName === "BUTTON" ||
        e.target.tagName === "A" ||
        e.target.tagName === "INPUT" ||
        e.target.classList.contains("login-placeholder")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <motion.div
      className="cursor-dot"
      animate={{
        x: mousePosition.x - 6,
        y: mousePosition.y - 6,
        scale: isHovering ? 3 : 1,
        opacity: isHovering ? 0.5 : 1
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      style={{
        width: 12,
        height: 12,
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'var(--secondary-color)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}

export default CustomCursor;

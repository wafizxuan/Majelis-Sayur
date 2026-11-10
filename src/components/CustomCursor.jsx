import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const hovered = useRef(false);

  useEffect(() => {
    // Disable on mobile devices
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      return;
    }

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => {
      hovered.current = true;
    };
    const onLeave = () => {
      hovered.current = false;
    };

    document.addEventListener("mousemove", onMove);
    document
      .querySelectorAll(
        'a, button, [role="button"], input, textarea, select, label',
      )
      .forEach((el) => {
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });

    const animate = () => {
      if (dotRef.current && ringRef.current) {
        // Dot follows immediately
        dotRef.current.style.transform = `translate(${
          pos.current.x - 12
        }px, ${pos.current.y - 12}px)`;

        // Ring follows with lag
        ring.current.x += (pos.current.x - ring.current.x) * 0.12;
        ring.current.y += (pos.current.y - ring.current.y) * 0.12;
        const scale = hovered.current ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${
          ring.current.x - 16
        }px, ${ring.current.y - 16}px) scale(${scale})`;
        ringRef.current.style.opacity = hovered.current ? "0.6" : "1";
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <img
        ref={dotRef}
        src="/leaf-cursor.png"
        alt=""
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 24,
          height: 24,
          pointerEvents: "none",
          zIndex: 99999,
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="hidden md:block"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 32,
          height: 32,
          borderRadius: "50%",
          border: "1px solid #4A5E3A",
          pointerEvents: "none",
          zIndex: 99998,
          willChange: "transform",
          transition: "opacity 0.2s ease, scale 0.2s ease",
        }}
      />
    </>
  );
}

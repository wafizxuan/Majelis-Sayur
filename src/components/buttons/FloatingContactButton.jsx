import React, { useState } from "react";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "WhatsApp",
      url: "https://wa.me/08123456789",
      icon: "https://cdn-icons-png.flaticon.com/512/733/733585.png",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/majelissayur",
      icon: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
    },
    {
      name: "Facebook",
      url: "#",
      icon: "https://cdn-icons-png.flaticon.com/512/5968/5968764.png",
    },
    {
      name: "YouTube",
      url: "#",
      icon: "https://cdn-icons-png.flaticon.com/512/1384/1384060.png",
    },
  ];

  return (
    <div
      className="mb-8 md:mb-0"
      style={{
        position: "fixed",
        bottom: "24px",
        right: "16px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {/* Social Links (Animated) */}
      {socialLinks.map((link, index) => (
        <a
          key={link.name}
          href={link.url}
          style={{
            backgroundColor: "#5A6B45",
            color: "#F5F0E8",
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? "translateY(0)" : `translateY(${index * 20}px)`,
            transition: `all 0.3s ease ${index * 0.05}s`,
            boxShadow: "0 2px 8px rgba(28,28,24,0.2)",
            overflow: "hidden",
          }}
        >
          <img
            src={link.icon}
            alt={link.name}
            style={{ width: "24px", height: "24px", objectFit: "contain" }}
          />
        </a>
      ))}

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#4A5E3A",
          color: "#F5F0E8",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          boxShadow: "0 4px 12px rgba(28, 28, 24, 0.3)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};

export default FloatingContactButton;

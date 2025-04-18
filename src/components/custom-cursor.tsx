"use client";

import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
    };

    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    let moveTimeout: NodeJS.Timeout;
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Set moving state to true
      setIsMoving(true);
      
      // Clear the existing timeout
      clearTimeout(moveTimeout);
      
      // Set a timeout to set moving state to false after mouse stops
      moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer")
      ) {
        setLinkHovered(true);
      } else {
        setLinkHovered(false);
      }
    };

    addEventListeners();
    setTimeout(() => {
      setHidden(false);
    }, 1000);

    return () => {
      removeEventListeners();
      clearTimeout(moveTimeout);
    };
  }, []);

  return (
    <>
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          width: clicked ? "12px" : linkHovered ? "30px" : "16px",
          height: clicked ? "12px" : linkHovered ? "30px" : "16px",
          transform: `translate(-50%, -50%) scale(${isMoving ? 0.8 : 1})`,
          backgroundColor: linkHovered ? "var(--accent)" : "var(--primary)",
        }}
        className="custom-cursor"
      />
      <div
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : isMoving ? 0.7 : 0.5,
          width: clicked ? "30px" : linkHovered ? "50px" : "40px",
          height: clicked ? "30px" : linkHovered ? "50px" : "40px",
          borderColor: linkHovered ? "var(--accent)" : "var(--primary)",
          transform: `translate(-50%, -50%) scale(${isMoving ? 1.1 : 1})`,
        }}
        className="custom-cursor-follower"
      />
    </>
  );
};

export default CustomCursor; 
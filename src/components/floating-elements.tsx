"use client";

import { useEffect, useState } from "react";
import { FiCode, FiCpu, FiGithub, FiTerminal, FiServer, FiDatabase, FiGrid, FiHardDrive } from "react-icons/fi";
import { DiJavascript1, DiPython, DiReact, DiCss3, DiHtml5, DiNodejsSmall } from "react-icons/di";

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    direction: number;
    element: JSX.Element | null;
  }>>([]);

  useEffect(() => {
    // Create random floating elements
    const techIcons = [
      <FiCode key="code" className="tech-icon" />,
      <FiCpu key="cpu" className="tech-icon" />,
      <FiGithub key="github" className="tech-icon" />,
      <FiTerminal key="terminal" className="tech-icon" />,
      <FiServer key="server" className="tech-icon" />,
      <FiDatabase key="database" className="tech-icon" />,
      <FiGrid key="grid" className="tech-icon" />,
      <FiHardDrive key="harddrive" className="tech-icon" />,
      <DiJavascript1 key="js" className="tech-icon" />,
      <DiPython key="python" className="tech-icon" />,
      <DiReact key="react" className="tech-icon" />,
      <DiCss3 key="css" className="tech-icon" />,
      <DiHtml5 key="html" className="tech-icon" />,
      <DiNodejsSmall key="node" className="tech-icon" />,
    ];

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const newElements = [];

    // Generate tech icons (10-15)
    const numIcons = Math.floor(Math.random() * 6) + 10; // 10-15 icons
    for (let i = 0; i < numIcons; i++) {
      const iconIndex = Math.floor(Math.random() * techIcons.length);
      newElements.push({
        id: i,
        x: Math.random() * 100, // position in % of viewport width
        y: Math.random() * 100, // position in % of viewport height
        size: Math.floor(Math.random() * 16) + 12, // size between 12px and 28px
        duration: Math.floor(Math.random() * 20) + 20, // animation duration in seconds
        delay: Math.random() * -30, // animation delay in seconds (negative for different starting positions)
        direction: Math.random() > 0.5 ? 1 : -1, // direction of movement
        element: techIcons[iconIndex],
      });
    }

    // Generate particles (15-25)
    const numParticles = Math.floor(Math.random() * 11) + 15; // 15-25 particles
    for (let i = 0; i < numParticles; i++) {
      newElements.push({
        id: i + numIcons,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.floor(Math.random() * 5) + 2, // particles are smaller (2-6px)
        duration: Math.floor(Math.random() * 30) + 15,
        delay: Math.random() * -30,
        direction: Math.random() > 0.5 ? 1 : -1,
        element: null, // no icon for particles
      });
    }

    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {elements.map((item) => (
        <div
          key={item.id}
          className={item.element ? "" : "particle"}
          style={{
            position: "absolute",
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: item.element ? "auto" : `${item.size}px`,
            height: item.element ? "auto" : `${item.size}px`,
            fontSize: item.element ? `${item.size}px` : undefined,
            animation: `float ${item.duration}s ease-in-out infinite ${item.delay}s`,
            transform: `translate(-50%, -50%) translateY(${item.direction * 15}px)`,
          }}
        >
          {item.element}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements; 
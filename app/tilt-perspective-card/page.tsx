"use client";

import React, { useState } from "react";

const TiltPerspectiveCard = () => {
  const [transformValues, setTransformValues] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const { width, height, left, top } = card.getBoundingClientRect();

    // Mouse position relative to the center
    const mouseX = e.clientX - left - width / 2;
    const mouseY = e.clientY - top - height / 2;

    // Calculate tilt
    const rotateY = (mouseX / width) * 40; // Horizontal rotation
    const rotateX = -(mouseY / height) * 40; // Vertical rotation

    setTransformValues({
      rotateX,
      rotateY,
      scale: 1.25,
    });
  };

  const handleMouseLeave = () => {
    setTransformValues({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
    });
  };

  return (
    <main className="min-h-screen w-full bg-[#F3F3EF] text-black">
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="w-full h-screen flex items-center">
          <div className="h-full w-full mx-auto flex justify-center items-center">
            <p className="flex flex-col items-end uppercase text-5xl font-extrabold">
              <span>Identity,</span>
              <span>Website</span>
            </p>
          </div>
          <div className="w-full h-full flex justify-center items-center overflow-hidden">
            {/* sirst div  */}
            <div
              className="absolute shadow-lg cursor-pointer box-border"
              style={{
                translate: "none",
                scale: "none",
                rotate: "none",
                opacity: 1,
                visibility: "inherit",
                zIndex: 1,
                transformOrigin: "50% 50% 0px",
                transform: "translate(0px, 0px) scale(1)",
              }}
            >
              <div
                className="w-72 h-80 rounded-2xl shadow-lg overflow-hidden bg-red-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(800px) rotateY(${transformValues.rotateY}deg) rotateX(${transformValues.rotateX}deg) scale(${transformValues.scale})`,
                  transition: "transform 0.2s ease-out",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              ></div>
            </div>
            {/* second div  */}
            <div
              className="absolute shadow-lg cursor-pointer box-border"
              style={{
                translate: "none",
                scale: "none",
                rotate: "none",
                opacity: 0.85,
                visibility: "inherit",
                zIndex: 0,
                transformOrigin: "50% 50% 0px",
                transform: "translate(0px, 20px) scale(0.95)",
              }}
            >
              <div
                className="w-72 h-80 rounded-2xl shadow-lg overflow-hidden bg-teal-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(800px) rotateY(${transformValues.rotateY}deg) rotateX(${transformValues.rotateX}deg) scale(${transformValues.scale})`,
                  transition: "transform 0.2s ease-out",
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              ></div>
            </div>
          </div>
          <div className="h-full w-full mx-auto flex justify-center items-center">
            <p className="flex flex-col items-end uppercase text-5xl font-extrabold">
              <span className="flex items-start">
                <span>Perspective</span>
                <span className="text-base py-1.5">2024</span>
              </span>
              <span>Card</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TiltPerspectiveCard;

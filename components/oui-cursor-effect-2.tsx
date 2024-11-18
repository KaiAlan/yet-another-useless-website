"use client";

import React, { useState } from "react";

// Utility function to get a random number between min and max
const getRandomNumber = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const OuiFallEffect = () => {
  const [ouis, setOuis] = useState<
    {
      x: number;
      y: number;
      id: number;
      size: number;
      animationType: string;
      animationDuration: number;
    }[]
  >([]);

  const [images, setImages] = useState<
    {
      id: number;
      size: number;
      x: number; // Starting position (horizontal)
      y: number; // Starting position (vertical)
      animationDuration: number;
    }[]
  >([]);

  const start = new Date().getTime();

  const originPosition = { x: 0, y: 0 };

  const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition,
  };

  const config = {
    minimumTimeBetweenOuis: 1500, // Increased time threshold to reduce spawning
    minimumDistanceBetweenOuis: 150, // Increased distance threshold to reduce spawning
  };

  const adjustLastMousePosition = (position: { x: number; y: number }) => {
    if (last.mousePosition.x === 0 && last.mousePosition.y === 0) {
      last.mousePosition = position;
    }
  };

  const calcDistance = (
    a: { x: number; y: number },
    b: { x: number; y: number }
  ) => {
    const diffX = b.x - a.x,
      diffY = b.y - a.y;

    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  };

  const calcElapsedTime = (start: number, end: number) => end - start;

  // Function to play sound for each new "oui" element
  const playSound = (duration: number) => {
    const audio = new Audio("/sounds/oui-sound.mp3"); // Make sure the sound file is in the public folder
    audio.volume = 0.3;
    audio.play();

    // Stop the sound after it finishes (matching the span's lifetime)
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0; // Reset sound to the start for next play
    }, duration * 1000); // Match audio duration with the animation duration
  };

  const handlemousemove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const mousePosition = { x: e.clientX, y: e.clientY };
    adjustLastMousePosition(mousePosition);

    const now = new Date().getTime();
    const hasMovedFarEnough =
      calcDistance(last.starPosition, mousePosition) >=
      config.minimumDistanceBetweenOuis;
    const hasBeenLongEnough =
      calcElapsedTime(last.starTimestamp, now) > config.minimumTimeBetweenOuis;

    if (hasMovedFarEnough || hasBeenLongEnough) {
      last.starTimestamp = now;
      last.starPosition = mousePosition;

      handleAddImage();

      const ouiId = now;
      const size = getRandomNumber(8, 24); // Random font size between 12px and 24px
      const animationDuration = getRandomNumber(1, 3); // Random animation duration between 1s and 3s

      // Randomly assign one of three animation types
      const animationTypes = ["spread-left", "spread-right", "fall-down"];
      const animationType =
        animationTypes[Math.floor(Math.random() * animationTypes.length)];

      // Add new "oui" span to the array
      setOuis((prev) => [
        ...prev,
        {
          x: mousePosition.x,
          y: mousePosition.y,
          id: ouiId,
          size,
          animationType,
          animationDuration,
        },
      ]);

      // Play sound with the same duration as the animation
      playSound(animationDuration);

      // Remove the "oui" after its animation ends (animation duration + buffer)
      setTimeout(() => {
        setOuis((prev) => prev.filter((oui) => oui.id !== ouiId));
      }, animationDuration * 500 + 500);
    }
  };

  const handleAddImage = () => {
    const now = new Date().getTime();
    const id = now;

    // Random size for images
    const size = getRandomNumber(30, 80); // Adjust to your preference

    // Random x position along the bottom edge
    const startX = getRandomNumber(0, window.innerWidth - size);

    // Start y position: at the bottom of the screen
    const startY = window.innerHeight - size;

    // Random animation duration
    const animationDuration = getRandomNumber(2, 4); // Between 2 and 4 seconds

    // Add new image
    setImages((prev) => [
      ...prev,
      { id, size, x: startX, y: startY, animationDuration },
    ]);

    // Remove the image after animation ends
    setTimeout(() => {
      setImages((prev) => prev.filter((image) => image.id !== id));
    }, animationDuration * 1000);
  };

  return (
    <div
      onMouseMove={handlemousemove}
      className="relative h-screen w-screen bg-black overflow-hidden"
    >
      {ouis.map((oui) => (
        <span
          key={oui.id}
          className={`absolute text-white/30 font-thin pointer-events-none z-10`}
          style={{
            top: `${oui.y}px`,
            left: `${oui.x}px`,
            fontSize: `${oui.size}px`,
            animation: `${oui.animationType} ${oui.animationDuration}s ease-in forwards`,
          }}
        >
          oui
        </span>
      ))}

      {images.map((image) => (
        <img
          key={image.id}
          src="/images/screaming-cat.gif" // Path to your GIF
          alt="Effect"
          style={{
            position: "absolute",
            width: `${image.size}px`,
            height: `${image.size}px`,
            bottom: `0px`,
            right: `${image.x}px`,
            animation: `floatUp ${image.animationDuration}s linear forwards`,
          }}
        />
      ))}

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes spread-left {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-150px, 200px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes spread-right {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(150px, 200px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes fall-down {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(0, 300px) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh); /* Float upwards across the screen */
            opacity: 0; /* Fade out */
          }
        }
      `}</style>
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Move your Mouse to see the effect.</h1>
      </div>
    </div>
  );
};

export default OuiFallEffect;

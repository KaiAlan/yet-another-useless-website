"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
// import Image from "next/image";
import React, { useRef, useState } from "react";

const PixelifyImage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pixelSize, setPixelSize] = useState(10);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          setImage(img);
          setFileName(file.name);
          pixelateImage(img, pixelSize); // Pixelate immediately on upload
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const pixelateImage = (img: HTMLImageElement, pixelSize: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = img.width;
    canvas.height = img.height;

    // Draw the original image
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { width, height, data } = imageData;

    // Apply pixelation
    for (let y = 0; y < height; y += pixelSize) {
      for (let x = 0; x < width; x += pixelSize) {
        const index = (y * width + x) * 4;

        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3];

        // Fill the block with the same color
        for (let dy = 0; dy < pixelSize; dy++) {
          for (let dx = 0; dx < pixelSize; dx++) {
            const pixelIndex = ((y + dy) * width + (x + dx)) * 4;
            if (x + dx < width && y + dy < height) {
              data[pixelIndex] = r;
              data[pixelIndex + 1] = g;
              data[pixelIndex + 2] = b;
              data[pixelIndex + 3] = a;
            }
          }
        }
      }
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const downloadCanvasAsImage = (
    canvas: HTMLCanvasElement | null,
    filename: string = `pixelified-${fileName}` || "pixelified-image.png"
  ) => {
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handlePixelSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number(e.target.value);
    setPixelSize(newSize);
    if (image) {
      pixelateImage(image, newSize); // Update pixelation on slider change
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center bg-black py-10 pt-20 px-2 gap-4 mx-auto">
      {/* <img
        src='/svg/ooorganize.svg'
        alt="bg"
        width={0}
        height={0}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-black/100 to-black/0"
      /> */}
      <h1 className="text-5xl font-bold mb-4">Fast Image Pixelify</h1>

      <div className="w-full flex flex-col justify-center items-center gap-6 mb-8 mx-auto">
        <div className="flex justify-center items-center gap-4">
          {/* Upload Button */}
          <div className="">
            <Label
              htmlFor="imageUpload"
              className="h-9 px-4 py-3 shadow bg-blue-500 text-white rounded-sm cursor-pointer hover:bg-blue-600 transition"
            >
              Upload Image
            </Label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/* Download File  */}
          <Button
            onClick={() => downloadCanvasAsImage(canvasRef.current)}
            className="px-4 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Download
          </Button>
        </div>
        <div className="mb-4 flex justify-center items-center gap-2">
          <label htmlFor="pixelSize" className="mr-2 text-red-600">
            Pixel Size:
          </label>
          <input
            id="pixelSize"
            type="range"
            min="2"
            max="50"
            value={pixelSize}
            onChange={handlePixelSizeChange}
          />
          <span className="ml-2">{pixelSize}</span>
        </div>
      </div>

      <div className="w-full flex flex-col justify-center items-center mx-auto gap-4">
        {/* Display Uploaded File Name */}
        {fileName && (
          <p className="text-lg text-gray-700">Uploaded File: {fileName}</p>
        )}
        <canvas
          ref={canvasRef}
          className="border border-gray-300 max-w-lg w-full h-auto"
        ></canvas>
      </div>
    </div>
  );
};

export default PixelifyImage;

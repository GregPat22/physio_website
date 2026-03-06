"use client";

import React from "react";
import { Ticker } from "motion-plus/react";
import Card from "./card";

const images = [
  "/reviews/review1.png",
  "/reviews/review2.png",
  "/reviews/review3.png",
  "/reviews/review4.png",
];

function Carousel() {
  return (
    <div className="relative min-w-0 flex-1 overflow-hidden">
      <Ticker
        velocity={-30}
        gap={24}
        hoverFactor={0.4}
        fade={40}
        items={images.map((image, index) => (
          <Card key={index} image={image} index={index} />
        ))}
      />
    </div>
  );
}

export default Carousel;

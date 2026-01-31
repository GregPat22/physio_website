import React from "react";
import Card from "./card";

function Carousel() {
  const images = [
    "/reviews/review1.png",
    "/reviews/review2.png",
    "/reviews/review3.png",
    "/reviews/review4.png",
  ];
  return (
    <main className="mx-auto w-[8px] py-8">
      <div className="absolute left-0 flex gap-4">
        {images.map((image, index) => (
          <Card image={image} index={index} />
        ))}
      </div>
    </main>
  );
}

export default Carousel;

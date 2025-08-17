import { useEffect, useState } from "react";

const images = [
  "/images/capri 1.jpg",
  "/images/capri 2.jpg",
  "/images/capri 3.jpg",
  "/images/capri 4.jpg",
];

export default function ImageSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`slide-${i}`}
          className={`slide ${i === index ? "active" : ""}`}
        />
      ))}
    </div>
  );
}

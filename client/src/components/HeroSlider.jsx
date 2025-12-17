import React, { useState, useEffect } from "react";
import "./HeroSlider.css";

const images = [
  "https://hsclothing.in/wp-content/uploads/2021/09/Slider-02-hsclothing-02.jpg",
  "https://radheshyamgarments.com/wp-content/uploads/2021/05/Slider-2.jpg",
  "https://images.squarespace-cdn.com/content/v1/5a4e3c41d7bdce6edbce3760/1632239192952-2NR7I7QPV9D6C79ZYGFO/website+slider+images-04.jpg",
  "https://divihat.com/media/2022/11/Clothing-Divi-Hero-Section.jpg",
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  // Auto slide every 3 seconds
        useEffect(() => {
        const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // ⏱️ changed from 4000 to 3000

        return () => clearInterval(timer);
        }, []);

  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container">
      <img src={images[index]} alt="Slide" className="slide-image" />

      {/* Arrows */}
      <button className="arrow left" onClick={goPrev}>
        ❮
      </button>
      <button className="arrow right" onClick={goNext}>
        ❯
      </button>

      {/* Dots */}
      <div className="dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

     
    </div>
  );
};

export default HeroSlider;

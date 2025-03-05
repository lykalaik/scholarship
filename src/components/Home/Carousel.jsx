import { useState, useEffect } from "react";

const Carousel = ({ imagesData, autoScrollInterval = 1500 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imagesData.length === 0) return;

    // Simulate loading time
    setTimeout(() => setLoading(false), 1500);

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
    }, autoScrollInterval);

    return () => clearInterval(interval);
  }, [imagesData.length]);

  return (
    <div className="carousel w-full rounded overflow-hidden mb-8 relative">
      {loading ? (
        <div className="w-full h-96 bg-gray-300 animate-pulse flex items-center justify-center">
          <p className="text-gray-500">Loading images...</p>
        </div>
      ) : imagesData.length > 0 ? (
        imagesData.map((image, index) => (
          <div
            key={index}
            className={`carousel-item w-full ${
              index === currentIndex ? "block" : "hidden"
            }`}
          >
            <img
              src={image.picture}
              className="w-full max-h-[calc(100vh-150px)] h-auto object-cover transition-opacity duration-700"
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No images available.</p>
      )}
    </div>
  );
};

export default Carousel;

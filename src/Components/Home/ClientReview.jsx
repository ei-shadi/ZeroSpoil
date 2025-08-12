import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, useMotionValue, animate } from "framer-motion";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";

const fetchReviews = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/reviews-data`);
  return res.data;
};

const ReviewCard = React.memo(({ review, onHoverStart, onHoverEnd }) => (
  <motion.div
    className="relative w-80 sm:w-96 flex-shrink-0 rounded-xl overflow-hidden shadow-lg bg-gradient-to-t from-[#009CB3] to-black text-white p-8 cursor-grab select-none"
    whileHover={{
      scale: 1.05,
      y: -10,
      transition: { type: "spring", stiffness: 300 },
    }}
    whileTap={{ cursor: "grabbing" }}
    onHoverStart={onHoverStart}
    onHoverEnd={onHoverEnd}
  >
    <div className="flex items-center space-x-6 mb-6">
      <img
        src={review.photo}
        alt={`Profile picture of ${review.name}, ${review.role}`}
        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover"
      />
      <div>
        <h3 className="text-xl sm:text-2xl font-bold">{review.name}</h3>
        <p className="text-base sm:text-lg text-[#e07a5f]">{review.role}</p>
      </div>
    </div>
    <p className="italic text-base sm:text-lg leading-relaxed">
      "{review.text}"
    </p>
  </motion.div>
));

export default function ClientReviewCarousel() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const hoveredCards = useRef(new Set());
  const x = useMotionValue(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const animationControls = useRef(null);

  const { data: reviews, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  useEffect(() => {
    const updateWidths = () => {
      if (containerRef.current && trackRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        const firstCard = trackRef.current.querySelector('div');
        if (firstCard) {
          setCardWidth(firstCard.offsetWidth + 24); // card width + gap
        }
      }
    };
    
    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, [reviews]);

  const startAutoScroll = () => {
    if (!reviews || !cardWidth || isDragging.current || hoveredCards.current.size > 0) return;

    const totalWidth = cardWidth * reviews.length;
    const currentX = x.get();
    const targetX = -totalWidth;
    const distance = Math.abs(targetX - currentX);
    const duration = distance / 50; // pixels per second

    if (animationControls.current) {
      animationControls.current.stop();
    }

    animationControls.current = animate(x, targetX, {
      duration,
      ease: "linear",
      onComplete: () => {
        x.set(0);
        startAutoScroll();
      }
    });
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (animationControls.current) {
        animationControls.current.stop();
      }
    };
  }, [reviews, cardWidth]);

  const handleDragStart = () => {
    isDragging.current = true;
    if (animationControls.current) {
      animationControls.current.stop();
    }
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    if (hoveredCards.current.size === 0) {
      startAutoScroll();
    }
  };

  const handleCardHoverStart = (cardId) => {
    hoveredCards.current.add(cardId);
    if (animationControls.current) {
      animationControls.current.stop();
    }
  };

  const handleCardHoverEnd = (cardId) => {
    hoveredCards.current.delete(cardId);
    if (!isDragging.current && hoveredCards.current.size === 0) {
      startAutoScroll();
    }
  };

  if (isLoading)
    return (
      <section className="w-full py-12 md:py-20 flex flex-col items-center justify-center">
        <p>Loading reviews...</p>
      </section>
    );

  if (isError)
    return (
      <section className="w-full py-12 md:py-20 flex flex-col items-center justify-center">
        <p>Error loading reviews: {error.message}</p>
      </section>
    );

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Client Reviews"
      className="w-full py-12 md:py-20 flex flex-col items-center justify-center"
    >
      <div className="w-full">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight px-5 w-[90%] sm:w-[600px] lg:w-full mx-auto">
            What
            <span className="text-[#a05cff] italic px-3">Our Clients'</span> Say
            <HiOutlineClipboardDocumentList className="inline ml-2 text-[#8338EC]" />
          </h1>
          <p className="text-lg md:text-xl text-center des-color mx-auto mt-2 md:mt-6 max-w-4xl px-6 sm:px-10 mb-10 md:mb-14 font-semibold opacity-70">
            Hear directly from our clients about their experience working with
            us and why they trust our services. Their feedback inspires us to
            keep delivering excellence every day.
          </p>
        </header>

        <motion.div
          ref={containerRef}
          className="overflow-hidden cursor-grab bg-gradient-to-t from-[#002d365b] to-[#002d365b] min-h-[300px] h-[40vh] md:h-[50vh]"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 py-6 px-4 items-center h-full"
            style={{ x }}
            drag="x"
            dragConstraints={{
              right: 0,
              left: -(cardWidth * reviews.length - containerWidth),
            }}
            dragElastic={0.1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            {reviews.map((review, index) => (
              <ReviewCard 
                key={`${review.id}-${index}`} 
                review={review}
                onHoverStart={() => handleCardHoverStart(review.id)}
                onHoverEnd={() => handleCardHoverEnd(review.id)}
              />
            ))}
            {/* Clone items for seamless looping */}
            {reviews.map((review, index) => (
              <ReviewCard 
                key={`clone-${review.id}-${index}`} 
                review={review}
                onHoverStart={() => handleCardHoverStart(`clone-${review.id}`)}
                onHoverEnd={() => handleCardHoverEnd(`clone-${review.id}`)}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
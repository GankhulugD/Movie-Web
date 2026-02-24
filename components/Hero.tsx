"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface HeroMovie {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
  trailerKey: string | null; // Серверээс ирнэ
}

export const Hero = ({ movies }: { movies: HeroMovie[] }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % movies.length);
  }, [movies.length]);

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const currentMovie = movies[index];

  return (
    <div className="relative w-full h-auto overflow-hidden group">
      <div className="relative h-[246px] md:h-[500px] lg:h-[600px] w-full bg-black">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0.5, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0.5, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
              alt={currentMovie.title}
              fill
              priority
              className="object-cover opacity-80 md:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent md:bg-black/30" />

            {/* Desktop Content */}
            <div className="absolute inset-0 hidden md:flex flex-col justify-center px-[140px] text-white">
              <div className="max-w-[440px]">
                <p className="text-[14px] mb-1">Now Playing:</p>
                <h2 className="text-[24px] md:text-[40px] font-bold mb-3">
                  {currentMovie.title}
                </h2>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="font-semibold text-[18px]">
                    {currentMovie.vote_average.toFixed(1)}
                  </span>
                  <span className="text-white opacity-70">/10</span>
                </div>
                <p className="text-sm line-clamp-3 mb-6 opacity-90">
                  {currentMovie.overview}
                </p>

                {currentMovie.trailerKey && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="flex justify-center bg-[#F4F4F5] h-[40px] w-[145px] rounded-lg items-center gap-2 cursor-pointer hover:bg-white transition-all text-black">
                        <Play className="w-4 h-4 fill-black" />
                        <span className="text-[14px] font-medium">
                          Watch Trailer
                        </span>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 bg-black border-none aspect-video">
                      <DialogHeader className="sr-only">
                        <DialogTitle>{currentMovie.title} Trailer</DialogTitle>
                      </DialogHeader>
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${currentMovie.trailerKey}?autoplay=1`}
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </DialogContent>
                  </Dialog>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full hidden md:flex items-center justify-center backdrop-blur-md z-20"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-10 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full hidden md:flex items-center justify-center backdrop-blur-md z-20"
        >
          ❯
        </button>
      </div>

      {/* Mobile Content */}
      <div className="p-5 text-black dark:text-white md:hidden bg-white dark:bg-[#09090B]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[14px] opacity-70">Now Playing:</p>
            <p className="text-[20px] font-semibold leading-tight">
              {currentMovie.title}
            </p>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-yellow-500">⭐</span>
            <p className="font-semibold text-[18px]">
              {currentMovie.vote_average.toFixed(1)}
            </p>
            <p className="text-[#71717A] text-sm">/10</p>
          </div>
        </div>
        <p className="text-[14px] opacity-80 line-clamp-3 mb-4">
          {currentMovie.overview}
        </p>

        {currentMovie.trailerKey && (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex justify-center bg-[#18181B] dark:bg-[#F4F4F5] h-[40px] w-[145px] rounded-lg items-center gap-2 text-white dark:text-black">
                <Play className="w-4 h-4 fill-current" />
                <span className="text-[14px] font-medium">Watch Trailer</span>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] p-0 bg-black border-none aspect-video">
              <DialogHeader className="sr-only">
                <DialogTitle>{currentMovie.title} Trailer</DialogTitle>
              </DialogHeader>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentMovie.trailerKey}?autoplay=1`}
                allowFullScreen
                className="w-full h-full"
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Pagination Dots */}
      <div className="absolute top-[210px] md:top-auto md:bottom-10 left-[20px] md:left-[140px] flex gap-3 z-30">
        {movies.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${index === i ? "w-10 bg-white" : "w-4 bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

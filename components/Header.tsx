"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Search, Film, X, ArrowLeft } from "lucide-react";
import { getGenres, Genre, Movie, searchMovies } from "@/app/utils/get-data";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

export const Header = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    getGenres().then((data) => setGenres(data.genres));
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchValue.trim()) {
        const data = await searchMovies(searchValue);
        setResults(data.results.slice(0, 5));
        setShowResults(true);
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);

  const handleSeeMore = () => {
    router.push(`/search?query=${encodeURIComponent(searchValue)}`);
    setShowResults(false);
    setIsMobileSearchOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto h-[59px] flex items-center justify-between px-4">
        {/* Logo */}
        {!isMobileSearchOpen && (
          <Link
            href="/"
            className="flex gap-2 items-center text-[#4338CA] dark:text-[#6366F1] font-bold text-lg shrink-0"
          >
            <Film className="w-5 h-5" />
            <span>Movie Z</span>
          </Link>
        )}

        <div
          className={`flex flex-1 items-center justify-end gap-2 ${isMobileSearchOpen ? "w-full" : ""}`}
        >
          {/* Genre Dropdown (Desktop) */}
          {!isMobileSearchOpen && (
            <div className="relative hidden md:block">
              <button
                onClick={() => setIsGenreOpen(!isGenreOpen)}
                className="flex items-center gap-1 px-3 py-2 border border-gray-200 dark:border-gray-800 rounded-md text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Genres{" "}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${isGenreOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isGenreOpen && (
                <div className="absolute top-full left-0 mt-2 w-[500px] bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-4 grid grid-cols-3 gap-2 z-50">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => {
                        router.push(`/search?genres=${genre.id}`);
                        setIsGenreOpen(false);
                      }}
                      className="text-left text-sm p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors border border-transparent hover:border-gray-200"
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Search Bar */}
          <div
            className={`${isMobileSearchOpen ? "flex w-full" : "hidden md:flex"} relative max-w-md flex-1 items-center gap-2`}
          >
            {isMobileSearchOpen && (
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="p-1"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 dark:bg-gray-900 border-none rounded-md py-2 pl-10 pr-10 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <X
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 cursor-pointer text-gray-400"
                  onClick={() => setSearchValue("")}
                />
              )}
            </div>

            {/* Quick Results */}
            {showResults && results.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#09090B] border border-gray-200 dark:border-gray-800 rounded-lg shadow-2xl z-50 overflow-hidden">
                {results.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    onClick={() => {
                      setShowResults(false);
                      setIsMobileSearchOpen(false);
                    }}
                    className="flex items-center gap-3 p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <div className="relative w-8 h-12 shrink-0">
                      <Image
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w92${movie.poster_path}`
                            : "/no-image.png"
                        }
                        alt=""
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <span className="text-sm font-medium truncate">
                      {movie.title}
                    </span>
                  </Link>
                ))}
                <button
                  onClick={handleSeeMore}
                  className="w-full py-2 bg-gray-50 dark:bg-gray-800/50 text-xs font-bold border-t border-gray-200 dark:border-gray-800"
                >
                  See all results
                </button>
              </div>
            )}
          </div>

          {!isMobileSearchOpen && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMobileSearchOpen(true)}
                className="p-2 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <Search className="h-5 w-5" />
              </button>
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

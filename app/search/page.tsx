import {
  getGenres,
  getDiscoverMovies,
  searchMovies,
  Movie,
} from "@/app/utils/get-data";
import { MovieSectionFull } from "@/components/MovieSection";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; genres?: string; page?: string }>;
}) {
  const { query, genres, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const selectedGenres = genres ? genres.split(",") : [];
  const selectedGenreIds = selectedGenres.map(Number); // Тоо руу хөрвүүлэх

  const { genres: allGenres } = await getGenres();

  let finalMovies: Movie[] = [];
  let totalPages = 0;

  if (query) {
    // 1. Зөвхөн текстээр хайх
    const data = await searchMovies(query, currentPage);
    totalPages = Math.min(data.total_pages, 500);

    // 2. Хэрэв жанр бас сонгогдсон байвал илэрцүүдээ давхар шүүнэ
    if (selectedGenreIds.length > 0) {
      finalMovies = data.results.filter((movie) =>
        // Киноны genre_ids дотор сонгосон бүх жанр багтсан эсэхийг шалгах (AND logic)
        selectedGenreIds.every((id) => movie.genre_ids?.includes(id)),
      );
    } else {
      finalMovies = data.results;
    }
  } else if (genres) {
    // 3. Зөвхөн жанраар шүүх (Discover API)
    const data = await getDiscoverMovies(genres, currentPage);
    finalMovies = data.results;
    totalPages = Math.min(data.total_pages, 500);
  } else {
    // 4. Юу ч байхгүй үед хоосон байх
    finalMovies = [];
    totalPages = 0;
  }

  // URL үүсгэх туслах функц
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (genres) params.set("genres", genres);
    params.set("page", pageNumber.toString());
    return `/search?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-5 pt-10 flex flex-col md:flex-row gap-10 pb-20">
      {/* Genre Sidebar */}
      <div className="w-full md:w-60 shrink-0">
        <h2 className="text-xl font-bold mb-5">Genres</h2>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((genre) => {
            const isSelected = selectedGenres.includes(genre.id.toString());
            const newGenresArray = isSelected
              ? selectedGenres.filter((id) => id !== genre.id.toString())
              : [...selectedGenres, genre.id.toString()];

            const newGenresString = newGenresArray.join(",");
            const url = `/search?${new URLSearchParams({
              ...(query && { query }),
              ...(newGenresString && { genres: newGenresString }),
              page: "1", // Genre солигдоход эхний хуудас руу шилжүүлнэ
            }).toString()}`;

            return (
              <Link
                key={genre.id}
                href={url}
                className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                  isSelected
                    ? "bg-zinc-800 text-white border-zinc-800 dark:bg-white dark:text-zinc-800 dark:border-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-800"
                }`}
              >
                {genre.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Results Content */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">
          {query && genres
            ? `Results for "${query}" in selected genres`
            : query
              ? `Results for "${query}"`
              : "Discover Movies"}
        </h1>

        {finalMovies.length > 0 ? (
          <>
            <MovieSectionFull title="" movies={finalMovies} categoryPath="" />

            {/* Shadcn UI Pagination */}
            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        className={
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    <PaginationItem className="hidden sm:inline-block">
                      <PaginationLink
                        href={createPageURL(1)}
                        isActive={currentPage === 1}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>

                    {currentPage > 3 && <PaginationEllipsis />}

                    {Array.from({ length: 3 }, (_, i) => currentPage - 1 + i)
                      .filter((p) => p > 1 && p < totalPages)
                      .map((p) => (
                        <PaginationItem
                          key={p}
                          className="hidden sm:inline-block"
                        >
                          <PaginationLink
                            href={createPageURL(p)}
                            isActive={currentPage === p}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                    {currentPage < totalPages - 2 && <PaginationEllipsis />}

                    {totalPages > 1 && (
                      <PaginationItem className="hidden sm:inline-block">
                        <PaginationLink
                          href={createPageURL(totalPages)}
                          isActive={currentPage === totalPages}
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        className={
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <p className="text-lg opacity-50 font-medium">
              No movies found matching your criteria.
            </p>
            {query && genres && (
              <p className="text-sm opacity-40 mt-2">
                Try removing some genres to see more results for "{query}".
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

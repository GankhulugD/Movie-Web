import Link from "next/link";

interface CardProps {
  image: string;
  point: number;
  name: string;
  id: number; // Энийг id болгож зассан, учир нь key-г React өөрөө авдаг
}

export const Card = ({ image, point, name, id }: CardProps) => {
  return (
    <Link
      href={`/movie/${id}`}
      className="text-black hover:underline dark:text-white"
    >
      <div className="w-[157.5px] h-[309px] bg-[#F4F4F5] text-black dark:bg-[#27272A] dark:text-white flex flex-col gap-1 rounded-lg md:h-[439px] md:w-[229.73px] cursor-pointer overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={name}
          className="w-[157.5px] h-[223px] rounded-t-lg md:h-[340px] md:w-[229.73px] object-cover"
        />
        <div className="flex flex-col p-2 text-[14px] md:text-[18px] gap-0">
          <p>⭐{point}/10</p>
          <p className="line-clamp-2">{name}</p>
        </div>
      </div>
    </Link>
  );
};

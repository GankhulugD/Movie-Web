interface CardProps {
  image: string;
  point: number;
  name: string;
}
export const Card = ({ image, point, name }: CardProps) => {
  return (
    <div className="w-[157.5px] h-[309px] bg-[#F4F4F5] text-black flex-col gap-1 rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt="1" className="w-[157.5px] h-[223px] rounded-t-lg" />
      <div className="flex-col p-2 text-[14px] gap-0">
        <p>⭐{point}/10</p>
        <p>{name}</p>
      </div>
    </div>
  );
};

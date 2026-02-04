export const Header = () => {
  return (
    <div className="flex h-[59px] w-full items-center justify-between px-[20px]">
      <div className="flex gap-[8px] items-center text-[#4338CA] font-bold text-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="./Vector-movie.svg"
          alt="v"
          className="w-[16.67px] h-[16.67px]"
        />
        <p className="text-center">Movie Z</p>
      </div>
      <div className="flex gap-[12px] ">
        <div className="w-9 h-9 rounded-md border border-[#E4E4E7] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./vector-search.svg"
            alt="s"
            className="h-[12px] w-[12px]"
          />
        </div>
        <div className="w-9 h-9 rounded-md border border-[#E4E4E7] flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="./vector-night.svg" alt="s" className="h-[12px] w-[12px]" />
        </div>
      </div>
    </div>
  );
};

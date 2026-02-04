import Image from "next/image";

export const Hero = () => {
  return (
    <div>
      <div className="relative h-[246px] w-full md:h-[500px] lg:h-[600px]">
        <Image
          src={`/images/hero-m-${3}.png`}
          alt="zurag"
          fill
          className="w-full h-full object-cover "
        />

        <div className="p-5 text-white flex-col justify-start hidden md:block md:max-w-[440px] absolute bottom-[158px] left-[140px]">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[14px]">Now Playing:</p>
              <p className="text-[24px] font-semibold">Whiked</p>
            </div>
            <div className="flex items-baseline gap-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="images/star.png"
                alt="a"
                className="w-[23.3px] h-[22.2px]"
              />
              <p className="text-white font-semibold text-[18px]">6.9</p>
              <p className="text-[#71717A]">/10</p>
            </div>
          </div>
          <p>
            {
              "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. "
            }
          </p>
          <div className="flex justify-center bg-[#F4F4F5] h-[40px] w-[145px] rounded-lg items-center gap-2 mt-4 cursor-pointer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Vector-trailer-black.svg" alt="trailer" />
            <p className="text-[black] text-[14px] font-medium">
              Watch Trailer
            </p>
          </div>
        </div>
      </div>
      <div className="p-5 text-black flex-col justify-start">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[14px]">Now Playing:</p>
            <p className="text-[24px] font-semibold">Whiked</p>
          </div>
          <div className="flex items-baseline gap-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="images/star.png"
              alt="a"
              className="w-[23.3px] h-[22.2px]"
            />
            <p className="text-black font-semibold text-[18px]">6.9</p>
            <p className="text-[#71717A]">/10</p>
          </div>
        </div>
        <p>
          {
            "Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads. "
          }
        </p>
        <div className="flex justify-center bg-[#18181B] h-[40px] w-[145px] rounded-lg items-center gap-2 mt-4 cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/Vector-trailer.svg" alt="trailer" />
          <p className="text-[#FAFAFA] text-[14px] font-medium">
            Watch Trailer
          </p>
        </div>
      </div>
    </div>
  );
};

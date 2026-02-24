export const Footer = () => {
  return (
    <div className="h-[308px] w-full bg-zinc-800 text-white flex flex-col gap-[12px] p-[20px] pt-[20px] md:gap-6 md:pt-[40px] md:flex-row md:justify-between">
      <div className="flex-col pl-3 gap-[8px] items-center w-fit font-bold text-[16px] md:pl-[70px]">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Vector-movie-white.svg"
            alt="v"
            className="w-[16.67px] h-[16.67px]"
          />
          <p className="text-center">Movie Z</p>
        </div>
        <p className="py-3 pb-5">© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex flex-row pr-3 gap-6 w-fit md:pr-[70px] md:justify-between">
        <div className="flex flex-col gap-4 md:gap-6">
          <p className="pb-3">Contact Information</p>
          <div className="flex gap-3 pb-3 justify-start items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="max-w-4 max-h-4" src="/Vector-mail.svg" alt="m" />
            <div>
              <p>Email: </p>
              <p>support@movieZ.com</p>
            </div>
          </div>
          <div className="flex gap-3 pb-3 justify-start items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="max-w-4 max-h-4" src="/Vector-phone.svg" alt="m" />
            <div>
              <p>Phone: </p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-8 md:ml-20 md:gap-6 gap-4 md:gap-6">
          <p className="pb-3 ">Follow Us</p>
          <div className="flex flex-col gap-1 md:flex-row md:gap-4 ">
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.twitter.com/">Twitter</a>
            <a href="https://www.youtube.com/">Youtube</a>
          </div>
        </div>
      </div>
    </div>
  );
};

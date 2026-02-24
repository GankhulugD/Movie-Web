import Image from "next/image";

export const MovieDetail = () => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div>
          <p></p>
          <div className="flex">
            <p>
              {"release_date"} • PG • {"runtime"}m
            </p>
          </div>
        </div>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="" alt="" />
          <div className="flex flex-col">
            <p>{"point"}/10</p>
            <p>{"vote"}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <Image
          src={"poster_path"}
          alt={"a"}
          fill
          priority
          className="object-cover"
        />
        <Image
          src={"backdrop_path"}
          alt={"a"}
          fill
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

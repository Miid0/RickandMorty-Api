import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";

interface Episode {
  _id?: number;
  name?: string;
  air_date?: string;
  episode?: string;
}

export default function Episodes() {
  const [episodes, setEpisodes] = useState<Episode[]>();
  const [season, setSeason] = useState(1);

  useEffect(() => {
    const allSeasons: Episode[] = [];

    for (let i = 1; i <= 3; i++) {
      fetch(`https://rickandmortyapi.com/api/episode/?page=${i}`)
        .then((res) => res.json())
        .then((data) => {
          const ep = data.results.filter((elem: Episode) => {
            return elem.episode?.includes(`S0${season}`);
          });
          allSeasons.push(...ep);

          if (i === 3) setEpisodes(allSeasons);
        });
    }
  }, [season]);

  const nextSeason = () => {
    if (season === 5) return;
    setSeason(season + 1);
  };

  const prevSeason = () => {
    if (season === 1) return;
    setSeason(season - 1);
  };

  return (
    <div className="container max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] broder-black mx-auto my-5">
      <div className="flex flex-col justify-center items-center my-12">
        <div className="w-44 md:w-56 lg:w-64 xl:w-80">
          <Image
            alt="RM"
            width={400}
            height={400}
            src={
              "/images/30-Rick-And-Morty-Clipart-black-and-white-Free-Clip-Art-.png"
            }
          />
        </div>
        <div className="flex items-center gap-2 lg:gap-4">
          <button onClick={() => prevSeason()}>
            <IoMdArrowDropleft size={40} />
          </button>
          <h1 className="text-4xl lg:text-7xl font-bold">
            Season {`${season}`}
          </h1>
          <button onClick={() => nextSeason()}>
            <IoMdArrowDropright size={40} />
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
        {episodes &&
          episodes.map((episode) => (
            <li key={episode._id}>
              <div className="shadow-md border-[1px] text-center border-zinc-900 w-56 h-28 md:w-44 md:h-36 xl:h-40 2xl:w-56 2xl:h-52 flex items-center justify-center px-2 lg:px-4 group hover:bg-zinc-900 hover:text-gray-50 transition-all ease-in-out duration-200">
                <div>
                  <h1 className="font-bold text-sm lg:text-xl group-hover:hidden">
                    {episode.name}
                  </h1>
                  <h3 className="font-light text-xs lg:text-sm group-hover:hidden">
                    {episode.air_date}
                  </h3>
                  <h1 className="font-semibold text-lg lg:text-2xl hidden group-hover:block">
                    {episode.episode}
                  </h1>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
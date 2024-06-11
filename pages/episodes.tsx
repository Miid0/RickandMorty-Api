import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Episode, EpisodesProps, Props } from "../types/types";

export default function Episodes(props: EpisodesProps) {
  const [page, setPage] = useState<Episode>();
  const [season, setSeason] = useState(1);

  useEffect(() => {
    props.result.filter((ep) => {
      if (ep.episode.includes(`S0${season}`)) setPage(ep);
    });
  }, [page]);
  console.log(page, season);
  const nextSeason = () => {
    if (season === 5) return;
    setSeason(season + 1);
  };

  const prevSeason = () => {
    if (season === 1) return;
    setSeason(season - 1);
  };

  return (
    <>
      <Head>
        <title>RickAndMorty | Episodes</title>
        <link rel="icon" type="image/png" sizes="any" href="/images/icon.png" />
      </Head>
      <div className="container max-w-[90%] lg:max-w-[80%] xl:max-w-[70%] broder-black mx-auto my-5">
        <div className="flex flex-col justify-center items-center my-12">
          <div className="w-44 md:w-56 lg:w-64 xl:w-80 select-none">
            <Image
              alt="RM"
              width={400}
              height={400}
              src={"/images/218436_web-removebg-preview.png"}
              priority={true}
            />
          </div>
          <div className="flex gap-5 sm:gap-12 md:gap-16 text-lg sm:text-xl lg:text-2xl xl:text-3xl mt-5">
            <div className="hover:font-semibold border-hidden hover:border-b-2 lg:border-b-4 border-zinc-900">
              Season1
            </div>
            <div className="hover:font-semibold border-b-2 lg:border-b-4 hover:border-zinc-900">
              Season2
            </div>
            <div className="hover:font-semibold border-b-2 lg:border-b-4 hover:border-zinc-900">
              Season3
            </div>
            <div className="hover:font-semibold border-b-2 lg:border-b-4 hover:border-zinc-900">
              Season4
            </div>
            <div className="hover:font-semibold border-b-2 lg:border-b-4 hover:border-zinc-900">
              Season5
            </div>
          </div>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {props &&
            props.result.map((episode) => (
              <li key={episode.id}>
                <div className="shadow-md hover:shadow-lg border-[1px] text-center border-zinc-900 w-56 h-28 sm:w-48 md:w-44 md:h-40 xl:h-40 2xl:w-56 2xl:h-52 flex items-center justify-center p-4 lg:px-4 lg:py-6 group hover:bg-zinc-900 hover:text-gray-50 transition-all ease-in-out duration-200">
                  <div>
                    <h1 className="font-bold text-base md:text-lg lg:text-xl 2xl:text-2xl group-hover:hidden">
                      {episode.name}
                    </h1>
                    <h3 className="font-light text-xs md:text-sm 2xl:text-lg group-hover:hidden">
                      {episode.air_date}
                    </h3>
                    <h1 className="font-semibold text-2xl lg:text-3xl 2xl:text-4xl hidden group-hover:block">
                      {episode.episode?.slice(3)}
                    </h1>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  let res = await fetch(`https://rickandmortyapi.com/api/episode/`);
  let data: { results: Episode[] } = await res.json();
  let result = data.results.filter((ep) => {
    return ep.episode.includes("S01");
  });
  return {
    props: {
      result,
    },
  };
};

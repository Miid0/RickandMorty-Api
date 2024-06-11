import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import CharacterNotFound from "../../components/CharacterNotFound";
import PaginationButtons from "../../components/PaginationButtons";
import { Character, Props } from "../../types/types";
import { getPages, myLoader } from "../../utils/utils";

export default function HomePage(props: Props) {
  const [page, setPage] = useState<Character[]>(props.result.slice(0, 20));
  const [notFound, setNotFound] = useState(false);
  const [onSearch, setonSearch] = useState(false);
  const Allpages: Character[][] = [];
  const router = useRouter();

  const submitHandler = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (page.length === 0) setNotFound(true);
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === undefined || e.target.value === "") {
      setonSearch(false);
      setNotFound(false);
      setPage(props.result.slice(0, 20));
    } else {
      const char = props.result.filter((character) => {
        setonSearch(true);
        return character.name?.toLowerCase().match(e.target.value.trim());
      });
      setPage(char);
    }
  };

  getPages(props, Allpages);

  return (
    <>
      <Head>
        <title>RickAndMorty | Characters</title>
        <link rel="icon" type="image/png" sizes="any" href="/images/icon.png" />
      </Head>
      <div className="container max-w-[90%] xl:max-w-[70%] mx-auto flex flex-col items-center my-5 gap-3 md:gap-5">
        <form className="lg:w-[60%] w-[100%] relative" onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="looking for a caracter ?"
            className="w-full h-10 lg:h-12 px-3 lg:px-5 outline-none bg-gray-200"
            onChange={changeHandler}
          />
          <button type="submit">
            <BiSearchAlt className="absolute right-2 top-2 lg:top-3 w-6 h-6" />
          </button>
        </form>
        {!onSearch && (
          <PaginationButtons Allpages={Allpages} setPage={setPage} />
        )}
        {notFound ? (
          <CharacterNotFound />
        ) : (
          <div className="xl:max-w-[80%] flex">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {props &&
                page.map((character, index) => (
                  <li
                    className="relative text-base lg:text-lg font-semibold border-[1px] border-zinc-900 p-2 xl:p-3 shadow-md hover:shadow-lg hover:cursor-pointer transition-all duration-200"
                    key={index}
                    onClick={() => {
                      router.push(`${router.pathname}/${character.id}`);
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="select-none" key={character.id}>
                        <Image
                          loader={() => myLoader({ src: character.image })}
                          src={character.image}
                          alt={character.name}
                          width={400}
                          height={400}
                          layout="intrinsic"
                          priority={true}
                        />
                      </div>
                      <div className="my-2">
                        <h1>{character.name}</h1>
                        <h3 className="font-light text-sm">
                          {character.location?.name}
                        </h3>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  let result = [];
  for (let page = 1; page <= 11; page++) {
    const data = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    )
      .then((res) => res.json())
      .then((data) => data.results);
    result.push(...data);
  }
  return {
    props: {
      result,
    },
  };
};

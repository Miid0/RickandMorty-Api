import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useCharacters } from "../../context/characterContext";
import { Character } from "../../types/types";
import { myLoader } from "../../utils/utils";
import { BsGenderFemale, BsGenderMale } from "react-icons/bs";
import Head from "next/head";
import { IoClose } from "react-icons/io5";
import { GetServerSideProps, GetStaticProps } from "next";

function Character(result: { result: Character }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>RickAndMorty | {result.result.name}</title>
        <link rel="icon" type="image/png" sizes="any" href="/images/icon.png" />
      </Head>
      <div className="flex container min-h-screen justify-center items-center mx-auto">
        <div className="flex flex-col md:flex-row-reverse  border-[1px] border-zinc-900 p-2 shadow-lg gap-2">
          <div className="select-none">
            <Image
              src={result.result.image}
              width={400}
              height={400}
              alt={result.result.name}
              loader={() => myLoader({ src: result.result.image })}
              layout="intrinsic"
              priority={true}
            />
          </div>
          <div className="flex md:flex-col md:items-start md:gap-4 p-1 md:mr-20 justify-between items-center relative">
            <button
              className="hidden md:block"
              onClick={() => router.push("/characters")}
            >
              <IoClose size={30} />
            </button>
            <div className="">
              <h1 className="text-2xl md:text-4xl font-bold">
                {result.result.name}
              </h1>
              <h2 className="font-light md:text-lg">
                -{result.result.location?.name}
              </h2>
              <h1 className="text-lg md:text-xl">-{result.result.species}</h1>
              <h2 className="text-lg md:text-xl">
                {result.result.origin?.name !== "unknown" &&
                  result.result.origin?.name}
              </h2>
            </div>
            {result.result.gender?.toLowerCase() === "male" ? (
              <BsGenderMale size={30} />
            ) : (
              <BsGenderFemale size={30} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data = await res.json();
  const paths = data.results.map((character: Character) => ({
    params: {
      id: character.id.toString(),
    },
  }));
  console.log("paths", paths);
  return { paths, fallback: false };
};

export const getStaticProps: GetServerSideProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const result = await res.json();

  return {
    props: {
      result,
    },
  };
};

export default Character;

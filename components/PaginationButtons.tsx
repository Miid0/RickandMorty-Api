import React, { SetStateAction, useState } from "react";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import { Character } from "../types/types";

export default function PaginationButtons({
  Allpages,
  setPage,
}: {
  Allpages: Character[][];
  setPage: React.Dispatch<SetStateAction<Character[]>>;
}) {
  const [paginate, setPaginate] = useState(0);

  const onNext = () => {
    if (paginate + 1 === Allpages.length) return;
    setPage(Allpages[paginate + 1]);
    setPaginate(paginate + 1);
  };

  const onPrevious = () => {
    if (paginate === 0) return;
    setPage(Allpages[paginate - 1]);
    setPaginate(paginate - 1);
  };
  return (
    <div className="flex justify-between w-[100%] xl:w-[80%] 2xl:w-[60%] items-center">
      <button
        className="flex items-center lg:text-lg 2xl:text-xl font-semibold disabled:cursor-not-allowed disabled:opacity-25"
        onClick={onPrevious}
        disabled={paginate === 0 ? true : false}
      >
        <IoMdArrowDropleft size={25} />
        Prev
      </button>
      <button
        className="flex items-center lg:text-lg 2xl:text-xl font-semibold disabled:cursor-not-allowed disabled:opacity-25"
        onClick={onNext}
        disabled={paginate + 1 === Allpages.length ? true : false}
      >
        Next
        <IoMdArrowDropright size={25} />
      </button>
    </div>
  );
}

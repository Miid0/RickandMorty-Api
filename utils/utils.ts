import { Character, Props } from "../types/types";

export const myLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export const getPages = (props: Props, Allpages: Character[][]) => {
  for (let i = 0; i < props.result.length; i += 20) {
    let arr = props.result.slice(i, i + 20);

    Allpages.push(arr);
  }
};

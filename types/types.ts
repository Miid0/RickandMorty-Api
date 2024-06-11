export interface Character {
  id: number;
  name: string;
  status?: string;
  gender?: string;
  species?: string;
  image: string;
  location?: {
    name?: string;
  };
  origin?: {
    name?: string;
  };
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

export type Props = {
  result: Character[];
};

export type EpisodesProps = {
  result: Episode[];
};

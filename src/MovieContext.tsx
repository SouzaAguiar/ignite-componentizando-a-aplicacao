import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GenreResponseProps, MovieProps } from "./AppTypes";
import { api } from "./services/api";

type MovieContextData = {
  selectedGenderId: number;
  setSelectedGenderId: (id: number) => void;
  genders: GenreResponseProps[];
  movies: MovieProps[];
  selectedGender: GenreResponseProps;
};
export const MovieContext = createContext({} as MovieContextData);

interface MovieProviderProps {
  children: ReactNode;
}
export function MovieProvider({ children }: MovieProviderProps) {
  const [selectedGenderId, setSelectedGenderId] = useState(1);
  const [genders, setgenders] = useState<GenreResponseProps[]>([]);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGender, setSelectedGender] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setgenders(response.data);
    });
  }, []);

  useEffect(() => {
    api
      .get<MovieProps[]>(`movies/?Genre_id=${selectedGenderId}`)
      .then((response) => {
        setMovies(response.data);
      });

    api
      .get<GenreResponseProps>(`genres/${selectedGenderId}`)
      .then((response) => {
        setSelectedGender(response.data);
      });
  }, [selectedGenderId]);

  return (
    <MovieContext.Provider
      value={{
        selectedGenderId,
        setSelectedGenderId,
        genders,
        movies,
        selectedGender,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => {
  return useContext(MovieContext);
};

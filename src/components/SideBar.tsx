import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";
import "../styles/sidebar.scss";
import { GenreResponseProps } from "../AppTypes";

interface SideBarProps {
  onGenreIdChange: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar(prop: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(prop.selectedGenreId);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    prop.onGenreIdChange(id);
  }

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

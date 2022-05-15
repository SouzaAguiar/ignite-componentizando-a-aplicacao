import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import "./styles/global.scss";
import { useEffect, useState } from "react";

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectedGenreId={selectedGenreId}
        onGenreIdChange={setSelectedGenreId}
      />
      <Content selectedGenreId={selectedGenreId} />
    </div>
  );
}

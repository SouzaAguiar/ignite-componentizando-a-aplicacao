import { MovieCard } from "./MovieCard";
import "../styles/content.scss";
import { useMovies } from "../MovieContext";

export function Content() {
  const { selectedGender, movies } = useMovies();

  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGender.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

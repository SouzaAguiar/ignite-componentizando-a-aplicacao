import { Button } from "./Button";
import "../styles/sidebar.scss";
import { useMovies } from "../MovieContext";

export const SideBar = () => {
  const { genders, setSelectedGenderId, selectedGenderId } = useMovies();

  function handleClickButton(id: number) {
    setSelectedGenderId(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genders.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenderId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
};

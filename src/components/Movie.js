import propTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./style/Movie.module.css";

function Movie({ id, coverImg, mobileImg, title, year, rating, genres }) {
  return (
    <div className={styles.component}>
      <Link to={`/movie/${id}`}>
        <div>
          <img className={styles.img} src={coverImg} alt={title} />
        </div>
        <div className={styles.description}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.score}>
            {year} | ⭐️ {rating} / 10
          </p>
          <ul className={styles.ulTag}>
            {genres.map((g) => (
              <li className={styles.genres} key={g}>
                {g}
              </li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}

Movie.propTypes = {
  id: propTypes.number.isRequired,
  coverImg: propTypes.string.isRequired,
  mobileImg: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  year: propTypes.number.isRequired,
  rating: propTypes.number.isRequired,
  summary: propTypes.string.isRequired,
  genres: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Movie;

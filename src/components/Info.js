import propTypes from "prop-types";
import styles from "./style/Info.module.css";

function Info({
  id,
  title,
  year,
  rating,
  like,
  coverImg,
  bgImage,
  description,
  trailerCode,
}) {
  const tarilerUrl = "https://www.youtube.com/embed/" + trailerCode;
  console.log(trailerCode);
  console.log(tarilerUrl);
  return (
    <div className={styles.component} id="infoContainer">
      <div id={styles.trailerDiv}>
        <iframe
          id={styles.trailerFrame}
          src={tarilerUrl}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen></iframe>
      </div>
      <div id={styles.infoDiv}>
        <h2 id={styles.title}>{title}</h2>
        <p className={styles.score}>
          {year} | ⭐️ {rating} / 10
        </p>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
}

Info.propTypes = {
  id: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  bgImage: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  trailerCode: propTypes.string.isRequired,
  year: propTypes.number.isRequired,
  rating: propTypes.number.isRequired,
  like: propTypes.number.isRequired,
};

export default Info;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Info from "../components/Info";
import styles from "../components/style/Home.module.css";

function Detail() {
  document.querySelector("#root").parentElement.style.margin = "0px";

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
    console.log(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div id={styles.container}>
      {loading ? (
        <h1 id={styles.loading}>Loading...</h1>
      ) : (
        <Info
          id={id}
          title={movie.title}
          year={movie.year}
          rating={movie.rating}
          like={movie.like_count}
          bgImage={movie.background_image_original}
          description={movie.description_full}
          coverImg={movie.large_cover_image}
          trailerCode={movie.yt_trailer_code}
        />
      )}
    </div>
  );
}

export default Detail;

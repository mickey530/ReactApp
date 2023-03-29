import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import Option from "../components/Option";
import styles from "../components/style/Home.module.css";

function Home() {
  document.querySelector("#root").parentElement.style.margin = "8px";

  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [searchMode, setSearchMode] = useState(false);
  const [keyword, setKeyword] = useState("");

  // 옵션모달 파라미터
  const [optionModal, setoptionModal] = useState(false); // 모달 오픈 여부
  const [genreOption, setGenreOption] = useState("");
  const [ratingOption, setRatingOption] = useState(0);
  const [sortOption, setSortOption] = useState("");
  const [orderOption, setOrderOption] = useState("");
  const [page, setPage] = useState(1); // 페이징 처리 위한 state 선언

  const getMovies = async (isSearchMode) => {
    setSearchMode(isSearchMode);
    const defaultUrl = `https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`;
    const paramUrl = createParamUrl();
    const json = await (
      await fetch(isSearchMode ? paramUrl : defaultUrl)
    ).json();
    console.log(paramUrl);
    console.log(json.data.movies);
    setMovies(json.data.movies);
    setLoading(false);
  };
  console.log(movies);

  const createParamUrl = () => {
    let url = `https://yts.mx/api/v2/list_movies.json?`;
    url = keyword ? url + `&query_term=${keyword}` : url;
    url = genreOption ? url + `&genre=${genreOption}` : url;
    url = ratingOption ? url + `&minimum_rating=${ratingOption}` : url;
    url = sortOption ? url + `&sort_by=${sortOption}` : url;
    url = orderOption ? url + `&order_by=${orderOption}` : url;
    return url;
  };

  const changeKeyword = (event) => {
    setKeyword(event.target.value);
    // console.log(keyword);
  };
  const search = (event) => {
    if (event.keyCode === 13) {
      setLoading(true);
      getMovies(true);
    }
  };

  const optionOpen = () => {
    setoptionModal(true);
  };

  const optionClose = () => {
    setoptionModal(false);
  };

  useEffect(() => {
    document.querySelector("#optionDiv").style.display = optionModal
      ? "block"
      : "none";
  }, [optionModal]);

  useEffect(() => {
    // 최초 페이지 로딩 시 영화 조회
    getMovies();
  }, []);

  return (
    <div>
      <input
        id={styles.search}
        type="text"
        value={keyword}
        onChange={changeKeyword}
        onKeyUp={search}
        placeholder="Search for movies"
        autocomplete="off"
      />
      <div id={styles.optionBtnDiv}>
        <div className={styles.selectedOptionDiv}>
          <div className={styles.optionTag}>{genreOption}</div>
          <div className={styles.optionTag}>
            {ratingOption != 0 ? `${ratingOption} / 10` : null}
          </div>
          <div className={styles.optionTag}>{sortOption}</div>
          <div className={styles.optionTag}>{orderOption}</div>
        </div>
        <button id={styles.optionBtn} onClick={optionOpen}>
          {optionModal ? "- Options" : "+ Options"}
        </button>
      </div>
      <div id="optionDiv" className={styles.optionDiv}>
        <Option
          isOpen={optionModal}
          setGenreOption={setGenreOption}
          setRatingOption={setRatingOption}
          setSortOption={setSortOption}
          setOrderOption={setOrderOption}
          setSearchMode={setSearchMode}
          optionClose={optionClose}
        />
      </div>
      {loading ? (
        <h1 id={styles.loading}>Loading...</h1>
      ) : (
        <div>
          {movies !== undefined ? (
            <div
              id={styles.movieBox}
              className={searchMode ? styles.searchMode : null}>
              {movies.map((movie) => (
                <Movie
                  key={movie.id}
                  id={movie.id}
                  coverImg={movie.medium_cover_image}
                  mobileImg={movie.small_cover_image}
                  title={movie.title}
                  year={movie.year}
                  rating={movie.rating}
                  summary={movie.summary}
                  genres={movie.genres}
                />
              ))}
            </div>
          ) : (
            <div className={styles.nodata}>
              <h1>No data</h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

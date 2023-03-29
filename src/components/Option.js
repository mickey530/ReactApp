import React, { useState } from "react";
import styles from "../components/style/Option.module.css";

function Option({
  isOpen,
  setGenreOption,
  setRatingOption,
  setSortOption,
  setOrderOption,
  setSearchMode,
  optionClose,
}) {
  const genres = [
    "none",
    "comedy",
    "sci-fi",
    "horror",
    "romance",
    "action",
    "thriller",
    "drama",
    "mystery",
    "crime",
    "animation",
    "adventure",
    "fantasy",
    "comedy-romance",
    "action-comedy",
    "superhero",
  ];
  const sortOptions = ["none", "title", "year", "rating", "like_count"];
  const orderOptions = ["none", "asc", "desc"];
  const [rating, setRating] = useState(0);

  const changeRating = (event) => {
    setRating(event.target.value);
    console.log(rating);
  };

  const optionApply = () => {
    let genre = document.querySelector("#genreOption").value;
    let rating = document.querySelector("#ratingOption").value;
    let sort = document.querySelector("#sortOption").value;
    let order = document.querySelector("#orderOption").value;
    if (genre !== "none") setGenreOption(genre);
    if (rating !== "0") setRatingOption(rating);
    if (sort !== "none") setSortOption(sort);
    if (order !== "none") setOrderOption(order);
    if (
      genre !== "none" ||
      rating !== "0" ||
      sort !== "none" ||
      order !== "none"
    ) {
      //   setSearchMode(true); // 여기서 안해도 됨
      optionClose();
    } else {
      alert("옵션을 선택해주세요.");
    }
  };

  const optionReset = () => {
    let genre = (document.querySelector("#genreOption").value = "none");
    let rating = (document.querySelector("#ratingOption").value = "0");
    let sort = (document.querySelector("#sortOption").value = "none");
    let order = (document.querySelector("#orderOption").value = "none");
    setRating(0);
    setGenreOption("");
    setRatingOption("0");
    setSortOption("");
    setOrderOption("");
  };

  return (
    <div id={styles.optionDiv}>
      <div id={styles.optionHeader}>
        <div>Options</div>
        <button id={styles.closeBtn} onClick={optionClose}>
          𝗫
        </button>
      </div>
      <hr />
      <div id="options">
        <div className={styles.option}>
          <div>Genre</div>
          <select id="genreOption" className={styles.selectBox}>
            {genres.map((g) => (
              <option label={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <div>Sort By</div>
          <select id="sortOption" className={styles.selectBox}>
            {sortOptions.map((s) => (
              <option label={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <div>Order By</div>
          <select id="orderOption" className={styles.selectBox}>
            {orderOptions.map((o) => (
              <option label={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.option}>
          <div>Ratings</div>
          <div className={styles.ratingDiv}>{rating} / 10</div>
          <input
            id="ratingOption"
            type="range"
            min="0"
            max="9"
            step="0.1"
            value={rating}
            onChange={changeRating}
          />
        </div>
      </div>
      <div className={styles.optionBtnDiv}>
        <button className={styles.applyBtn} onClick={optionReset}>
          Reset
        </button>
        <button className={styles.applyBtn} onClick={optionApply}>
          Apply
        </button>
      </div>
    </div>
  );
}

export default Option;

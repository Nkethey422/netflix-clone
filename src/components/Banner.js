import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import axios from "../axios";
import requests from "../requests.js";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  // Need useEffect to change the Netflix Banner to a new movie everytime the page is reloaded.
  useEffect(() => {
    // use asynchronous functions anytime you make a call to an external API. async function used anytime it takes a moment to communicate.
    async function fetchData() {
      // **** Not typically used within a useEffect, needs an internal function in order to work properly
      const request = await axios.get(requests.fetchNetflixOriginals);
      //  setMovie to a random movie pulled from our JSON Object.
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      // must return request before calling fetchData() function.
      return request;
    }
    // must call function within useEffect to work.
    fetchData();
  }, []);

  console.log(movie);

  // For banner__description, takes arguments string and number and truncates with an elipses.
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        {/* TMDB API IS NOT CONSISTENT WITH INFORMATION, TO ACCOUNT FOR THIS WE USE OPTIONAL CHAINING (?.) AND LOGICAL OR (||)  */}
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        {/* function created above to truncate description @150 characters. */}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      {/* BEM naming convention states (--) as a Modifier */}
      {/* Allows for styling, a nice transition into the body of the website. */}
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;

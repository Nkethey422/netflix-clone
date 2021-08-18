import React, { useState, useEffect } from "react";

import "./Row.css";
import YouTube from "react-youtube";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  // used to get images
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await fetch(fetchUrl);
      const body = await request.json();
      setMovies(body.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  // useEffect(() => {
  //   // use asynchronous functions anytime you make a call to an external API. async function used anytime it takes a moment to communicate.

  //   // **** Not typically used within a useEffect, needs an internal function in order to work properly

  //   async function fetchData() {
  //     // await ensures proper communication with API.
  //     const request = await axios.get(fetchUrl);
  //     setMovies(request.data.results);
  //     // must return request before calling function.
  //     console.log(request.data.results);
  //     return request;
  //   }
  //   // function must be called in order to be used within the useEffect.
  //   fetchData();
  // }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      let request = await fetch(`/movie/${movie.id}/videos?`);
      const body = await request.json();
      setTrailerUrl(body.data[0]?.key);
    }
  };
  console.log(movies);

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClick(movie)}
            key={movie.id}
            // Added classname, default to row__poster unless isLargeRow returns true, then classname will become row__posterLarge for css purposes.
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            // Netflix note: Netflix Originals use full movie posters for thumbnails and scene backdrops for everything else.

            // if isLargeRow use the poster provided from the API, otherwise use backdrop.
            src={`${baseUrl}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;

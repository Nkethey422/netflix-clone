import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import YouTube from "react-youtube";

// *** isLargeRow ***
// destructure for isLargeRow.
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // use asynchronous functions anytime you make a call to an external API. async function used anytime it takes a moment to communicate.

    // **** Not typically used within a useEffect, needs an internal function in order to work properly

    async function fetchData() {
      // await ensures proper communication with API.
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      // must return request before calling function.
      return request;
    }
    // function must be called in order to be used within the useEffect.
    fetchData();
  }, [fetchUrl]);

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
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=4ec4b0d1e8dc8fc71ee4f5122df3e6c8`
      );
      setTrailerUrl(trailerurl.data.results[0]?.key);
    }
  };

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

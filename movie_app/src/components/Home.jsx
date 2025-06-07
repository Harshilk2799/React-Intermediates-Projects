import { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router";

function Home() {
  const [movies, setMovies] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("movie");
  const [isDataAvailable, setIsDataAvailable] = useState(true);
  const [loading, setLoading] = useState(false);

  async function getMovieData() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=2d98375c&s=${search}`
      );
      console.log("Data: ", response);

      if (response?.data?.Response === "True") {
        setMovies(response?.data?.Search);
        setIsDataAvailable(true);
      } else {
        setIsDataAvailable(false);
        setMovies([]);
      }
    } catch (error) {
      console.log("Error:L ", error);
      setIsDataAvailable(false);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovieData();
  }, [search]);

  function handleSearch() {
    if (inputValue.trim()) {
      setSearch(inputValue.trim());
    }
  }

  // Handle Enter key press for search
  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }
  return (
    <>
      <div className="movie-app">
        {/* Hero Section with Background */}
        <div className="hero-section">
          <div className="hero-overlay">
            <div className="container">
              <div className="row justify-content-center text-center">
                <div className="col-lg-10">
                  <h1 className="hero-title">Discover Amazing Movies</h1>
                  <p className="hero-subtitle">
                    Stream thousands of movies and TV shows from every genre
                  </p>

                  {/* Search Bar */}
                  <div className="search-container">
                    <div className="search-wrapper">
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search movies, TV shows, actors..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={handleKeyPress}
                      />
                      <button className="search-btn" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Poster, Title, Type, Year, imdbID */}
        {/* Featured Movies Section */}
        <div className="movies-section">
          <div className="container">
            <h2 className="section-title">
              {search === "movie"
                ? "Popular Movies"
                : `Results for "${search}"`}
            </h2>
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <div className="movies-grid">
                {isDataAvailable && movies?.length > 0 ? (
                  movies?.map((movie) => (
                    <div key={movie?.imdbID} className="movie-card">
                      <NavLink
                        className="text-decoration-none text-white"
                        to={`/movie/${movie?.imdbID}`}
                      >
                        <div className="movie-poster">
                          <img src={movie?.Poster} alt={movie.Title} />
                        </div>
                        <div className="movie-info">
                          <h3>Movie Title {movie.Title}</h3>
                          <p>
                            {movie?.Year} • {movie?.Type}
                          </p>
                        </div>
                      </NavLink>
                    </div>
                  ))
                ) : (
                  <div className="no-results">
                    <h2>No Movies Found!</h2>
                    <p>Try searching with different keywords</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

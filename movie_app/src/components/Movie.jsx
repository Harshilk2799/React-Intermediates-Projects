import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "../App.css";

function Movie() {
  const [singleMovie, setSingleMovie] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getSingleMovie() {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://www.omdbapi.com/?apikey=2d98375c&i=${id}`
      );
      console.log(response.data);
      if (response?.data?.Response == "True") {
        setSingleMovie(response.data);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching movie:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSingleMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !singleMovie) {
    return (
      <div className="movie-error">
        <h2>Movie Not Found</h2>
        <p>Sorry, we couldn't find the movie you're looking for.</p>
        <button onClick={() => navigate("/")} className="back-btn">
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="movie-detail-page">
        {/* Hero Section with Movie Backdrop */}
        <div
          className="movie-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${singleMovie?.Poster})`,
          }}
        >
          <div className="container">
            <button onClick={() => navigate(-1)} className="back-button">
              ← Back
            </button>

            <div className="movie-hero-content">
              <div className="movie-poster-container">
                <img
                  src={
                    singleMovie?.Poster !== "N/A"
                      ? singleMovie?.Poster
                      : "/api/placeholder/400/600"
                  }
                  alt={singleMovie?.Title}
                  className="movie-poster-large"
                />
              </div>

              <div className="movie-main-info">
                <h1 className="movie-title">{singleMovie?.Title}</h1>

                <div className="movie-meta">
                  <span className="year">{singleMovie?.Year}</span>
                  <span className="runtime">{singleMovie?.Runtime}</span>
                  <span className="rating">{singleMovie?.Rated}</span>
                </div>

                <div className="movie-ratings">
                  <div className="rating-item">
                    <span className="rating-label">IMDb</span>
                    <span className="rating-value">
                      ⭐ {singleMovie?.imdbRating}/10
                    </span>
                  </div>
                  <div className="rating-votes">
                    {singleMovie?.imdbVotes} votes
                  </div>
                </div>

                <p className="movie-plot">{singleMovie?.Plot}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Details Section */}
        <div className="movie-details-section">
          <div className="container">
            <div className="details-grid">
              <div className="details-column">
                <h3>Movie Information</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <span className="label">Director</span>
                    <span className="value">{singleMovie?.Director}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Writer</span>
                    <span className="value">{singleMovie?.Writer}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Actors</span>
                    <span className="value">{singleMovie?.Actors}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Released</span>
                    <span className="value">{singleMovie?.Released}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Language</span>
                    <span className="value">{singleMovie?.Language}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Country</span>
                    <span className="value">{singleMovie?.Country}</span>
                  </div>
                </div>
              </div>

              <div className="details-column">
                <h3>Box Office & Awards</h3>
                <div className="detail-items">
                  <div className="detail-item">
                    <span className="label">Box Office</span>
                    <span className="value">
                      {singleMovie?.BoxOffice || "N/A"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Awards</span>
                    <span className="value">{singleMovie?.Awards}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Production</span>
                    <span className="value">
                      {singleMovie?.Production || "N/A"}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Type</span>
                    <span className="value">{singleMovie?.Type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { movieUrl, key } from "../utils/movieService";
import { Fade } from "react-reveal";
import { ClipLoader } from "react-spinners";
import StarRatingComponent from "react-star-rating-component";

const Dashboard = props => {
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState({});
  const [genres, setGenres] = useState([]);
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const queryString = `${movieUrl}${props.match.params.id}?api_key=${key}`;

  const videoUrl = `${movieUrl}${props.match.params.id}/videos?api_key=${key}`;

    axios
      .get(queryString)
      .then(res => {
        setLoading(false)
        setMovie(res.data)
      })
      .catch(err => console.log("Error message", err));

      axios
      .get(videoUrl)
      .then(res => {
        console.log(res)
        setTrailer(res.data.results[0])
      })
      .catch(err => console.log("Error message", err));
  }, [movie.id, props.match.params.id]);


  const handleHomeBtn = (props) => {
    props.history.push("/");
  };


  const bgImg = {
    backgroundImage: `url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`
  };

  return (
   <>
   {loading ? (
    <section className="dashboard">
          <div className="flex-center">
            <div className="sweet-loading">
              <ClipLoader
                sizeUnit={"px"}
                size={50}
                color={"#faca31"}
                loading={loading}
              />
            </div>
          </div>
        </section>
   ): (
    <React.Fragment>
        <div style={bgImg} className="dashboard-bg" />
        <div className="dashboard-bg__layer" />
        <Fade>
          <React.Fragment>
            <section className="dashboard">
              <div className="dashboard__header-bar">
                    <a
                      onClick={() => handleHomeBtn(props)}
                      className="dashboard__btn dashboard__btn--home"
                    >
                      <div className="dashboard__icon">
                        <i
                          className="fa fa-long-arrow-left"
                        />
                        <i className="fa fa-home" />
                      </div>
                    </a>
                <h1 className="dashboard__title">{movie.title}</h1>
                <div className="dashboard__rating">
                  <StarRatingComponent
                    name="rate"
                    value={movie.vote_average > 9 ? 10 : movie.vote_average / 2}
                    starColor={"#faca31"}
                    emptyStarColor={"#242126"}
                  />
                </div>
              </div>
              <div>
              <iframe className="dashboard__video" src={`https://www.youtube.com/embed/${trailer.key}`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                <div className="dashboard__img--layer" />
                {!movie.tagline ? (
                  ""
                ) : (
                  <h3 className="dashboard__tagline">{`"${movie.tagline}"`}</h3>
                )}
              </div>
              <div className="dashboard__body">
                <div className="dashboard__group">
                  <div>
                    {genres.map(m => (
                      <span key={m.id}>{m.name} / </span>
                    ))}
                    <span>Release Date: </span>
                    <span>{movie.release_date} / </span>
                    <span>Runtime: </span>
                    <span>{!movie.runtime ? "" : `${movie.runtime}min`}</span>
                  </div>
                </div>
                <p className="dashboard__overview">{movie.overview}</p>
              </div>
            </section>
          </React.Fragment>
        </Fade>
      </React.Fragment>
   )}
   </>
        
  );
};

export default Dashboard;

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

  // useEffect(() => {
  //   const queryString = `${movieUrl}${props.match.params.id}?api_key=${key}`;

  //   axios.get(queryString).then((data) =>);
  // });

  return (
    <div>
      <h1>Hello World</h1>
    </div>
  )
};

export default Dashboard;

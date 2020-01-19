import React, {useState, useEffect} from "react";
import axios from "axios";
import { Route, Switch} from "react-router-dom";
import { moviesData, queries, getData } from "./utils/movieService";
import { getGenres } from "./utils/genreService";
import Movies from "./components/Movies"

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState("Popularity");
  const [loading, setLoading] = useState(true);
  const [bounce, setBounce] = useState(true);
  const [fetchResult, setFetchResult] = useState(["popular_movies",queries.popular])


  useEffect(() => {
    const fetchData = async ([sortMovies, query]) => {
      //Helper function helps to retrieve 10 pages from The Movie DB API.
      getData(sortMovies, query);
  
      const data = await Promise.all(
        //I'm mapping over moviesData to fecth multiple times, because each page contain 20 items.
        moviesData[sortMovies].map(async movie => await axios.get(movie))
      );
      
      //I'm using the Concat and Apply methods to flatten nested data array.
      let movies = [].concat.apply([], data.map(movie => movie.data.results));
      // To prevent decreasing performace, I'm checking the length of movies to see if is greathan 200 and slice it to 200.
      if (movies.length > 200) {
        movies = movies.slice(0, 200);
      }

      setMovies(movies);
    }
   fetchData(fetchResult)
  },[fetchResult]);

    
  useEffect(() => {
    //I added another tittle name to combined all the genres together.
    let allGenres = [{ id: "", name: "All genres" }, ...getGenres()];
    setGenres(allGenres)
  }, []);

    


  const handlePageChange = page => {
    //I'm setting the current page to a number. 
    setCurrentPage(page)
  };

  const handleGenreSelect = genre => {
    //Helper function to set the genre selected, page number to 1, and stopped the loading event.
    setSelectedGenre(genre)
    setCurrentPage(1);
    setSearchQuery("")
    handleLoader(genre);
  };


  const handleGenres = movie => {
    //I'm using the getGenres function(iterates over each genres) then I'm mapping over to check if the ids are the same to return items.
    return getGenres().map(m => (m.id === movie.genre_ids[0] ? m.name : null));
  };

  const handleSortValue = value => {
    //I'm using this helper function to sort movies base on three different catergory.
    //The initial values is Popular movies then based on the value selected I'm changin the query.
    let sortMovies = "popular_movies";
    let query = queries.popular;
    
    if (value === "Top Rated") {
      sortMovies = "top_movies";
      query = queries.top_rated;
    } else if (value === "Now Playing") {
      sortMovies = "theaters_movies";
      query = queries.theaters;
    }
    
    setSortValue(value);
    setCurrentPage(1);
    setFetchResult([sortMovies, query]);
  };

  const handleLoader = item => {
    //Handles the loading, it checks if the item equal to the genre selected to stopped the animation.
    if (item === selectedGenre) {
      setLoading(false);
      setBounce(false);
    } else {
      setLoading(true);
      setBounce(true);
    }
    setTimeout(() => setLoading(false), 1000);
  };

  const handleSearch = query => {
    // I'm setting the selectedGenre to null, in case if the user has selected category from the sidebar. Also, I'm resetting the current page to 1.
     setSelectedGenre(null)
     setCurrentPage(1);
     setSearchQuery(query)
   };

//Seach logic
//First of all,  I'm assinging the filtered variable to allmovies then I'm checking if the user has input a value inside the search bar. If it's true, I'm filtering the items that includes the values on the searchquery.
  const allMovies = movies;
  let filtered = allMovies;

  if (searchQuery) {
    filtered = allMovies.filter(m =>
      m.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  } else if (selectedGenre && selectedGenre.id) {
    filtered = allMovies.filter(m => m.genre_ids[0] === selectedGenre.id);
  }

  // Ending of the seach logic 


  return (
    <React.Fragment>
      <Switch>
      <Route
                path="/"
                exact
                render={props => (
                  <Movies
                    filtered={filtered}
                    movies={movies}
                    genres={genres}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                    sortValue={sortValue}
                    selectedGenre={selectedGenre}
                    loading={loading}
                    bounce={bounce}
                    onPageChange={handlePageChange}
                    onGenreSelect={handleGenreSelect}
                    onSearch={handleSearch}
                    onGenres={handleGenres}
                    onSortValue={handleSortValue}
                    {...props}
                  />
                )}
              />
      </Switch>
    </React.Fragment>
  );
}

export default App;

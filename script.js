function searchMovie() {
  const searchQuery = document.querySelector(".searchInput").value;
  const movieDatabaseAPI = "https://api.themoviedb.org/3/search/movie";
  const apiKey = "557c35bbbe97da53f3bdfa06f11ff7de";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  fetch(
    `${movieDatabaseAPI}?query=${encodeURIComponent(
      searchQuery
    )}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      displayMovies(data.results);
    })
    .catch((error) => console.error("Error:", error));
}



function createMovieCard(movie) {
  return `
    <div class="movie-card">
      <img class="movie-image" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.original_title}">
      <div class="movie-details">
        <div class="movie-title">${movie.original_title}</div>
        <div class="movie-rating">Rating: ${movie.vote_average}</div>
      </div>
      <button class="watch-now-btn" onclick="watchMovie('${movie.id}')">Watch Now</button>
    </div>
  `;
}

function displayMovies(movies) {
  const seriesFrame = document.getElementById("movieFrame");
  seriesFrame.src = "";
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    console.log(movie);
    const card = createMovieCard(movie);
    moviesContainer.innerHTML += card;
  });
}

function watchMovie(movieId) {
  const moviesContainer = document.getElementById("moviesContainer1");
  moviesContainer.innerHTML = "";
  const movieViewer = document.getElementById("movieViewer");
  movieViewer.style.display = "block";
  const movieFrame = document.getElementById("movieFrame");
  movieFrame.src = `https://vidsrc.to/embed/movie/${movieId}`;
}

let page = 1;

const optionButton = document.getElementById('next');
optionButton.addEventListener('click', () => {
  page++;
  fetchData();
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTdjMzViYmJlOTdkYTUzZjNiZGZhMDZmMTFmZjdkZSIsInN1YiI6IjY1ZDVmYzYyZmZkNDRkMDE4NzJiMzA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TjyOjpsyuqPvvw97Gk7QyCkmf3x_G8esHJ7IU26ge9M'
  }
};

function fetchData() {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.page)
      console.log(data)
      const results = data.results;
      nowPlaying(results);
    })
    .catch(err => console.error(err));
}

function nowPlaying(movies) {
  const seriesFrame = document.getElementById("movieFrame");
  seriesFrame.src = "";
  const moviesContainer = document.getElementById("moviesContainer");
  moviesContainer.innerHTML = "";

  movies.forEach((movie) => {
    const card = createMovieCard(movie);
    moviesContainer.innerHTML += card;
  });
}

fetchData();


// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
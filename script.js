function searchMovie() {
    const searchQuery = document.querySelector('.searchInput').value;
    const movieDatabaseAPI = 'https://api.themoviedb.org/3/search/movie';
    const apiKey = '557c35bbbe97da53f3bdfa06f11ff7de';

    const options = {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    };

    fetch(`${movieDatabaseAPI}?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`, options)
      .then(response => response.json())
      .then(data => {
        displayMovies(data.results);
      })
      .catch(error => console.error('Error:', error));
  }

  function displayMovies(movies) {
    const moviesContainer = document.getElementById('moviesContainer');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
      console.log(movie);
      const card = `
        <div class="movie-card">
          <img class="movie-image" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}" alt="${movie.original_title}">
          <div class="movie-details">
            <div class="movie-title">${movie.original_title}</div>
            <div class="movie-rating">Rating: ${movie.vote_average}</div>
            
          </div>
          <button class="watch-now-btn" onclick="watchMovie('${movie.id}')">Watch Now</button>
        </div>
      `;
      moviesContainer.innerHTML += card;
    });
  }

  function watchMovie(movieId) {
    const vidsrcUrl = `https://vidsrc.to/embed/movie/${movieId}`;
    window.open(vidsrcUrl);
  }
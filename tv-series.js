// Constants for API endpoints and API key
const VIDSRC_API_BASE_URL = "https://vidsrc.to/embed/tv/";
const THEMEDB_API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "557c35bbbe97da53f3bdfa06f11ff7de"; // Replace "YOUR_API_KEY" with your actual API key
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTdjMzViYmJlOTdkYTUzZjNiZGZhMDZmMTFmZjdkZSIsInN1YiI6IjY1ZDVmYzYyZmZkNDRkMDE4NzJiMzA4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TjyOjpsyuqPvvw97Gk7QyCkmf3x_G8esHJ7IU26ge9M";

// Function to search for TV series and display results
function searchSeries() {
    const seriesInput = document.getElementById("seriesInput").value;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + ACCESS_TOKEN
        }
    };

    fetch(`${THEMEDB_API_BASE_URL}/search/tv?query=${seriesInput}&include_adult=false&language=en-US&page=1&api_key=${API_KEY}`, options)
        .then(response => response.json())
        .then(data => {
            const searchResultsContainer = document.getElementById("searchResults");
            searchResultsContainer.innerHTML = ""; // Clear previous search results

            // Display series results
            console.log(data)
            data.results.forEach(series => {
                const seriesCard = `
                    <div class="series-card">
                    <img class="movie-image" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2/${series.poster_path}" alt="${series.original_title}">
                        <h3>${series.name}</h3>
                        <button onclick="watchSeries('${series.id}')">Watch Now</button>
                    </div>
                `;
                searchResultsContainer.innerHTML += seriesCard;
            });
        })
        .catch(err => console.error(err));
}

// Function to open the video link in a new tab
function watchSeries(seriesId) {
    const seasonInput = document.getElementById("seasonInput").value;
    const episodeInput = document.getElementById("episodeInput").value;

    const vidsrcUrl = `${VIDSRC_API_BASE_URL}${seriesId}/${seasonInput}/${episodeInput}`;
    window.open(vidsrcUrl, '_blank');
}

// Function to play the selected episode
function playEpisode() {
    const seasonInput = document.getElementById("seasonInput").value;
    const episodeInput = document.getElementById("episodeInput").value;

    // Here, you might perform any necessary validation or operations related to playing the episode
}

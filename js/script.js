// making routers from scratch
// 
const global =  {
    currentPage : window.location.pathname
};

/**
 * This function makes API call to TMDB using fetchAPIData() function
 * and then create a html div containing tv show card to display on the home
 * route. Also we extracted the data from the returned object from the API call.
 */

async function displayPopularTVShows() {
    const {results} = await fetchAPIData('tv/popular');
    //console.log(results);

    results.forEach((tv)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="tv-details.html?id=${tv.id}">
        ${// here we check that if there is a tv show poster path then display it if not then display stock image.
            tv.poster_path
            ?
            ` <img
            src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
            class="card-img-top"
            alt="${tv.name}"
          />` 
            :
          ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${tv.name}"
        />`
        }
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${tv.first_air_date}</small>
            </p>
          </div>
        `
        document.querySelector('#popular-shows').appendChild(div);
    });
}

/**
 * This function makes API call to TMDB using fetchAPIData() function
 * and then create a html div containing movie card to display on the home
 * route. Also we extracted the data from the returned object from the API call.
 */
async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    //console.log(results);
    results.forEach((movie)=>{
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
         ${// here we check that if there is a movie poster path then display it if not then display stock image.
            movie.poster_path
            ?
            ` <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />` 
            :
          ` <img
          src="images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
        }
       
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Release: ${movie.release_date}</small>
        </p>
      </div>`
      document.querySelector('#popular-movies').appendChild(div);
    });
}

/**
 * This fucntion displays movie details. 
 * 
 * It get the movie ID from the top search bar. 
 *
 */
async function displayMovieDetails(){
    const movieID = window.location.search;// getting ID from search bar on the top.
    // the movieID has the id in the format '?id=12345' we need to extract it from the string.
    // we can either slice the string after 4 chars or we can use split method which splits at '=' & return an array 
}

// Fretch data from the TMDB 
/**
 * If this was a production website we should not keep the key here
 * in case of a professional enviournment we make server that stores the key 
 * and we make request from here to fetch the key.
 * Normally it should be in an .env file (enviournment variable)
 */
/**
 *This an aysnc function that fetches by making a GET request to
 * the TMDB
 * @param {} endpoint 
 */
async function fetchAPIData(endpoint){
    const API_KEY = 'bfd6d0dce5037d1d11913bc10363d885'; 
    const API_URL = 'https://api.themoviedb.org/3/'; // append the required string at the end to make approprate request.

    // adding the spinning effect
    showSpinner();

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    //removing the spinning effect
    hideSpinner();

    return data;
}

/**
 * This funtion displays the spinner effect.
 */
function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

// HighLight Active link
/**
 * This function will change the color of the
 * selected link.
 */
function highLightActiveLink(){
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link)=>{
        if(link.getAttribute('href')===global.currentPage){
            link.classList.add('active');
        }
    })
}

// Init app 
function init() {
    switch(global.currentPage) {
        case '/':
        case '/index.html':

            displayPopularMovies();
            console.log('Home');
            break;
        case '/shows.html':
            displayPopularTVShows();
            console.log('shows');
            break;
        case '/movie-details.html':
            displayMovieDetails();
            console.log('movie-details');
            break;
        case '/tv-details.html':
            console.log('tv-details');
            break;
        case '/search.html':
            console.log('search');
            break;

    }
    highLightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
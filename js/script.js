// making routers from scratch
// 
const global =  {
    currentPage : window.location.pathname
};

async function displayPopularMovies(){
    const {results} = await fetchAPIData('movie/popular');
    console.log(results);
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

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    return data;
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
            console.log('shows');
            break;
        case '/movie-details.html':
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
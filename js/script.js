
//import './youtube'
// making routers from scratch
// 
const global =  {
    currentPage : window.location.pathname
};

function getId(){
  const id = window.location.search;// getting ID from search bar on the top.
  // the movieID has the id in the format '?id=12345' we need to extract it from the string.
  // we can either slice the string after 4 chars or we can use split method which splits at '=' & return an array 
  return id.slice(4);
}


/**
 * This function makes API call to TMDB using fetchAPIData() function
 * and then create a html div containing tv show card to display on the home
 * route. Also we extracted the data from the returned object from the API call.
 */
// used innerHTML to for DOM manipulation.
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
//used innerHTML for DOM manipulation
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
    const movie_id = getId() ;
    const movieDetails = await fetchAPIData(`movie/${movie_id}`);
    //console.log(movieDetails);
    //updating the html tags
    displayBackgroundImage('movie',movieDetails.backdrop_path);

    // Update HTML elements with movie details
    const movieDetailsContainer = document.getElementById('movie-details');

    // Update image source
    const posterImage = movieDetails.poster_path
        ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
        : 'images/no-image.jpg';
    movieDetailsContainer.querySelector('.card-img-top').src = posterImage;

    // Update title
    movieDetailsContainer.querySelector('h2').textContent = movieDetails.title;
    
    // update ratings
    movieDetailsContainer.querySelector('p').innerHTML = ` <i class="fas fa-star text-primary"></i>
    ${movieDetails.vote_average.toFixed(1)} / 10`;

    // Update release date
    movieDetailsContainer.querySelector('.text-muted').textContent = `Release Date: ${movieDetails.release_date}`;

    // Update overview
    movieDetailsContainer.querySelector('p:last-of-type').textContent = movieDetails.overview;
    
    // show trailers
    /*
    const trailerKey = getMovieTrailerKey();
    initializeYouTubeAPI(trailerKey);
    */

    // Update genres
    const genresList = movieDetailsContainer.querySelector('.list-group');
    genresList.innerHTML = ''; // Clear existing genres
    movieDetails.genres.forEach((genre) => {
        const li = document.createElement('li');
        li.textContent = genre.name;
        genresList.appendChild(li);
    });

    // Update movie homepage link (if available)
    const homepageLink = movieDetailsContainer.querySelector('.btn');
    if (movieDetails.homepage) {
        homepageLink.href = movieDetails.homepage; // adds link the button, no need to add event listner
    } else {
        homepageLink.style.display = 'none'; // Hide the link if homepage is not available
    }

    // Update budget, revenue, runtime, status
    const detailsBottom = movieDetailsContainer.querySelector('.details-bottom');
    detailsBottom.querySelector('li:nth-child(1)').textContent = `Budget: $${movieDetails.budget.toLocaleString()}`;
    detailsBottom.querySelector('li:nth-child(2)').textContent = `Revenue: $${movieDetails.revenue.toLocaleString()}`;
    detailsBottom.querySelector('li:nth-child(3)').textContent = `Runtime: ${movieDetails.runtime} minutes`;
    detailsBottom.querySelector('li:nth-child(4)').textContent = `Status: ${movieDetails.status}`;

    // Update production companies
    const productionCompanies = movieDetailsContainer.querySelector('.list-group2');
    productionCompanies.textContent = ''; // Clear existing production companies
    movieDetails.production_companies.forEach((company) => {
        const div = document.createElement('div');

        div.textContent = company.name;
        productionCompanies.appendChild(div);
    });
    
}


// tv show details 
/**
 * This function displays tv show details 
 * 
 */
async function displayShowDetails() {
  show_id = getId();
  const showDetails = await fetchAPIData(`tv/${show_id}`);
  //console.log(showDetails);
  displayBackgroundImage('show',showDetails.backdrop_path);

  // updating the html tags 
  const tvDetailsContainer = document.getElementById('show-details');

  // Update image source
  const posterImage = showDetails.poster_path
  ? `https://image.tmdb.org/t/p/w500${showDetails.poster_path}`
  : 'images/no-image.jpg';
  tvDetailsContainer.querySelector('.card-img-top').src = posterImage;

  // updating the title
  tvDetailsContainer.querySelector('h2').textContent = showDetails.name;

  // updating the rating 
  tvDetailsContainer.querySelector('p').innerHTML = ` <i class="fas fa-star text-primary"></i>
  ${showDetails.vote_average.toFixed(1)} / 10`;

  // updating release date
  tvDetailsContainer.querySelector('.text-muted').textContent = `Release Date: ${showDetails.first_air_date}`;

  // update overview
  tvDetailsContainer.querySelector('p:last-of-type').textContent = showDetails.overview;

  // update genres
  const genresList = document.querySelector('.list-group');
  genresList.innerHTML = ''; // clearing the list
  showDetails.genres.forEach((genre)=>{
    const li = document.createElement('li');
    li.textContent = genre.name;
    genresList.appendChild(li);
  });
  
  //updating the homepage link (if available)
  const homepageLink = tvDetailsContainer.querySelector('.btn');
  if(showDetails.homepage){
    homepageLink.href = showDetails.homepage; // adds link to button no need to add the event listner
  } else {
    homepageLink.style.display = 'none';
  }

  // Number Of Episodes, Last Episode To Air, status
  const detailsBottom = tvDetailsContainer.querySelector('.details-bottom');
  detailsBottom.querySelector('li:nth-child(1)').textContent = `No Of Episodes: ${showDetails.number_of_episodes.toLocaleString()}`;
  detailsBottom.querySelector('li:nth-child(2)').textContent = `Last Episode To Air: ${showDetails.last_episode_to_air.name.toLocaleString()}`;
  detailsBottom.querySelector('li:nth-child(3)').textContent = `Status: ${showDetails.status}`;

  // Update production companies
  const productionCompanies = tvDetailsContainer.querySelector('.list-group2');
  productionCompanies.textContent = ''; // Clear existing production companies
  showDetails.production_companies.forEach((company) => {
      const div = document.createElement('div');

      div.textContent = company.name;
      productionCompanies.appendChild(div);
  });



}
// Display slider Movies
/**
 * This function shows slider animation for the movies. It uses an 
 * API to fetch the animation
 */
async function displaySlider() {
  const {results} = await fetchAPIData('movie/now_playing');
  console.log(results);

  results.forEach((movie)=>{
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
        </a>
        <h4 class="swiper-rating">
          <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(1)} / 10
        </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}
// helper fucntion for the slider funciton
function initSwiper() {
  const swiper = new Swiper('.swiper',{
    slidePerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay:{
        delay: 4000,
        disableOnInteraction: false
    },
    breakpoints: {
      500: {
        slidesPerView : 2
      },
      700: {
        slidesPerView : 3
      },
      1200: {
        slidesPerView : 4
      },

    }
  });
}

//Background Image 
/**
 * This fucntion helps to display background image
 */
function displayBackgroundImage(type,backgroundPath){
      const overlayDiv = document.createElement('div');
      overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
      overlayDiv.style.backgroundSize = 'cover';
      overlayDiv.style.backgroundPosition = 'center';
      overlayDiv.style.backgroundRepeat = 'no-repeat';
      overlayDiv.style.height ='100vh';
      overlayDiv.style.width = '100vw';
      overlayDiv.style.position = 'absolute';
      overlayDiv.style.top = '0';
      overlayDiv.style.left = '0';
      overlayDiv.style.zIndex = '-1';
      overlayDiv.style.opacity = '0.1';

      if(type === 'movie'){
        document.querySelector('#movie-details').appendChild(overlayDiv);
      } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
      }
}   

//trailers
/**
 * gets the key for the videos on the youtube

async function getMovieTrailerKey(){
  const movie_id = getId() ;

  const trailers = await fetchAPIData_Token(`movie/${movie_id}/videos`);
  
  if(trailers.results && trailers.results.length > 0){
    let last = trailers.results.length-1;
  return trailers.results[last].key;
  } else {
    return 'Trailer Not Available';
  }
}
*/
/**
 * This function fetches data using API token instead of keys.
 * @param {*} endpoint 
 * @returns 
 */
async function fetchAPIData_Token(endpoint){
  const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmQ2ZDBkY2U1MDM3ZDFkMTE5MTNiYzEwMzYzZDg4NSIsInN1YiI6IjY1ZGNlOGQyMzQ0YThlMDE4NzM2YjlhYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVG0MxQzMwQP89aTQ7TyonvGeEMLBFwDn2Ed4XsoHds';
  const API_URL = 'https://api.themoviedb.org/3/';
  // adding the spinning effect
  showSpinner();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
     Authorization: `Bearer ${API_TOKEN}` 
    }
  };

  const response = await fetch(`${API_URL}${endpoint}?language=en-US`,options);
  const data = await response.json();

    //removing the spinning effect
    hideSpinner();

    return data;
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
            displaySlider();
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
            displayShowDetails();
            console.log('tv-details');
            break;
        case '/search.html':
            console.log('search');
            break;

    }
    highLightActiveLink();
}


document.addEventListener('DOMContentLoaded', init);

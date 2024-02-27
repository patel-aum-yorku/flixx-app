// making routers from scratch
// 
const global =  {
    currentPage : window.location.pathname
};

// Init app 

function init() {
    switch(global.currentPage) {
        case '/':
        case '/index.html':
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
}

document.addEventListener('DOMContentLoaded', init);
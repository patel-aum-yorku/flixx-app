// making routers from scratch
// 
const global =  {
    currentPage : window.location.pathname
};

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
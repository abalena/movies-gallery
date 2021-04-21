async function getMovies(){
    let response = await fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list');
    let movies = await response.json();
    displayMovies(movies)
    clickMovie();
}

function displayMovies(movies){
    let moviesDiv = document.getElementById('movies');
    movies.forEach(movie => {
        moviesDiv.innerHTML += `
            <div id=${movie.id} class="movie-card">
                <div class="img">
                    <img src=${movie.img} />
                </div>
                <div class="description">
                    <h3>${movie.name}</h3>
                    <h4>${movie.year}</h4>
                </div>
            </div>`
    })    
}

function clickMovie(){
    let movieList = document.querySelectorAll('div.movie-card');
    movieList.forEach(function(el) {
            el.addEventListener('click', function() {
              loadMovieInfo(this.id);
            });
          });
}
async function loadMovieInfo(id){
    let response = await fetch(`https://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`);
    let movieInfo = await response.json();
    showModalWindow(movieInfo)
}
function showModalWindow(movie){
    let modal = document.getElementById('modal');
    modal.innerHTML += `
        <div>
            <div><img src=${movie.img} /></div>
            <div>
                <h2>${movie.name}</h2>
                <p>${movie.description}</p>
            </div>
        </div>
        <div></div>`
}
getMovies();

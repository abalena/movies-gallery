let getMovies = document.getElementById('get-movies');

window.onload = function(){
    let moviesDiv = document.getElementById('movies');

    fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list')
    .then(res => res.json())
    .then(movies => {
        movies.forEach(movie => {
            moviesDiv.innerHTML += `
            <div class="movie-card">
                <div class="img">
                    <img src=${movie.img} />
                </div>
                <h3>${movie.name}</h3>
                <h4>${movie.year}</h4>
            </div>
            <p></p>`
        })
        
    })
}
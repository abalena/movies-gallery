let getMovies = document.getElementById('get-movies');
getMovies.addEventListener("click", evt => {


    let moviesDiv = document.getElementById('movies');

    fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list')
    .then(res => res.json())
    .then(movies => {
        movies.forEach(movie => {
            moviesDiv.innerHTML += `
            <div>
                <img src=${movie.img} />
                <h3>${movie.name}</h3>
                <h4>${movie.year}</h4>
            </div>
            <p></p>`
        })
        
    })
})
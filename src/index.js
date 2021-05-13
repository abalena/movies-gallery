window.onload = async function getMovies(){

    try{
        let response = await fetch('https://my-json-server.typicode.com/moviedb-tech/movies/list');
        let movies = await response.json()
        displayMovies(movies)
    }catch(err){
        console.log(err);
        alert("Oops...Something went wrong! Please try again later...")
    }
    displayFavouriteList()
    let movieList = document.querySelectorAll('div.movie-card');  
        movieList.forEach(function(el) {
            el.addEventListener('click', function() {
                loadMovieInfo(this.id);
            });
        });

    let stars = document.querySelectorAll("input[name=checkbox]");
    stars.forEach(star => {
        star.addEventListener("click", function(event){
            let movieCard = this.closest(".movie-card");
            let movieId = movieCard.id.toString();
            let movieTitle = movieCard.querySelector(".description h3").textContent.toString();
            
            event.stopPropagation();
            if(this.checked){
                localStorage.setItem(movieId, movieTitle)
                displayFavouriteList()
            }else{
                localStorage.removeItem(movieId)
                displayFavouriteList()
            }    
        })
    })
    stars
        

    function displayMovies(movies){
        if(movies){
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
                        <input class="fav" type="checkbox" name="checkbox"></input>
                    </div>`
            }) 
        }
    }

    function displayFavouriteList(){
        let favDiv = document.getElementById('fav');
        if(localStorage.length){
            for (var i = 0; i < localStorage.length; i++){
                favDiv.innerHTML += `<div>${localStorage.getItem(localStorage.key(i))}</div>`
            }
        }
    }

    async function loadMovieInfo(id){
        try{
            let response = await fetch(`https://my-json-server.typicode.com/moviedb-tech/movies/list/${id}`);
            let movieInfo = await response.json();
            showModalWindow(movieInfo)
        }catch(err){
            console.log(err);
            alert("Oops...Something went wrong! Please try again later.")
        }
    }

    function showModalWindow(movie){
        let modal = document.getElementById('modal');
        
        modal.innerHTML += `
            <div class="modal-content-wrapper">
                <div class="info">
                    <div id="img-container"><img id="image" src="${movie.img}" /></div>
                    <div class="year-and-genre">
                        <div>${movie.year}</div>
                        <ul id="genres"></ul>
                    </div>
                </div>
                <div class="info">
                    <div>
                        <h2>${movie.name}</h2>
                        <p>${movie.description}</p>
                    </div>
                    <div>
                        <p>Director: ${movie.director}</p>
                        <p id="starring">Starring: </p>
                    </div>
                </div>
                <button id="close">x</button>
            </div>
            `
        modal.style.display = "flex"
        getGenres(movie);
        getStarrings(movie)
        getImageOrientation()
        closeModal(); 
    }

    function getImageOrientation(){
        let imageContainer =  document.getElementById("img-container");
        let image = document.getElementById("image");
        if(image.offsetHeight > image.offsetWidth){
            imageContainer.classList.add("vertical")
        }else if(image.offsetHeight < image.offsetWidth){
            imageContainer.classList.add("horizontal")
        }else{
            imageContainer.classList.add("square")
        }
    }
    function getGenres(movie){
        let genresUl = document.getElementById("genres");
        movie.genres.forEach(genre => genresUl.innerHTML += `<li>${genre}</li>`)
    }

    function getStarrings(movie){
        let starringP = document.getElementById("starring");
        movie.starring.forEach(star => starringP.innerHTML += `<span>${star}, </span>`)
    }

    function closeModal(){
        let modal = document.getElementById('modal');
        let closeButton = document.getElementById('close');
            closeButton.addEventListener("click", function(){
                let modalContent = document.querySelector('div.modal-content-wrapper');
                modal.style.display = "none"
                if(modalContent){
                    modalContent.remove();
                } 
            })
    }

}
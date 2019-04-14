
var section = document.querySelector("section");

var requestURL = 'https://koopreynders.github.io/frontendvoordesigners/opdracht3/json/movies.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
  var allMovies = request.response;
  showMovies(allMovies);
}

function showMovies(jsonObj) {
  var movies = jsonObj;


  for (var i = 0; i < movies.length; i++) {
    createMovie(movies[i]);
  }

}
//functie los van for loop aanmaken. Als je een var aanmaakt
//in een for loop, heb je kans dat wanneer je bijvoorbeeld 2 buttons hebt
// en je wilt een eventlistener aan alle buttons toevoegen, dat dit alleen
//wordt toegepast op de laatste, omdat deze steeds wordt overgschreden door het
//laatst aangemaakte element.

//elementen aanmaken
function createMovie(movie) {
  var myArticle = document.createElement('article');
  var myExtraInfo = document.createElement ('section');
    myExtraInfo.classList.add('extraInfo');
  var button = document.createElement ('button');
  var myH2 = document.createElement('h2');
  var myImg = document.createElement('img');
  var myPara1 = document.createElement('p');
  var myPara2 = document.createElement('p');
  var myPara3 = document.createElement('p');
  var myTrailer = document.createElement('video');
  var myList1 = document.createElement('ul');
  var myList2 = document.createElement('ul');
  var myList3 = document.createElement('ul');
  var myList4 = document.createElement('ul');


//data inladen
  myH2.textContent = movie.title;
  myImg.src = movie.cover;
    myImg.classList.add('cover');
  myPara1.textContent = movie.plot;
    myPara1.classList.add('plot');
  myPara2.textContent = movie.simple_plot;
    myPara2.classList.add('simplePlot');
  myPara3.textContent = 'Release date: ' + movie.release_date;
    myPara3.classList.add('releaseDate');
  myTrailer.src =  movie.trailer;
    myTrailer.classList.add('trailer');
    myTrailer.poster='trailerimg.jpg';
    myTrailer.preload= true;
    myTrailer.controls= true;
  myList1.textContent = movie.genres;
    myList1.classList.add('genres');
  myList2.textContent = 'Reviews:'; + movie.reviews;
    myList2.classList.add('reviews');
  myList3.textContent = 'Directors:'; + movie.directors;
    myList3.classList.add('directors');
  myList4.textContent = 'Actors:'; + movie.actors;
    myList4.classList.add('actors');
  button.textContent = 'Meer informatie';
    button.classList.add('button');

  var genres = movie.genres;
  for (var j = 0; j < genres.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = genres[j];
    myList1.appendChild(listItem);
  }

  var reviews = movie.reviews;
  for (var j = 0; j < reviews.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = reviews[j].score;

    myList2.appendChild(listItem);
  }

  var directors = movie.directors;
  for (var j = 0; j < directors.length; j++) {
    var listItem = document.createElement('li');
    listItem.textContent = directors[j].name;
    myList3.appendChild(listItem);
  }

  var actors = movie.actors;
  for (var j = 0; j < actors.length; j++) {
    var listItem = document.createElement('li');
    var listItem2 = document.createElement('img');
      listItem2.classList.add('actorImg');
    listItem.textContent = actors[j].actor_name;
    listItem2.src = actors[j].url_photo;
    myList4.appendChild(listItem);
    myList4.appendChild(listItem2);
  }


  //toevoegen aan pagina
  myArticle.appendChild(myImg);
  myArticle.appendChild(myH2);
  myArticle.appendChild(myPara2);
  myExtraInfo.appendChild(myTrailer);
  myExtraInfo.appendChild(myPara1);
  myExtraInfo.appendChild(myPara3);
  myExtraInfo.appendChild(myList2);
  myExtraInfo.appendChild(myList3);
  myExtraInfo.appendChild(myList4);
  section.appendChild(myArticle);
  myArticle.appendChild(myExtraInfo);
  myArticle.appendChild(button);



  //meer of minder informatie laten zien
    button.addEventListener("click", function(){
      //console.log(button, myExtraInfo)
      myExtraInfo.classList.toggle('open');
      if (myExtraInfo.classList.contains('open')){
        button.innerHTML = 'minder informatie';
      }
      else{
        button.innerHTML = 'meer informatie';
      }
    });

}
//Zoeken op naam van film

var input = document.querySelector('#search');
var items = document.querySelector('.search-list').getElementsByTagName('article');

input.addEventListener('keyup', function(event) {
  var text = event.target.value;
  var pat = new RegExp(text, 'i');
  for (var i=0; i < items.length; i++) {
    var item = items[i];
    if (pat.test(item.innerText)) {
      item.className = item.className.replace(/\s+?hidden/,'');
    }
    else {
      item.className = item.className + ' hidden';
    }
  }
});

var userFormEl =document.querySelector('#user-form');
var cityNameEl = document.querySelector('#cityname');
var btnEl =document.querySelector('#btn')
var resultContainerEl =document.querySelector('#result-container');
var resultSearchTerm =document.querySelector('#result-search-term');

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityName= cityNameEl.value.trim();
  
    if (cityName) {
      geoData(cityName);
  
      resultContainerEl.textContent = '';
      cityNameEl.value = '';
    } else {
      alert('Please enter a City name');
      console.log(cityName)
    }
  };


// render/ dispaly weather data to the page

//  form the <form> element. listen to the "submit"
$('.user-form').on('submit', function() {
    var city = $(this).siblings('.cityname').val();
    var country = $(this).parent().attr('id');

    localStorage.setItem(city, country);
    console.log(city, country)
})

// // form the <button> element, listen to the "click"
 //  select the <input>, get its value, and provide it to the geo API
//  form the <button> container element , listen to the "click"
$('.container').on('click','button',function(event){

    event.target
});

// fetch the Geo data (latitude and longitute)
//    required info : Q = name of the city 
                //  : limit = number of cities to list
                //  appid = your custom API key

 function geoData(cityName) {

    var geoApi = "77eaa9b7e9cd8a601a1ff0d76468db72"
    var geoUrl = 'http://api.openweathermap.org/data/2.5/onecall?'+ cityName;

    fetch(geoUrl)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        console.log(data);

        oneCall(lat,lon )
    });

 }

// fetch the one call weather data
function oneCall(lat, lon) {
  var oneApi = " 77eaa9b7e9cd8a601a1ff0d76468db72"
  var oneUrl = "http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API Key} ";
  
     
    

    fetch(oneUrl)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        console.log(data)

        // render to page.
        // var displayWeather = function(){
            
        // }
    });

 }


  var displayWeather = function (city) {
    if (city.length === 0) {
      resultContainerEl.textContent = 'No cities found.';
      return;
    }


    
//   for (var i=0; i < city.length; i ++){    
//     var cityName = city[i] + '/' + city;

//     var cityEl = document.createElement('a');
//     cityEl.classList = 'list-item flex-row justify-space-between align-center';
//     cityEl.setAttribute('href', './single-repo.html?repo=' + cityName);

//     var titleEl = document.createElement('span');
//     titleEl.textContent = cityName;

//     cityEl.appendChild(titleEl);

//     var statusEl = document.createElement('span');
//     statusEl.classList = 'flex-row align-center';

//     if (city[i].city_count >= 5) {
//       statusEl.innerHTML =
//         "<i class='fas fa-times status-icon icon-danger'></i>" + city[i] + ' issue(s)';
//     } else {
//       statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
//     }

//     cityEl.appendChild(statusEl);

//     resultContainerEl.appendChild(cityEl);
  
// };


//    = lat
//    = lon
//    = appid
//    = untis -imperial
//    = exlude - minutely, hourly




//  print/ render the weather datat to the page
userFormEl.addEventListener('submit', formSubmitHandler)
}

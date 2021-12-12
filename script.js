var userFormEl =document.querySelector('#user-form');
var cityNameEl = document.querySelector('#cityname');
var btnEl =document.querySelector('#btn')
var resultContainerEl =document.querySelector('#result-container');
var resultSearchTerm =document.querySelector('#result-search-term');
var pastSearches = JSON.parse(window.localStorage.getItem('pastSearches')) || [];

// render/ dispaly weather data to the page

//  form the <form> element. listen to the "submit"
$('#user-form').on('submit', function() {
    var city = $(this).children('#cityInput').val();
    event.preventDefault()
    if(pastSearches.indexOf(city) === -1) {
    pastSearches.push(city);
    window.localStorage.setItem("pastSearches",  JSON.stringify(pastSearches));
    }

    if (city) {
      geoData(city);
  
      resultContainerEl.textContent = '';
      cityNameEl.value = '';
    } else {
      alert('Please enter a City name');
      console.log()
    }

    console.log(city)
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
    var geoUrl = " https://api.openweathermap.org/data/2.5/weather?q="+cityName + "&appid=" +geoApi;

    fetch(geoUrl)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        console.log(data);

        oneCall(data.coord.lat, data.coord.lon )
    });

 }

// fetch the one call weather data
function oneCall(lat, lon) {
  var oneApi = "77eaa9b7e9cd8a601a1ff0d76468db72"
  var oneUrl = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneApi}&units=imperial`;
  
     
    

    fetch(oneUrl)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
      var currentDate = moment(data.current.dt, 'X').format('L')
      var forecastDate = moment(data.daily[1].dt, 'X').format('L')
     
      //Define vars for all data that you will need Temp, Humidity, WindSpeed, UVIndex and Icon
      var temp = data.weather
      var humidity = data.weather;
      var windspeed =data.wind;
      var uvI = data.weather;
      var name = data;
      var icon = data.weather;
     
     
        console.log(data)
        console.log(currentDate, forecastDate)
        
      for (i=1; i < data.daily.length - 2; i++) {
        // Define vars and elements for forecast cards
      }
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
//    = lat
//    = lon
//    = appid
//    = untis -imperial
//    = exlude - minutely, hourly




//  print/ render the weather datat to the page
userFormEl.addEventListener('submit', formSubmitHandler)
}

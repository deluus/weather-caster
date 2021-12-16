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
// fetch the Geo data (latitude and longitute)
//    required info : Q = name of the city 
//  : limit = number of cities to list
//  appid = your custom API key

 function geoData(cityName) {

    var geoApi = "77eaa9b7e9cd8a601a1ff0d76468db72"
    var geoUrl = " https://api.openweathermap.org/data/2.5/weather?q="+cityName + "&appid=" +geoApi;

    // getting API response and returning it with a parsing into js object 
    // THEN function calling oneCall function for API data results 
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

      var temp = data.list.main[3];
      var humidity = data.list.main[1];
      var windspeed =data.list.wind[2];
      // var uvI = data.weather;
      var icon = data.list[i].weather[0].icon;
     
     
        console.log(data)
        console.log(currentDate, forecastDate)
        
      for (i=1; i < data.daily.length - 2; i++) {
        // Define vars and elements for forecast cards
        document.getElementById("day" + (i + 1 )+"Min").innerHTML = "Min" + Number(data.list[i].main.temp_min -280.23).toFixed(1)+"*";
      }
      for (i=1; i < data.daily.length - 2; i++) {
        // Define vars and elements for forecast cards
        document.getElementById("day" + (i + 1 )+"Max").innerHTML = "Max" + Number(data.list[i].main.temp_max -280.23).toFixed(1)+"*";
      }
      for (i=1; i < data.daily.length - 2; i++){
        document.getElementById("img" + (i + 1 )).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+ ".png";
      }
    })
    .catch(err => alert("something went wrong")

    )};

// display fxn
  var displayWeather = function (city) {
    if (city.length === 0) {
      resultContainerEl.textContent = 'No cities found.';
      return;
    }



//  print/ render the weather datat to the page
userFormEl.addEventListener('submit', formSubmitHandler)
}

var userFormEl = document.querySelector('#user-form');
var cityNameEl = document.querySelector('#cityInput');
var btnEl = document.querySelector('#btn')
var resultContainerEl = document.querySelector('#result-container');
var resultSearchTerm = document.querySelector('#result-search-term');
var pastSearches = JSON.parse(window.localStorage.getItem('pastSearches')) || [];
var forecastEl = document.querySelector('#forecast-container')

// render/ dispaly weather data to the page
$('#pastSearches').on('click', 'li', function() {
  geoData($(this).text());
});

// Will create a list item element to append to our HTMLs unordered list
function listItem(citiesHistory) {
  var li = $('<li>').addClass('list-group-item list-group-item-action').text(citiesHistory);
  $('#pastSearches').append(li);
};

//  form the <form> element. listen to the "submit"
$('.btn').on('click', function () {
  var city = $('#cityInput').val()
  event.preventDefault()

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
  var geoUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + geoApi;

  if(pastSearches.indexOf(cityName) === -1) {
    pastSearches.push(cityName);
    window.localStorage.setItem('pastSearches', JSON.stringify(pastSearches))
    listItem(cityName)
  }

  // getting API response and returning it with a parsing into js object 
  // THEN function calling oneCall function for API data results 
  fetch(geoUrl)

    .then(function (response) {
      return response.json();

    })
    .then(function (data) {
      console.log(data);

      oneCall(data.coord.lat, data.coord.lon,cityName)
    });

}

// fetch the one call weather data
function oneCall(lat, lon, cityName) {
  var oneApi = "77eaa9b7e9cd8a601a1ff0d76468db72"
  var oneUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${oneApi}&units=imperial`;


  fetch(oneUrl)

    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

      $("#result-container").empty()
        var card = $('<div>').addClass('card').addClass('col-9')
        var cardBody = $('<div>').addClass('card-body p-2')
        var date = $('<div>').text(moment(data.current.dt, 'X').format('LL')).addClass('card-text');
        var name = $("<div>").text(cityName).addClass('card-text').css('paddingTop', '20px');
        var temp= $("<div>").text('Temp: '+ data.current.temp + 'F').addClass('card-text').css('paddingTop', '10px');
        var uvi = $("<div>").text('UVI: ' + data.current.uvi).addClass('card-text').css('paddingTop', '10px');
        var humidity = $("<div>").text('Humidity: ' + data.current.humidity + '%').addClass('card-text').css('paddingTop', '10px');
        var wind_speed = $("<div>").text('Wind Speed: ' + data.current.wind_speed + 'MPH').addClass('card-text').css('paddingTop', '10px');
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png");

        date.append(img)
        cardBody.append(cityName,date,temp,wind_speed,humidity,uvi);
        card.append(cardBody)
        $("#result-container").append(card)
      console.log(data)


      forecastEl.innerHTML = '';
      for (i = 1; i < data.daily.length - 2; i++) {
        var card = $('<div>').addClass('card').addClass('col-2 bg-primary text-white')
        var cardBody = $('<div>').addClass('card-body p-2')
        var date = $('<div>').text(moment(data.daily[i].dt, 'X').format('L')).addClass('card-text');
        //var name = $("<div>").attr("src", "https://openweathermap.org" + data);
        var temp= $("<div>").text('Temp: '+ data.daily[i].temp.max + 'F').addClass('card-text').css('paddingTop', '10px');
        var humidity = $("<div>").text('Humidity: ' + data.daily[i].humidity + '%').addClass('card-text').css('paddingTop', '10px');
        var wind_speed = $("<div>").text('Wind Speed: ' + data.daily[i].wind_speed + 'MPH').addClass('card-text').css('paddingTop', '10px');
        var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        date.append(img)
        cardBody.append(date, temp,humidity,wind_speed);
        card.append(cardBody)
        $('#forecast-container').append(card)
           // Define vars and elements for forecast cards
        //document.getElementById("div" + (i + 1) + "Min").innerHTML = "Min" + Number(data.list[i].data.current.temp_min - 280.23).toFixed(1) + "*";
      }

      //Define vars for all data that you will need Temp, Humidity, WindSpeed, UVIndex and Icon
      // function dispalyWeather(data) {
      //   var name = data;
      //   var temp = data.current;
      //   var humidity = data.current;
      //   var wind_speed = data.weather;
        // var uvi = data.current;
        // var icon = data.weather[0];

        // var displayWeather = function (city) {
        //   if (city.length === 0) {
        //     resultContainerEl.textContent = 'No cities found.';
        //     return;
        //   }


        //   for (i = 1; i < data.daily.length - 2; i++) {
        //     // Define vars and elements for forecast cards
        //     document.getElementById("div" + (i + 1) + "Max").innerHTML = "Max" + Number(data.list[i].data.current.temp_max - 280.23).toFixed(1) + "*";
        //   }
        //   for (i = 1; i < data.daily.length - 2; i++) {
        //     document.getElementById("cityname" + (i + 1)).src = "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        //   }
        // }
        // // .catch(err => alert("something went wrong")
    
        
    });


      // function addElement() {
      //   var node = document.createElement("div");
      //   var textNode = documet.createTextNode("hello im here");
      //   node.appendChild(textNode);
      //   node.appendChild(textNode);
      //   var currentWeather = document.getElementById("result-container");
      //   document.body.insertBefore(node, currentWeather)
        
      // }
      // function addElement() {
      //   var cast = document.createElement("p");
      //   // var castContent = documet.createTextNode("")
      //   cast.appendChild(name, temp, humidity,wind_speed,uvi,icon);
      //   // cast(cast, castContent);
      // }


      // }





  //  print/ render the weather datat to the page
  userFormEl.addEventListener('submit', geoData)
};
for (var i = pastSearches.length - 1; i >= pastSearches.length - 5; i --){
  if(i >= 0){
    listItem(pastSearches[i]);
  }
// }

// for(var i = 0; i< 5; i++) {
//   listItem(pastSearches[i]);
}
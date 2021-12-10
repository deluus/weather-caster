var apiKey = "77eaa9b7e9cd8a601a1ff0d76468db72"
var country = "palau"
var city = "koror"
var areaCode = "96940"
var cardFormEl = document.querySelector('#user-form');
var cityNameEl = document.querySelector('#cityname');
var btnEl = document.querySelector('#btn')

var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var username = nameInputEl.value.trim();
  
    if (username) {
      getUserRepos(username);
  
      repoContainerEl.textContent = '';
      nameInputEl.value = '';
    } else {
      alert('Please enter a City name');
    }
  };


// render/ dispaly weather data to the page

//  form the <form> element. listen to the "submit"
$('.user-form').on('click',function(){
    // var value = $(this).siblings('.description').val();
    // var time = $(this).parent().attr('id);
})
// form the <button> element, listen to the "click"


             //   select the <input>, get its value, and provide it to the geo API

//  form the <button> container element , listen to the "click"
$('.container').on('click','button',function(event){

    event.target
});

            // Q parameter : get the city from the buttons data attribute key value pairs query strings

 // fetch the geo data (lat, lon)
 function geoData(cityName) {
     
    var url = "";

    fetch(url)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        // console.log(data);

        // oneCall(provide lat and lon )
    });

 }




// fetch the Geo data (latitude and longitute)
//    required info : Q = name of the city 
                //  : limit = number of cities to list
                //  appid = your custom API key


// fetch the one call weather data
function oneCall(lat, lon) {
     
    var url = "";

    fetch(url)

    .then(function(response){
        return response.json();

    })
    .then(function(data){
        // console.log(data)

        // render to page.
    });

 }


//    = lat
//    = lon
//    = appid
//    = untis -imperial
//    = exlude - minutely, hourly




//  print/ render the weather datat to the page
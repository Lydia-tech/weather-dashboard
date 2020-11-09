var button = document.querySelector('.button')
var inputValue = document.querySelector('inputValue')
var name = document.querySelector('name')
var desc = document.querySelector('desc')
var temp = document.querySelector('temp')
var apiKey = '7883975cfc87b328bb0451874bc2085a'
let currentTime = (moment().format('MM/DD/YYYY'));

// button.addEventListener('click',function(){ 


//   fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&units=imperial&appid='+apiKey)
//     .then(response => response.json())
//     .then(data => {
//        var nameValue = data['name'];
//        var tempValue = ['main']['temp'];
//        var descValue = data['weather'][0]['description'];

//        name.innerHTML = nameValue;
//        temp.innerHTML = tempValue;
//        desc.innerHTML = descValue;
//     })

// .catch( err => alert("Wrong city name!"))
// })

// from stack overflow
function degToCompass(num) {
  var val = Math.floor((num / 22.5) + 0.5);
  var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return arr[(val % 16)];
}

function updateLocation(response) {
  const windDeg = Math.round(response.wind.deg);
  const toDirection = degToCompass(windDeg);
  $(".city").html(`<h2>${response.name} (${currentTime}) <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png"></h2>`);
  $(".windspeed").text("Wind: " + toDirection + " at " + Math.round(response.wind.speed) + " mph");
  $(".humidity").text("Humidity: " + Math.round(response.main.humidity) + "%");
  $(".temperature").text("Temperature: " + Math.round(response.main.temp) + "°F");
  $(".temp_low").text("Low: " + Math.round(response.main.temp_min) + "°F");
  $(".temp_high").text("High: " + Math.round(response.main.temp_max) + "°F");
  $(".real_feel").text("Feels Like: " + Math.round(response.main.feels_like) + "°F");

  // fiveDayForecast(response.name);
}
  

function InputSearch() {
  $('#search-btn').click(function (event) {
    // to prevent default refreshing of page on click
    event.preventDefault(console.log("click"));
    var queryCity = $('#query').val().trim();
    console.log(queryCity);
    if (queryCity != '') {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&units=imperial&appid=${apiKey}`,
        method: "GET"
      }).then(function (response) {
        updateLocation(response)
       // cityUV(response.coord.long, response.coord.lat)
       $("#cityList").empty();
       localStorage.setItem("weather-search-terms", JSON.stringify(cityArray))
      })
    }
  })
}

InputSearch();

// create city func to cycle through city array elements and retrieve city data upon click event 
let cityList = document.getElementById("cityList");
let cityArray = JSON.parse(localStorage.getItem("weather-search-terms"))
if (cityArray && cityArray !== null) {
  setupCityListBox(cityArray)
} else {
  cityArray=[]
  setupCityListBox(cityArray)
}


function setupCityListBox(cityArray) {
  for (let i = 0; i < cityArray.length; i++) {
      let btn = document.createElement("button");
      btn.setAttribute("id", cityArray[i]);
      btn.classList = "btn btn-outline-dark ";
      btn.onclick = (e) => buttonClick(e.target.id);
      btn.append(cityArray[i]);
      cityList.append(btn);

  }
};

const cityInfo = async (city) => {

  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  const response = await fetch(queryURL);
  const result = await response.json();
  return result;
};

const buttonClick = (city) => {
  cityInfo(city).then(response => {
      console.log("info =>", response)
      // Transfer content to HTML
      updateLocation(response);
      cityUV(response.coord.lon, response.coord.lat);
  });


};


  
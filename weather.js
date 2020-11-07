var searchEl = document.querySelector("#search");
var locationEl = document.querySelector("#location");
var forecastEl = document.querySelector("forecast")
//var repocontainerEl = document.querySelector("#repos-container");


let searchHistory = JSON.parse(localStorage.getItem('city')) || [];


window.onload = function () {

    searchHistory.forEach(function (v) { //append each element into the dom
        var value = v;
        var li = document.createElement('li');
        li.textContent = value
        var list = document.getElementById('searchHistory');

        list.appendChild(li);
    })

}

//search history
document.getElementById("search").addEventListener("submit", function (event) {
    event.preventDefault();

    // set item to local storage
    var value = document.getElementById("cityLocation").value.trim();

    localStorage.setItem('city', JSON.stringify(value))

    var li = document.createElement("li");
    li.textContent = value;


    // retrieve from local storeage and append in search history
    JSON.parse(localStorage.getItem('city'))
    document.getElementById("searchHistory").append(li);

});

var getWeatherForecast = function (location) {
    //format the github api url
    var apiUrl = "api.openweathermap.org/data/2.5/weather?q=" + locationEl + "&units=imperial&appid=226cc54c5f303ead65ed71e6d190b1d6"


    if (getWeatherForecast.length === 0) {
        forecastEl.textContent = "No weather information found.";
        return;
    }
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data, user);
            });

        } else {
            alert("Error:" + response.statusText);
        }
    })
        .catch(function (error) {
            alert("Unable to connect");
        });

};



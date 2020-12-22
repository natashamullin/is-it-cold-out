var searchEl = document.querySelector("#search").value;
var locationEl = document.querySelector("#cityLocation").value;
var cityEl = document.querySelector(".city")
var dateEl = document.querySelector(".date")
var iconsEl = document.querySelector(".icon")
var tempEl = document.querySelector(".temp")
var windEl = document.querySelector(".wind")
var uvIndexEl = document.querySelector(".uvindex")
var humidityEl = document.querySelector(".humidity")

var forecastContainerEl = document.querySelector("#forecast-container")
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

var getWeatherForecast = function (locationEl) {
    //format the github api url

    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + locationEl + "&appid=d91f911bcf2c0f925fb6535547a5ddc9&units=imperial"


    if (getWeatherForecast.length === 0) {
        forecastEl.textContent = "No weather information found.";
        return;
    } else {
        fetch(apiUrl).then(function (response) {
            return response.json();
        }

            .then(function (data) {
                // get rid of old data
                todayEl = document.querySelector("#dayForecast");
                todayEl.textContent = "";

                //create weather for today
                var titleEl = document.createElement("h3")
                titleEl.classList.add("card-title");
                titleEl.textContent = data.name + "(" + new Date().toLocaleDateString() + ")";
                var cardEl = document.createElement("div");
                cardEl.classList.add("card");
                var windEl = document.createElement("p");
                windEl.classList.add("card-text");
                var humidEl = document.createElement("p");
                humidEl.classList.add("card-text");
                var tempEl = document.createElement("p");
                tempEl.classList.add("card-text");
                humidEl.textContent = "Humidity:" + data.main.humidity + "%";
                tempEl.textContent = "Temperature:" + data.main.temp + "degree F";
                var cardBodyEl = document.classList.add("card-body");
                var imgEl = document.createElement("img");
                imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

                titleEl.appendChild(imgEl)
                cardBodyEl.appendChild(titleEl);
                cardBodyEl.appendChild(tempEl);
                cardBodyEl.appendChild(humidEl);
                cardBodyEl.appendChild(windEl);
                cardEl.appendChild(cardBodyEl);
                todayEl.appendChild(cardEl);

                get5Day(locationEl);
                getUVIndex(data.coord.lat, data.coord.lon);
            })
        )
    }
};






function getSearchVal() {
    var locationEl = document.querySelector("#cityLocation").value;
    console.log(locationEl)
    getWeatherForecast(locationEl);
}

let searchHistory = JSON.parse(localStorage.getItem('city')) || [];



//search history
document.getElementById("search").addEventListener("submit", function (event) {
    event.preventDefault();

    // set item to local storage
    var locationEl = document.getElementById("cityLocation").value.trim();

    localStorage.setItem('city', JSON.stringify(locationEl))

    var li = document.createElement("li");
    li.textContent = locationEl;

    // retrieve from local storage and append in search history
    JSON.parse(localStorage.getItem('city'))
    document.getElementById("searchHistory").append(li);
    console.log("search history done");


});



function getWeatherForecast(locationEl) {
    console.log(locationEl)
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + locationEl + "&appid=c8492bd5ae455a79eebdaaa49b462446&units=imperial")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            // get rid of old data
            todayEl = document.querySelector("#dayForecast");
            todayEl.textContent = "";

            //create cArd for weather for today
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
            tempEl.textContent = "Temperature:" + data.main.temp + " degrees F";
            var cardBodyEl = document.createElement("div");
            cardBodyEl.classList.add("card-body");
            var imgEl = document.createElement("img");
            imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            titleEl.appendChild(imgEl)
            cardBodyEl.appendChild(titleEl);
            cardBodyEl.appendChild(tempEl);
            cardBodyEl.appendChild(humidEl);
            cardBodyEl.appendChild(windEl);
            cardEl.appendChild(cardBodyEl);
            todayEl.appendChild(cardEl);


        });
    if (locationEl.length === null) {
        forecastEl.textContent = "No weather information found.";
        return;
    }

    get5Day(locationEl);
    getUVIndex(data.coord.lat, data.coord.lon);



};

function get5Day(locationEl) {
    console.log(locationEl)
    fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + locationEl + "&appid=c8492bd5ae455a79eebdaaa49b462446&units=imperial")
        .then(function (response) {
            console.log(response)
            return response.json();
        })
        .then(function (data) {
            var forecastEl = document.querySelector("#fiveDayWeather");
            forecastEl.innerHtml = " <h2 class=\"subtitle\" > <span>5 Day forecast:</span> </h2 > ";
            forecastRowEl = document.createElement("div");
            forecastRowEl.className = "\"row\"";

            //loop in 3 hrs increments
            for (var i = 0; i < data.list.length; i++) {
                // only look at forecasts around 3:00pm
                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                    // creat 5 day forecast
                    var colEl = document.createElement("div");
                    colEl.classList.add("col-md-2");
                    var cardEl = document.createElement("div");
                    cardEl.classList.add("card");
                    var windEl = document.createElement("p");
                    windEl.classList.add("card-text");
                    windEl.textContent = "Wind speed:" + data.list[i].wind.speed + "MPH";
                    var humidityEl = document.createElement("p");
                    humidityEl.classList.add("card-text");
                    humidityEl.textContent = "Humidity:" + data.list[i].main.humidity + "%";
                    var bodyEl = document.createElement("div");
                    bodyEl.classList.add("card-body", "p-2");
                    var titleEl = document.createElement("h5");
                    titleEl.classList.add("card-title");
                    titleEl.textContent = new Date(data.list[i].dt_txt).toLocaleDateString()
                    var imgEl = document.createElement("img");
                    imgEl.setAttribute("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
                    var p1El = document.createElement("p");
                    p1El.classList.add("card-text");
                    p1El.textContent = "Temp:" + data.list[i].main.temp_max + " degrees F";
                    var p2El = document.createElement("p");
                    p2El.classList.add("card-text");
                    p2El.textContent = "Humidity:" + data.list[i].main.humidity + "%";

                    // put together and place on page
                    colEl.appendChild(cardEl);
                    bodyEl.appendChild(titleEl);
                    bodyEl.appendChild(imgEl);
                    bodyEl.appendChild(windEl);
                    bodyEl.appendChild(humidityEl);
                    bodyEl.appendChild(p1El);
                    bodyEl.appendChild(p2El);
                    cardEl.appendChild(bodyEl);
                    forecastEl.appendChild(colEl);


                }
            }
        });

    getUVIndex();
};

function getUVIndex(lat, lon) {
    fetch("http://api.openweathermap.org/data/2.5/uvi?appid=c8492bd5ae455a79eebdaaa49b462446&lat=" + lat + "&lon=" + lon)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            var bodyEl = document.querySelector(".card-body");
            var uvEl = document.createElement("p");
            uvEl.textContent = "UV Index: "
            var buttonEl = document.createElement("span");
            buttonEl.classList.add("btn", "btn-sm");
            buttonEl.innerHTML = data.value;

            if (data.value < 3) {
                buttonEl.classList.add("btn-success");
            } else if (data.value < 7) {
                buttonEl.classList.add("btn-warning");
            } else {
                buttonEl.classList.add("btn-danger");

                bodyEl.appendChild(uvEl);
                uvEl.appendChild(buttonEl);
            }
        })
}
document.querySelector("#search").addEventListener("submit", getSearchVal);






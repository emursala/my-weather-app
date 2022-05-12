function weather(response) {
  let currentTemperature = document.querySelector("#current-temperature");
  fahrenheitTemperature = response.data.main.temp;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#cloudy").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "993af96e9543b078265c47b2bab8efae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weather);
}

function getForecast(coordinates) {
  let apiKey = "993af96e9543b078265c47b2bab8efae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let day = days[now.getDay()];

let dateTime = document.querySelector("#current-date");
dateTime.innerHTML = `${day} ${hours}:${minutes}`;

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  search(city);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<table class="table">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<thead>
    </thead>
    <tbody>
    <tr>
    <th scope="row"></th>
    <td><strong>${formatDay(forecastDay.dt)}</strong></td>
    <td>
    <img class="forecastIcons"src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png">
    </td>
    <td>H: ${Math.round(forecastDay.temp.max)}° L: ${Math.round(
          forecastDay.temp.min
        )}°</td>
    </tr> </tbody>`;
    }
  });
  forecastHTML = forecastHTML + `</table>`;
  forecastElement.innerHTML = forecastHTML;
}

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", citySearch);

function celsiusClick(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  fahrenheit.classList.remove("fahrenheitLink");
  celsius.classList.add("fahrenheitLink");
  let celsiusTemperature = (fahrenheitTemperature - 32) * (5 / 9);
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

function fahrenheitClick(event) {
  event.preventDefault();
  fahrenheit.classList.add("fahrenheitLink");
  celsius.classList.remove("fahrenheitLink");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitClick);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusClick);

search("Portland");

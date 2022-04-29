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

function weather(response) {
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
}

function search(city) {
  let apiKey = "993af96e9543b078265c47b2bab8efae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(weather);
}

function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#change-city").value;
  search(city);
}

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", citySearch);

search("Portland");

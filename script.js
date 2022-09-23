let now = new Date();
let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${
  months[now.getMonth()]
}/${now.getDate()}/${now.getFullYear()}`;
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = days[now.getDay()];
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${now.getHours()}:${String(now.getMinutes()).padStart(
  2,
  "0"
)}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");

  let city = document.querySelector("#current-location");
  city.innerHTML = searchInput.value;

  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.innerHTML}&appid=${apiKey}&units=imperial`;

  function temperature(response) {
    let tempRounded = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#current-degrees");
    temperatureElement.innerHTML = `${tempRounded}°`;
    let weatherElement = document.querySelector("#weather-state");
    weatherElement.innerHTML = response.data.weather[0].description;
  }
  axios.get(apiUrl).then(temperature);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

function showTemp(response) {
  let tempRounded = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = `${tempRounded}°`;
  let cityElement = document.querySelector("#current-location");
  cityElement.innerHTML = response.data.name;
}

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function locationEvent(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

function defaultCity(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", locationEvent);

defaultCity("Chicago");

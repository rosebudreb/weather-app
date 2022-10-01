function setDate(timestamp) {
  let now = new Date(timestamp);
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
  let currentDay = document.querySelector("#current-day");
  let currentTime = document.querySelector("#current-time");
  currentDate.innerHTML = `${
    now.getMonth() + 1
  }/${now.getDate()}/${now.getFullYear()}`;
  currentDay.innerHTML = days[now.getDay()];
  currentTime.innerHTML = `${now.getHours()}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}
//Create Search Function
function searchByForm(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  searchByCityName(searchInput.value);
}

function searchByCityName(city_name) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(setTempuratureHTML);
}
//Create html update function
function setTempuratureHTML(response) {
  let tempRounded = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = `${tempRounded}°`;
  let weatherElement = document.querySelector("#weather-state");
  weatherElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  console.log(response.data);
  let city = document.querySelector("#current-location");
  city.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//Create conversion function
//Create conversion page update function
function searchByLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(setTempuratureHTML);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchByLocation);
}

// Create Current Listener
let currentCity = document.querySelector("#current-button");
currentCity.addEventListener("click", getLocation);
// Create Button Listener
let form = document.querySelector("#search-city");
form.addEventListener("submit", searchByForm);
// Initializers
setDate(new Date());
searchByCityName("Chicago");

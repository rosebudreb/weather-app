function setDate(timestamp) {
  let now = new Date(timestamp);
  let currentDate = document.querySelector("#current-date");
  let currentDay = document.querySelector("#current-day");
  let currentTime = document.querySelector("#current-time");
  currentDate.innerHTML = `${
    now.getMonth() + 1
  }/${now.getDate()}/${now.getFullYear()}`;
  currentDay.innerHTML = getDayOfWeek(timestamp);
  currentTime.innerHTML = `${now.getHours()}:${String(
    now.getMinutes()
  ).padStart(2, "0")}`;
}

function getDayOfWeek(timestamp) {
  let now = new Date(timestamp);
  console.log(timestamp);
  console.log(now.getDay());
  console.log(`${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[now.getDay()];
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

function setDegreesHTML(degrees, linkToDisable, linkToEnable) {
  let tempRounded = Math.round(degrees);
  let temperatureElement = document.querySelector("#current-degrees");
  temperatureElement.innerHTML = `${tempRounded}°`;
  linkToEnable.classList.remove("active");
  linkToDisable.classList.add("active");
}
//Create html update function
function setTempuratureHTML(response) {
  // get lat and lon from response
  let apiKey = "17ad6e67aa629189f73b053634668b20";
  let apiUrl = `http://api.openweathermap.org/data/2.5/onecall?cnt=6&lat=${response.data.coord.lat}&lon=${response.data.coord.lon}&cnt=5&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(setForecastHTML);
  // make new API call
  // Call setForecastHTML with API result

  setDegreesHTML(response.data.main.temp, farenheitLink, celsiusLink);
  let weatherElement = document.querySelector("#weather-state");
  weatherElement.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  let city = document.querySelector("#current-location");
  city.innerHTML = response.data.name;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function setForecastHTML(response) {
  let forecastWrapper = document.querySelector("#forecast-wrapper");
  let forecastHTML = "";
  for (i = 0; i < 6; i++) {
    let day = response.data.daily[i];
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
          <div class="card">
            <div class="card-body">
              ${getDayOfWeek(new Date(day.dt * 1000))}
              <div class="emoji-weather">
                <img class="" src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png" />
              </div>
              <div class="degrees-day"><span class="high-temp-forecast">${Math.round(
                day.temp.max
              )}</span>°/<span class="low-temp-forecast">${Math.round(
        day.temp.min
      )}</span>°</div>
            </div>
          </div>
        </div>`;
  }
  forecastWrapper.innerHTML = forecastHTML;
}
//Create conversion function
function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#current-degrees").innerHTML;
  let celsiusTemp = ((parseInt(currentDegrees) - 32) * 5) / 9;
  if (!celsiusLink.classList.contains("active")) {
    setDegreesHTML(celsiusTemp, celsiusLink, farenheitLink);
  }
}

function displayFarenheitTemp(event) {
  event.preventDefault();
  let currentDegrees = document.querySelector("#current-degrees").innerHTML;
  let farenheitTemp = (parseInt(currentDegrees) * 9) / 5 + 32;
  if (!farenheitLink.classList.contains("active")) {
    setDegreesHTML(farenheitTemp, farenheitLink, celsiusLink);
  }
}
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
//create Celsius Listener
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);
//create Farenheit Listener
let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheitTemp);

let farenheitTemperature = null;
// Initializers
setDate(new Date());
searchByCityName("Chicago");

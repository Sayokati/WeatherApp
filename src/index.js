function showTime() {
  let dates = document.querySelector(".dates");
  let newDates = new Date();
  let hours = newDates.getHours();
  if(hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = newDates.getMinutes();
  if (minutes < 10)
  {minutes=`0${minutes}`;
}
  else {minutes = minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[newDates.getDay()];
  dates.innerHTML = `${day} ${hours}:${minutes}`;
}
showTime();

//week5
function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = `${temperature}`;

  let weatherStatus = response.data.weather[0].description;
  let weatherStat = document.querySelector("#weatherStatus");
  weatherStat.innerHTML = `${weatherStatus}`;

  let humidity = response.data.main.humidity;
  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = `${humidity}`;

  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;
}

function showCity(city) {
  let units = "metric";
  let apiKey = "d97bafe5f0b8231b53a5a6f3c85cb35c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-entry");

  showCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

//geolocation

function currentPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "metric";
  let apiKey = "d97bafe5f0b8231b53a5a6f3c85cb35c";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function handleClick() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", handleClick);

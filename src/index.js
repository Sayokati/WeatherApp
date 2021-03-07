function showTime() {
  let dates = document.querySelector(".dates");
  let newDates = new Date();
  let hours = newDates.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = newDates.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else {
    minutes = minutes;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[newDates.getDay()];
  dates.innerHTML = `${day} ${hours}:${minutes}`;
}
showTime();

//week5
let celsiusTemperature = null;
let fahrenheitTemperature = null;

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  let temperature = response.data.main.temp;
  celsiusTemperature =temperature;
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(temperature);

  let weatherStatus = response.data.weather[0].description;
  let weatherStat = document.querySelector("#weatherStatus");
  weatherStat.innerHTML = `${weatherStatus}`;

  let humidity = response.data.main.humidity;
  let humidityInfo = document.querySelector("#humidity");
  humidityInfo.innerHTML = `${humidity}`;

  let wind = response.data.wind.speed;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${wind}`;

  let iconInfo = document.querySelector("#icon");
  iconInfo.setAttribute(
    "src",
    `images/${response.data.weather[0].icon}@2x.png`
  );
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="https://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>/ 
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function showCity(city) {
  let units = "metric";
  let apiKey = "d97bafe5f0b8231b53a5a6f3c85cb35c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-entry");

  showCity(searchInput.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

showCity("Krakow");

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

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");

  fahrenheitLink.classList.add("active");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;

  currentTemperature.innerHTML = Math.round(fahrenheiTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}



let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

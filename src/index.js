function updateWeather(responce) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = responce.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(responce.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${responce.data.condition.icon_url}" class="weather-app-icon"/>`;
  timeElement.innerHTML = formatDate(date);
  cityElement.innerHTML = responce.data.city;
  descriptionElement.innerHTML = responce.data.condition.description;
  humidityElement.innerHTML = `${responce.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${responce.data.wind.speed}km/h`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(responce.data.city);
}

function searchCity(city) {
  let apiKey = "dda109860t44c3182a6fo31f3f79b03f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "dda109860t44c3182a6fo31f3f79b03f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(responce) {
  let forecastHtml = "";

  responce.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>${Math.round(day.temperature.maximum)}°</strong>
              </div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", displayCity);

searchCity("Dnipro");

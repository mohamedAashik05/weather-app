const api = {
  key: "9c16927fbfb5c3e37b7a8a4b5fdfc54a",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".search-button");
const cityEl = document.querySelector(".location .city");
const dateEl = document.querySelector(".location .date");
const tempEl = document.querySelector(".current .temperature");
const humidityEl = document.querySelector(".current .humidity");
const weatherEl = document.querySelector(".current .wind-speed");
const percipitationEl = document.querySelector(".current .percipitation");

searchBox.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
  getweather(searchBox.value);
}
});

searchBtn.addEventListener("click", () => {
  getweather(searchBox.value);
});

async function getweather(query) {
  if (!query.trim()) {
    alert("Please enter a city name.");
    return;
  }

  try{
    const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`) 
  if (!response.ok) {
    alert("City not found. Please try again.");
    return;
  }

  const weather = await response.json();
  displayweather(weather);
} 
catch (error) {
  alert(error.message);
}}

function displayweather(weather) {
  cityEl.textContent = `${weather.name}, ${weather.sys.country}`;
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
  tempEl.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  weatherEl.textContent = `Wind Speed: ${weather.wind.speed} m/s`;
  humidityEl.textContent = `Humidity: ${weather.main.humidity}%`;
  percipitationEl.textContent = `Precipitation: ${weather.rain ? weather.rain['1h'] : 0} mm`;
}
function formatdate(date)
{return date.toLocaleDateString("en-US", 
  { weekday: "long", year: "numeric", month: "long", day: "numeric" });}

const URL = "https://api.weatherapi.com/v1/forecast.json?key=";
const KEY = "efd3429e7b5243739bc41850221212";

const search = document.getElementById("location__search");
const others_places = document.getElementById("others__places");
const city = document.getElementById("city");
const cityname = document.getElementById("cityname");
const feels_like = document.getElementById("feels_like");
const humidity = document.getElementById("humidity");
const max_temp = document.getElementById("max_temp");
const min_temp = document.getElementById("min_temp");
const sunrise = document.getElementById("Sunrise");
const sunset = document.getElementById("Sunset");
const temp = document.getElementById("temp");
const Wind_speed = document.getElementById("Wind_speed");

const getWeather = (city) => {
  fetch(`${URL}${KEY}&q=${city}&days=1&aqi=no&alerts=no`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      cityname.innerHTML = `${response.location.name}'s`;
      cityname.classList.remove("blink");
      feels_like.innerHTML = response.current.feelslike_c;
      humidity.innerHTML = `${response.current.humidity+" "+"%"}`;
      max_temp.innerHTML = response.forecast.forecastday[0].day.maxtemp_c;
      min_temp.innerHTML = response.forecast.forecastday[0].day.mintemp_c;
      sunrise.innerHTML = response.forecast.forecastday[0].astro.sunrise;
      sunset.innerHTML = response.forecast.forecastday[0].astro.sunset;
      temp.innerHTML = `${response.current.temp_c + " " + "°C"}`;
      Wind_speed.innerHTML = `${
        response.forecast.forecastday[0].day.maxwind_kph + " " + "km/h"
      }`;
    })
    .catch((err) => console.error(err));
};

const FetchCity = (name) => {
  // var data= ``
  fetch(`${URL}${KEY}&q=${name}`)
    .then((response) => response.json())
    .then((response) => {
       let data = ` 
        <tbody>
          <tr>
            <th scope="row" class="text-start">${response.location.name}</th>
            <td>${response.current.feelslike_c}</td>
            <td>${response.current.humidity}</td>  
            <td>${response.forecast.forecastday[0].day.maxtemp_c}</td>
            <td>${response.forecast.forecastday[0].day.mintemp_c}</td>
            <td>${response.forecast.forecastday[0].astro.sunrise}</td>
            <td>${response.forecast.forecastday[0].astro.sunset}</td>
            <td>${response.current.temp_c+" "+"°C"}</td>
            <td>${response.current.wind_kph}</td>
          </tr>
        </tbody>`;
    others_places.innerHTML += data;
    })
    .catch((err) => console.error(err));
};

const fetchOnLoad = () => {
  FetchCity("Delhi");
  FetchCity("Mumbai");
  FetchCity("Kolkata");
  FetchCity("Chennai");
  FetchCity("Uttar Pradesh");
};

window.addEventListener("load", fetchOnLoad);
search.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(city.value)
  if (city.value === "" || city.value.length < 3) {
    alert("Please enter a valid city");
    return;
  }
  getWeather(city.value);
  city.value = ""
});

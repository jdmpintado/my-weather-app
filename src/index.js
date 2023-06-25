// Function that updates the current day & time
function formatDate(date) {
  let dayIndex = date.getDay(); // Get the index of the day within the array
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]; // Define the corresponding array of days within the week
  let day = days[dayIndex]; // Get the day of the week

  let hours = date.getHours(); // Get the current hours
  if (hours < 10) {
    hours = `0${hours}`;
  } // Get the current hours in the HH format

  let minutes = date.getMinutes(); // Get the current minutes
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } // Get the current minutes in the MM format

  return `${day} ${hours}:${minutes}`;
} // Display the element udpated in the DAY HH:MM format

// Function that updates the city & the weather conditions
function displayWeatherConditions(response) {
  document.querySelector(
    "#city"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// Function to make the API call to Openweather API for the city defined on load or the city searched
function searchCity(city) {
  let apiKey = "858312fa1f4b73ac0761928ce1e1a3f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

// Function to make the API call to Openweather API for the current location
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "858312fa1f4b73ac0761928ce1e1a3f0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherConditions);
}

// Function to run whenever a city is submitted for search
function handleSubmit(event) {
  event.preventDefault(); // Prevent the default behavior
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

// Function to run whenever the button Current is pressed
function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

////////////

// Function that converts the temperature in Celsius to Fahrenheit
function convertToCelsius(event) {
  event.preventDefault(); // Prevent the default behavior
  let temperatureElement = document.querySelector("#current-temperature"); // Select the element to update
  let temperature = temperatureElement.innerHTML; // "Store" the temperature defined in the element (string)
  temperature = Number(temperature); // Convert the string into a number
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32); // Udpate the temperature in Fahrenheit
}

// Function that converts the temperature in Fahrenheit to Celsius
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature"); // Select the element to update
  let temperature = temperatureElement.innerHTML; // "Store" the temperature defined in the element (string)
  temperature = Number(temperature); // Convert the string into a number
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9); // Udpate the temperature in Celsius
}

////////////

// Select the date element to be updated & run the function assigned to update it to the current day & time
let dateElement = document.querySelector("#now");
let now = new Date();
dateElement.innerHTML = formatDate(now);

// Run the function to update the city searched & respctive weather conditions whenever there is a submission
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

// Run the function to update the current location & respective weather conditions whenever the button is pressed
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// Run the function that will display a city and its resepctive weather conditions on load
searchCity("lisbon");

// Run the function to update the temperature element to Fahrenheit whenever the Fahrenheit link is clicked
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToCelsius);

// Run the function to update the temperature element to Celsius whenever the Celsius link is clicked
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToFahrenheit);

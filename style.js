const searchBox = document.querySelector(".search-form input");
const searchBtn = document.querySelector(".search-form button");
const weatherIcon = document.querySelector(".background-image");

// Replace with your actual API info
const apiKey = "c3cd4cee8880b1b9c35ab2e8a1a9a032"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather-section").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".cloud").innerHTML = data.clouds.all + "%";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "cloudy.jpeg";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "sunny.jpg";
    } else if (data.weather[0].main === "Wind") {
      weatherIcon.src = "windy.jpg";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "rainy2.jpg";
    }

    document.querySelector(".weather-section").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

// Trigger search on button click
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value.trim());
});

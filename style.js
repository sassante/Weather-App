document.addEventListener("DOMContentLoaded", async function () {
    const apiKey = "c3cd4cee8880b1b9c35ab2e8a1a9a032";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  
    const searchBox = document.querySelector(".top-items input");
    const searchBtn = document.querySelector(".top-items button");
    const weatherIcon = document.querySelector(".background-image");
  
    async function checkWeather(city) {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  
      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather-section").style.display = "none";
      } else {
        const data = await response.json();
  
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".cloud").innerHTML = data.clouds.all + "%";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "k/hr";
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  
        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "img/cloudy.jpeg";
        } else if (data.weather[0].main == "Clear") {
          weatherIcon.src = "img/sunny.jpg";
        } else if (data.weather[0].main == "Wind") {
          weatherIcon.src = "img/windy2.jpg";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "img/rainyy2.jpg";
        }
  
        document.querySelector(".weather-section").style.display = "block";
        document.querySelector(".error").style.display = "none";
      }
    }
  
    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  });
  
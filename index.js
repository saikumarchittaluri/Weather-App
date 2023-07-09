const apiKey = "613abdef5f216181f27260e6493ce3fa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
  if (response.status === 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"; // Display temperature in Celsius
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    const weatherMain = data.weather[0].main.toLowerCase();
    let iconSrc = "";

    if (weatherMain.includes("cloud")) {
      iconSrc = "clouds.png";
    } else if (weatherMain.includes("clear")) {
      iconSrc = "clear.png";
    } else if (weatherMain.includes("rain")) {
      iconSrc = "rain.png";
    } else if (weatherMain.includes("drizzle")) {
      iconSrc = "drizzle.png";
    } else if (weatherMain.includes("mist")) {
      iconSrc = "mist.png";
    } else if (weatherMain.includes("snow")) {
      iconSrc = "snow.png";
    }

    weatherIcon.src = iconSrc;

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

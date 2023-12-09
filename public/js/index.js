const weatherForm = document.querySelector("form");
const input = document.querySelector("input");
const button = document.querySelector("button");
const weatherInfo = document.querySelector(".weather-info");
const weatherError = document.querySelector(".weather-error");
const weatherTitle = document.querySelector(".weather-title");

button.disabled = true;

input.addEventListener("input", () => {
  button.disabled = !input.value;
});

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = input.value;

  weatherTitle.textContent = "Loading...";
  weatherInfo.textContent = "";
  weatherError.textContent = "";
  button.disabled = true;

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.error) {
        weatherTitle.textContent = "Error";
        weatherError.textContent = data.error;
      } else if (data.current) {
        weatherTitle.textContent = `Weather info in ${data.location.name}`;
        weatherInfo.textContent = `${data.location.localtime}, ${data.current.weather_descriptions[0]}, feels like ${data.current.feelslike}, wind speed ${data.current.wind_speed}`;
      }
      button.disabled = false;
    });
  });
});
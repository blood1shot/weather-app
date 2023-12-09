const axios = require("axios");

const getUrlForWeatherStack = (longitude, latitude) => {
  return `http://api.weatherstack.com/current?access_key=${process.env.WEATHERSTACK_ACCESS_KEY}&query=${latitude},${longitude}`;
};

const getWeather = ({ longitude, latitude }, next, callback) => {
  axios.get(getUrlForWeatherStack(longitude, latitude))
    .then((res) => {
      callback(res.data);
    })
    .catch((e) => {
      if (next) {
        next(e);
      } else {
        console.log(e);
      }
    })
};

module.exports = getWeather;
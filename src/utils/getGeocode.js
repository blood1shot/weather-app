const axios = require("axios");

const getUrlForMapBox = (address) => {
  return `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAPBOX_ACCESS_KEY}&limit=1`;
};

const getGeocode = (address, next, callback) => {
  axios.get(getUrlForMapBox(address))
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

module.exports = getGeocode;
const request = require("request");
/*
const forecast = (latt, longt, callback) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=9bab32ee2d76427abf9170705231308&q=${latt}, ${longt}&aqi=yes&alerts=no&tides=no`;
  request({ url, json: true }, (error, {response}) => {
    console.log(response);
    if (error) {
      callback(
        "Unable to connect to server. Check your network connection",
        undefined
      );
    } else if (response.body.error) {
      const { error } = response.body;

      callback(error.message, undefined);
    } else {
      const { day } = response.body.forecast.forecastday[0];
      const { country, region } = response.body.location;
      callback(
        undefined,
        `This is the ${region} region in ${country}. The weather condition: ${day.condition.text}. It is currently ${day.avgtemp_c} degrees out. There is ${day.daily_chance_of_rain}% chance of rain`
      );
    }
  });
};

*/

///////////DESTRUCTURED////////////
const forecast = (latt, longt, callback) => {
  const url = `https://api.weatherapi.com/v1/forecast.json?key=9bab32ee2d76427abf9170705231308&q=${latt}, ${longt}&aqi=yes&alerts=no&tides=no`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to server. Check your network connection",
        undefined
      );
    } else if (body.error) {
      const { error } = body;

      callback(error.message, undefined);
    } else {
      const { day } = body.forecast.forecastday[0];
      const { country, region } = body.location;
      callback(
        undefined,
        `This is the ${region} region of ${country}. The weather condition: ${day.condition.text}. It is currently ${day.avgtemp_c} degrees out. There is ${day.daily_chance_of_rain}% chance of rain`
      );
    }
  });
};
module.exports = forecast;

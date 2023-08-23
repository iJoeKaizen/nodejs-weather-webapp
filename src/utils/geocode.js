const request = require("request");

/*
const geoCode = (address, callback) => {
  const url = `https://geocode.xyz/${encodeURIComponent(
    address
  )}?json=1&auth=125016459813478e15868508x120400`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (response.body.error) {
      callback("unable to find location, try another search.", undefined);
    } else {
      const { longt, latt } = response.body;
      callback(undefined, { longt, latt, city: response.body.standard.city });
    }
  });
};

*/

///////////DESTRUCTURED OBJ////////////

const geoCode = (address, callback) => {
  const url = `https://geocode.xyz/${encodeURIComponent(
    address
  )}?json=1&auth=125016459813478e15868508x120400`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to server", undefined);
    } else if (body.error) {
      callback("Unable to find location, try another search.", undefined);
    } else {
      const { longt, latt } = body;
      const { city } = body.standard;
      callback(undefined, { longt, latt, city });
    }
  });
};

module.exports = geoCode;

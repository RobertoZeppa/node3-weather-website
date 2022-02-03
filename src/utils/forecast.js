const request = require('postman-request');

const forecast = (coords, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f46e1c54e55d9992e3e651457dc19e8d&query=${coords}`;

  request({ url, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to weather services!');
    } else if (res.body.error) {
      callback('Unable to find location.');
    } else {
      // const data = JSON.parse(res.body);
      callback(null, res.body.current);
    }
  });
};

module.exports = forecast;

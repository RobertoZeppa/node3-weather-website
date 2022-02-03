const request = require('postman-request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9iZXJ0b3plcHBhIiwiYSI6ImNrejQzZmJ5bjAxdzgydXBramhiZGVydmkifQ.yP8g6zVk0aSORFl5774bNQ&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    const { features } = body;
    if (err) {
      callback('Unable to connect to location services!');
    } else {
      try {
        if (features.length) {
          const latitude = features[0].center[1];
          const longitude = features[0].center[0];
          callback(null, {
            latitude,
            longitude,
            location: features[0].place_name
          });
        } else {
          throw new Error();
        }
      } catch (error) {
        callback('Unable to find coordinates.');
      }
    }
  });
};

module.exports = geocode;

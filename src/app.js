const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and vies location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Mavel App',
    name: 'Luigi Schifano'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Mavel',
    name: 'Federico Cappella'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Mavel',
    name: 'Marta Groia'
  });
});

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'Address must be provided!'
    });
  }
  geocode(address, (error, data) => {
    if (error) {
      res.send({
        error
      });
    } else {
      const { latitude, longitude, location } = data;
      forecast(`${latitude},${longitude}`, (error, forecastData) => {
        if (error) {
          res.send({
            error
          });
        } else {
          res.send({
            forecast: forecastData,
            location,
            address
          });
        }
      });
    }
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help articole not found',
    name: 'Marta Groia'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Marta Groia'
  });
});

app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

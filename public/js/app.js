const weatherForm = document.querySelector('form');
const search = weatherForm.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = search.value;
  search.value = '';
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`/weather?address=${location}`)
    .then((resposnse) => {
      return resposnse.json();
    })
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
        return;
      }
      messageOne.textContent = data.location;
      messageTwo.innerText = `Forecast in ${location}: ${data.forecast.weather_descriptions[0]}.\n 
          Temperature: ${data.forecast.temperature}\n
          Humidity: ${data.forecast.humidity}
      `;
      console.log(data.forecast);
    });
});

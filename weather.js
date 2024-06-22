function weatherJSONCoordinates(lat, lon) {
    // get weather based on lat and lon given
    fetch(`https://beach-web-proxy.xyz:8443/weather?lat=${lat}&lon=${lon}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch weather data from server');
        }
        return response.json();
      })
      .then(data => {
        const weather = document.querySelector("#weather");
        const status = document.querySelector('#status');
  
        if (data.main.temp >= 75 && data.main.temp <= 95) {
          status.innerHTML = "Perfect Temperature!";
        } else if (data.main.temp < 75) {
          status.innerHTML = "Temperature is Too Cold";
        } else if (data.main.temp > 95) {
          status.innerHTML = "Temperature is Too Warm";
        }
  
        weather.innerHTML = data.main.temp + "˚F";
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
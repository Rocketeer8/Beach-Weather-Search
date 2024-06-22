const airQuality = (aqi) => {
    const quality = new Map([
      [1, 'Good'],
      [2, 'Fair'],
      [3, 'Moderate'],
      [4, 'Poor'],
      [5, 'Very Poor'],
    ]);
    return quality.get(aqi);
  }
  
  function airPollutionBasedOnCoordinates(lat, lon) {
    fetch(`https://beach-web-proxy.xyz:8443/air-pollution?lat=${lat}&lon=${lon}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch air pollution data from server');
        }
        return response.json();
      })
      .then(data => {
        const aq = document.querySelector("#airQuality");
        const aqi_value = data['list'][0]['main']['aqi'];
        aq.innerHTML = "Air Quality: " + airQuality(aqi_value);
      });
  }
  
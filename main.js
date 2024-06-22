document.getElementById('submitBtn').addEventListener('click', function() {
    initMap();
  });
  
  function initMap() {
    // Initialize the autocomplete functionality
    initAutocomplete();
  }
  
  // Converting address to latitude and longitude
  function geocode(location) {
    fetch(`https://beach-web-proxy.xyz:8443/geocode?location=${location}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from server');
        }
        return response.json();
      })
      .then(result => {
        const mapPlacementLat = result.results[0].geometry.location.lat;
        const mapPlacementLng = result.results[0].geometry.location.lng;
        mapSetup(mapPlacementLat, mapPlacementLng);
        weatherJSONCoordinates(mapPlacementLat, mapPlacementLng);
        airPollutionBasedOnCoordinates(mapPlacementLat, mapPlacementLng);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
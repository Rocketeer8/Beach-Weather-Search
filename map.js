function createMapAndDisplayElements() {
    // Remove existing map and display elements if they exist
    const existingMap = document.getElementById('map');
    if (existingMap) {
        existingMap.remove();
    }

    const existingDisplay = document.querySelector('.display');
    if (existingDisplay) {
        existingDisplay.remove();
    }

    // Create result-container if it doesn't exist
    let resultContainer = document.getElementById('result-container');
    if (!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.id = 'result-container';
        document.querySelector('.container').appendChild(resultContainer);
    }

    // Create and append the map element inside result-container
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    resultContainer.appendChild(mapDiv);

    // Create and append the display element inside result-container
    const displayDiv = document.createElement('div');
    displayDiv.className = 'display';
    displayDiv.innerHTML = `
        <p id="status"></p>
        <p id="weather"></p>
        <p id="airQuality"></p>
    `;
    resultContainer.appendChild(displayDiv);
}
  
  function mapSetup(latitude, longitude) {
    createMapAndDisplayElements();
    const myLatLng = { lat: latitude, lng: longitude };
    
    // Place Google map with the given lat and lng in the map DOM element
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: myLatLng,
    });
  
    // Place marker on the map
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  }
  
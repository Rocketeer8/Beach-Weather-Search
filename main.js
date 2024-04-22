const slideshowImages = document.querySelectorAll(".intro-slideshow img");

const nextImageDelay = 5000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  // slideshowImages[currentImageCounter].style.display = "none";
  slideshowImages[currentImageCounter].style.opacity = 0;

  currentImageCounter = (currentImageCounter+1) % slideshowImages.length;

  // slideshowImages[currentImageCounter].style.display = "block";
  slideshowImages[currentImageCounter].style.opacity = 1;
}

let mapPlacementLat= 42.3601 
let mapPlacementLng =-71.0598;
let address;
let dataPretty;

//MAP VIEWING (ongoing)
 function initMap(){
  //map options
  
  // let options_map= {
  //   zoom: 14,
  //   center:{lat: mapPlacementLat, lng: mapPlacementLng}
  // }
  // //new map 
  // let map = new google.maps.Map(document.getElementById('map'),options_map);

  //Adding a marker 
  // let marker = new google.maps.Map({
  //   position:{lat:42.4668,lng:-70.9695},
  //   map:map
  // });
  initAutocomplete();
}

// AUTOCOMPLETE FUNCTIONALITY
let autocomplete;

function initAutocomplete(){
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['establishment'],
      componentRestrictions: {'country':['CA','USA']},
      fields: ['place_id','name','geometry','adr_address']
    }
  )
  // add listen for when you click on a location in the autocomplete box
  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceClick)

  // I think this one fire after autocomplete object finish loading
  autocomplete.addListener('place_changed', console.log("Autocomplete listener activated (testing)"));  
}
// this line adds a listener to the window object, which as soon as the load event is triggered
//(i.e. "the page has finished loading") executes the function initialize. 
// I.e. it delays the Google Map related script until the page has finished loading.
window.addEventListener('load', initAutocomplete)


function onPlaceClick(){
  // Get details of the place selected from the autocomplete object.
  let place = autocomplete.getPlace()
  
  if(!place.geometry){
    // No prediction was selected
    document.getElementById('autocomplete').placeholder = "Search";
  } else {
    //Show details of the valid place
    document.getElementById('details').innerHTML = place.adr_address;
    address = place.adr_address;
    geocode(address)
  }
}

// converting address to latitude and longitude
function geocode(location) {
  // let location = ' 22 Main st Bostan MA';
  
  fetch(`https://beach-web-proxy.xyz:8443/geocode?location=${location}`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch data from server');
    }
    return response.json();
  })
  .then(result => {
    // Accessing the JSON content directly from the response
    console.log(result);
    const mapPlacementLat = result.results[0].geometry.location.lat;
    const mapPlacementLng = result.results[0].geometry.location.lng;
    console.log("Latitude: " + mapPlacementLat + " Longitude: " + mapPlacementLng);
    mapSetup(mapPlacementLat, mapPlacementLng);
    weatherJSONCoordinates(mapPlacementLat, mapPlacementLng);
    airPollutionBasedOnCoordinates(mapPlacementLat, mapPlacementLng);
  })
  .catch(error => {
    console.error('Error:', error);
  });

}

function mapSetup (latitude, longitude) {
    const myLatLng = { lat: latitude, lng: longitude};
    // place google map with the given lat and lng in the map Dom element
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 14,
      center: myLatLng,
    });
    // place marker on the map
    new google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
}


function weatherJSONCoordinates(lat, lon) {
  fetch(`https://beach-web-proxy.xyz:8443/weather?lat=${lat}&lon=${lon}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch weather data from server');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const weather = document.querySelector("#weather");
      const status = document.querySelector('#status');

      // Define what a good or a bad day is in terms of weather
      if (data.main.temp >= 75 && data.main.temp <= 95) {
        status.innerHTML = "Perfect Temperature!";
      } else if (data.main.temp < 75) {
        status.innerHTML = "Temperature is Too Cold";
      } else if (data.main.temp > 95) {
        status.innerHTML = "Temperature is Too Warm";
      }
      
      console.log(data.main.temp);
      weather.innerHTML = data.main.temp + "˚F";
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

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
      console.log(data);
      const aq = document.querySelector("#airQuality");
      aqi_value = data['list'][0]['main']['aqi'];
      aq.innerHTML = "Air Qulity: " + airQuality(aqi_value);
    });
}

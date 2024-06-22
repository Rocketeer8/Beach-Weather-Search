let autocomplete;

function initAutocomplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
      types: ['establishment'],
      componentRestrictions: { 'country': ['CA', 'USA'] },
      fields: ['place_id', 'name', 'geometry', 'adr_address']
    }
  );

  // Add a listener for when a location is selected in the autocomplete box
  google.maps.event.addListener(autocomplete, 'place_changed', onPlaceClick);
  // Log a message when the autocomplete object finishes loading
  autocomplete.addListener('place_changed', console.log("Autocomplete listener activated (testing)"));
}

function onPlaceClick() {
// Get details of the place selected from the autocomplete object
  let place = autocomplete.getPlace();

  if (!place.geometry) { // No prediction was selected
    document.getElementById('autocomplete').placeholder = "Search";
  } else { // Show details of the valid place
    document.getElementById('result-address').innerHTML = place.adr_address;
    address = place.adr_address;
    geocode(address);
  }
}

window.addEventListener('load', initAutocomplete);

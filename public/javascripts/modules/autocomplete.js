
// autocompletes the address from google maps API, and updates the lng, lat accordingly
function autocomplete(input, latInput, lngInput) {
    
    // if the user didn't enter an address don't run the autocomplete
    if (!input) return; 

    // autocomplete the address
    const address = new google.maps.places.Autocomplete(input);

    // update the lat, lng when the address changes
    address.addListener("place_changed", () => {
        const loc = address.getPlace();
        
        latInput.value = loc.geometry.location.lat();
        lngInput.value = loc.geometry.location.lng();
    });

}

export default autocomplete;
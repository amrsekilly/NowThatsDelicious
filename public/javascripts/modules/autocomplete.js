
// autocompletes the address from google maps API, and updates the lng, lat accordingly
function autocomplete(input, latInput, longInput) {
    
    // if the user didn't enter an address don't run the autocomplete
    if (!input) return; 

    // autocomplete the address
    const address = new google.maps.places.Autocomplete(input);

}

export default autocomplete;
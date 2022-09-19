import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const Form = () => {
  const [gmapsLoaded, setGmapsLoaded] = useState(false)
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [nickName, setNickName] = useState("")

  const [newListing, setNewListing] = useState({
    nickname: "",
    lat: 0,
    lng: 0,
  });
  const [listings, setListings] = useState([]);

useEffect(() => {
  setNewListing({nickname: nickName, lat: coordinates.lat, lng: coordinates.lng})
  console.log(coordinates);
}, [coordinates])

useEffect(() => {
  // setListings([])
  console.log(newListing);
}, [newListing])

useEffect(() => {
  if(!document.getElementById("gmapScript")){
    window.initMap = () => setGmapsLoaded(true)
    const gmapScript = document.createElement("script")
    gmapScript.setAttribute("id", "gmapScript")
    gmapScript.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCOWBSRAcv39PP5qELdUjpj6iFqEtDIgc&libraries=places&callback=initMap"
    document.querySelector("body").insertAdjacentElement("beforeend", gmapScript)
  } 
},[])

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    setAddress("");
  };

  return (

    <div>
      

      <form >

      <input
          type="text"
          id="name"
          name="nickName"
          placeholder="Your nickname..."
          value={nickName}
          onChange={(e) => setNickName(e.target.value)}
        />

        {gmapsLoaded && (<PlacesAutocomplete
          value={address}
          onChange={setAddress}
          onSelect={handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>)}
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  );
};

export default Form;

import React, { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

const Form = (props) => {
  const [gmapsLoaded, setGmapsLoaded] = useState(false);

  // CONTROLLED INPUT
  const [address, setAddress] = useState("");

  // INPUT DATA
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [nickName, setNickName] = useState("");
  const [data, setData] = useState({});
  
  // SET NEW LISTING 
  const [newListing, setNewListing] = useState({
    nickname: "",
    lat: 0,
    lng: 0,
    data: {}
  });
  // const [listings, setListings] = useState([]);
  
  useEffect(() => {
    setNewListing({
      nickname: nickName,
      lat: coordinates.lat,
      lng: coordinates.lng,
      data: data
    });
    console.log(coordinates);
  }, [data]);

  useEffect(() => {
    console.log(newListing);
    nickName && coordinates.lat && coordinates.lng && props.setListings([...props.listings, newListing])
    setNickName('')
  }, [newListing]);
  
  // useEffect(() => {
  //   console.log(listings);
  // }, [listings])

  useEffect(() => {
    if (!document.getElementById("gmapScript")) {
      window.initMap = () => setGmapsLoaded(true);
      const gmapScript = document.createElement("script");
      gmapScript.setAttribute("id", "gmapScript");
      gmapScript.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyCCOWBSRAcv39PP5qELdUjpj6iFqEtDIgc&libraries=places&callback=initMap";
      document
        .querySelector("body")
        .insertAdjacentElement("beforeend", gmapScript);
    }
  }, []);

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latlng);
    setAddress("");
    const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latlng.lat}&lon=${latlng.lng}&appid=7f710f4ac49c5d9196540b2aca98f9ca`)
    const data = await response.json()
    console.log(data.list[0].components)
    setData(data.list[0].components)
  };

  return (
    <form>
      <input
        type="text"
        id="name"
        name="nickName"
        placeholder="Your nickname..."
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
      />

      {gmapsLoaded && (
        <PlacesAutocomplete
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
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer", color: "blue" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      key={index}
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
        </PlacesAutocomplete>
      )}
    </form>
  );
};

export default Form;

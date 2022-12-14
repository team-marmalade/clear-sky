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
  const [aqi, setAqi] = useState(0);
  const [data, setData] = useState({});

  // SET NEW LISTING 
  const [newListing, setNewListing] = useState({
    nickname: "",
    lat: 0,
    lng: 0,
    aqi: 0,
    data: {},
  });
  // const [listings, setListings] = useState([]);

  useEffect(() => {
    setNewListing({
      nickname: nickName,
      lat: coordinates.lat,
      lng: coordinates.lng,
      aqi: aqi,
      data: data,
    });
    console.log(coordinates);
  }, [data]);

  useEffect(() => {
    console.log(newListing);
    if (nickName && coordinates.lat && coordinates.lng) {
      props.setListings([...props.listings, newListing])
      const list = localStorage.getItem("listings") ? JSON.parse(localStorage.getItem("listings")) : [];
      const newList = JSON.stringify([...list, newListing])
      localStorage.setItem('listings', newList)
      setNickName('')
    }
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
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&libraries=places&callback=initMap`;
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
    const response = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${latlng.lat}&lon=${latlng.lng}&appid=${process.env.REACT_APP_OPENWEATHER_KEY}`)
    const data = await response.json()
    console.log(data.list[0].components)
    console.log("whole list")
    console.log(data.list)
    setAqi(data.list[0].main.aqi)
    setData(data.list[0].components)
  };

  return (
    <form>
      <input
        type="text"
        id="name"
        name="nickName"
        placeholder="Label (e.g.Home) ..."
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
            <div className="google-input-div">
              <input
                {...getInputProps({
                  placeholder: "Search Locations ...",
                  className: "location-search-input",
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div class="spinner-wrapper">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>}
                {(suggestions.length > 1) && <span>Select a location:</span>}
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

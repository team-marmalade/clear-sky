import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Details from "./Details";
import Footer from "./Footer";
import ClearButton from "./ClearButton";

function App() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    localStorage.getItem("listings") &&
      setListings(JSON.parse(localStorage.getItem("listings")));
  }, []);

  const clearListings = () => {
    localStorage.clear();
    setListings([]);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Form setListings={setListings} listings={listings} />
        {listings.map((listing, index) => (
          <Details
            key={index}
            nickname={listing.nickname}
            aqi={listing.aqi}
            data={listing.data}
            index={index}
            setListings={setListings}
            listings={listings}
          />
        ))}
       {listings.length > 0 && <ClearButton clearListings={clearListings} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

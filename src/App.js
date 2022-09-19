import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Details from "./Details";
import Footer from "./Footer";

function App() {
  const [listings, setListings] = useState([]);
  
  useEffect(() => {
    localStorage.getItem('listings') && setListings(JSON.parse(localStorage.getItem('listings')))
  }, [])

  return (
    <div className="App">
      <Header />
      <main>
        <Form setListings={setListings} listings={listings}/>
        {listings.map((listing, index) => <Details key={index} index={index} listings={listings} setListings={setListings} nickname={listing.nickname} aqi={listing.aqi} data={listing.data}/>)}
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React, {useState} from "react";
import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Details from "./Details";
import Footer from "./Footer";

function App() {
  const [listings, setListings] = useState([]);

  return (
    <div className="App">
      <Header />
      <main>
        <Form setListings={setListings} listings={listings}/>
        {listings.map((item) => <Details nickname={item.nickname}/>)}
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import Header from "./Header";
import Form from "./Form";
import Details from "./Details";
import Footer from "./Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Form />
        <Details />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import React from "react";

const Form = () => {
  return (
      <form >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your nickname..."
        />
        <input
          type="text"
          id="location"
          name="location"
          placeholder="Location..."
        />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
  );
};

export default Form;

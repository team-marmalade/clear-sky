import React from "react";

const Details = ({nickname, data}) => {
  return (
      <details >
        <summary>{nickname}</summary>
        <p>
          {data.co}
        </p>
      </details>
  );
};

export default Details;

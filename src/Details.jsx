import React from "react";

const Details = ({nickname}) => {
  return (
      <details >
        <summary>{nickname}</summary>
        <p>Something small enough to escape casual notice.
        Something small enough to escape casual notice.
        Something small enough to escape casual notice.
        </p>
      </details>
  );
};

export default Details;

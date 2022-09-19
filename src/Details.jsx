import React, { useEffect } from "react";

const Details = ({nickname, data, aqi}) => {
  let lightColor = ""

  if (aqi < 3)
    lightColor = 'green-light'
  else if (aqi < 5){
    lightColor = 'yellow-light'
  } else {
    lightColor = 'red-light'
  }

  return (
      <details className={lightColor}>
        <summary>{nickname}</summary>
        <div>
          <table>
            <tbody>
              <tr>
                <td><span>CO</span></td>
                <td><span>{data.co}</span></td>
                <td><span>NH3</span></td>
                <td><span>{data.nh3}</span></td>
              </tr>
              <tr>
                <td><span>NO</span></td>
                <td><span>{data.no}</span></td>
                <td><span>NO2</span></td>
                <td><span>{data.no2}</span></td>
              </tr>
              <tr>
                <td><span>O3</span></td>
                <td><span>{data.o3}</span></td>
                <td><span>PM2.5</span></td>
                <td><span>{data.pm2_5}</span></td>
              </tr>
              <tr>
                <td><span>PM10</span></td>
                <td><span>{data.pm10}</span></td>
                <td><span>PM10</span></td>
                <td><span>{data.so2}</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </details>
  );
};

export default Details;

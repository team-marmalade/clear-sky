import React, { useEffect } from "react";

const Details = ({nickname, data, aqi, setListings, listings, index}) => {
  let lightColor = ""
  let message = "No change needed to your normal outdoor activities."
  let face = ''
  let advice = ''
  let air = ''
  let activity = ''

  useEffect(() => {

  })

  if (aqi < 3) {
    lightColor = 'green-light';
    message = 'No change needed to your normal outdoor activities.';
    face ='happy'
    advice ='outdoors'
    activity = 'active'
  } else if (aqi < 5){
    lightColor = 'yellow-light';
    message = 'Reduce outdoor physical activity if you develop symptoms like cough or shortness of breath. Consider closing windows and doors until outdoor air quality is better.';
    face = 'neutral'
    advice = 'outdoors'
    activity = 'sit'
  } else {
    lightColor = 'red-light';
    message = 'Stay indoors as much as possible with windows and doors closed until outdoor air quality is better.';
    face = 'sad'
    advice = 'indoors'
    activity = 'mask'
  }

  const handleDelete = () => {
    listings.splice(index, 1);
    const newList = JSON.stringify(listings)
    localStorage.setItem('listings', newList)
    localStorage.getItem('listings') && setListings(JSON.parse(localStorage.getItem('listings')))
  }

  return (
      <details className={lightColor}>
        <summary>
          {nickname}
          <div class="icons-wrap">
            <div className={`details-icon face ${face}`}></div>
            <div className={`details-icon advice ${advice}`}></div>
            <div className={`details-icon activity ${activity}`}></div>
          </div>
        </summary>
        <div className="detailsContent">
          <table>
            <tbody>
              <tr>
                <td className="row-label"><span>CO</span></td>
                <td className="row-data"><span>{data.co}</span></td>
                <td className="row-label"><span>NH3</span></td>
                <td className="row-data"><span>{data.nh3}</span></td>
              </tr>
              <tr>
                <td className="row-label"><span>NO</span></td>
                <td className="row-data"><span>{data.no}</span></td>
                <td className="row-label"><span>NO2</span></td>
                <td className="row-data"><span>{data.no2}</span></td>
              </tr>
              <tr>
                <td className="row-label"><span>O3</span></td>
                <td className="row-data"><span>{data.o3}</span></td>
                <td className="row-label"><span>PM2.5</span></td>
                <td className="row-data"><span>{data.pm2_5}</span></td>
              </tr>
              <tr>
                <td className="row-label"><span>PM10</span></td>
                <td className="row-data"><span>{data.pm10}</span></td>
                <td className="row-label"><span>PM10</span></td>
                <td className="row-data"><span>{data.so2}</span></td>
              </tr>
            </tbody>
          </table>
          <a target="blank" className="details-link" href="https://en.wikipedia.org/wiki/Air_quality_index#CAQI">What does this mean?</a>
          <p>{message}</p>
          <button onClick={handleDelete} className="delete-button"></button>
        </div>
      </details>
  );
};

export default Details;

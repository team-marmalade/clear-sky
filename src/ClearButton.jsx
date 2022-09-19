import React from 'react'

function ClearButton(props) {
  return (
    <div className='clear-button-div'>
        <button className='clear-button' onClick={props.clearListings}>Clear</button>
    </div>
  )
}

export default ClearButton
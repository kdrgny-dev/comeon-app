import React from 'react'

function Search({ setSearchText }) {
  return (
    <input
      type="text"
      onChange={(event) => setSearchText(event.target.value)}
      placeholder='Search Game'
      className='form-control float-start float-lg-end mt-3 mt-lg-0'
    />
  )
}

export default Search
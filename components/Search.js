import React from 'react'

function Search({ setSearchText }) {
  return (
    <input type="text" onChange={(event) => setSearchText(event.target.value)} placeholder='Search Game' className='form-control w-50 float-end' />
  )
}

export default Search
import React from 'react'
import Profile from './Profile'
import Search from './Search'

function Header({ player, handleLogOut, setSearchText}) {
  return (
    <header className='header row'>
      <div className="col">
        <Profile player={player} handleLogOut={handleLogOut} />
      </div>
      <div className="col">
        <Search setSearchText={setSearchText} />
      </div>
    </header>
  )
}

export default Header
import React from 'react'
import Profile from './Profile'
import Search from './Search'

function Header({ player, handleLogOut, setSearchText}) {
  return (
    <header className='header row'>
      <div className="col-12 header-logo mb-3">
        <img src="/logo.svg" alt="We Are ComeOn" />
      </div>
      <div className="col-md-6 col-sm-12">
        <Profile player={player} handleLogOut={handleLogOut} />
      </div>
      <div className="col-md-6 col-sm-12">
        <Search setSearchText={setSearchText} />
      </div>
    </header>
  )
}

export default Header
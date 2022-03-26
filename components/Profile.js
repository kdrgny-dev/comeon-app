import PropTypes from 'prop-types'
import Button from './Button'

function Profile({ player, handleLogOut }) {
  return (
    <>
      <div className="profile">
        <div className="profile-container d-flex">
          <div className="profile-avatar me-2">
            <img src={`/${player.avatar}`} alt={player.name} className='img-fluid rounded-circle' />
          </div>
          <div className="profile-info">
            <h4 className=''>{player.name}</h4>
            <p>{player.event}</p>
          </div>
        </div>
        <Button onClick={handleLogOut} className='global-btn'>Log Out</Button>
      </div>
    </>
  )
}

Profile.propTypes = {
  player: PropTypes.object,
  handleLogOut: PropTypes.func
}

export default Profile
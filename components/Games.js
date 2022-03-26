import Link from 'next/link'
import PropTypes from 'prop-types'

function Games({ games }) {
  return (
    <div className='games'>
      {
        games.map((game, index) => (
          <div className="card flex-lg-row flex-sm-column p-3 mb-3 align-items-center" key={index}>
            <img src={game.icon} alt={game.name} width='200' height='200' className='shadow-drop-bottom rounded-circle' />
            <div className="card-body">
              <h2 className="card-title">{game.name}</h2>
              <p className="card-text">{game.description}</p>
              <div className="d-flex justify-content-lg-end">
                <Link href={`/game/${game.code}`}>
                  <a className='global-btn'>PLAY</a>
                </Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

Games.propTypes = {
  games: PropTypes.array.isRequired
}

export default Games
import Link from 'next/link'
import React from 'react'
import Button from './Button'

function Games({ games }) {
  return (
    <>
      {
        games.map((game, index) => (
          <div className="card flex-lg-row flex-sm-column p-3 mb-3" key={index}>
            <img src={game.icon} alt={game.name} width='200' height='200' />
            <div className="card-body py-0 px-0 px-lg-3 py-sm-3">
              <h2 className="card-title">{game.name}</h2>
              <p className="card-text">{game.description}</p>
              <div className="d-flex justify-content-lg-end">
                <Link href={`/game/${game.code}`}>
                  <Button className='global-btn'>PLAY</Button>
                </Link>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Games
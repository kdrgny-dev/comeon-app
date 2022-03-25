import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function Game({games}) {
  const router = useRouter()
  const [game, setGame] = useState(false)
  const [notLoggedIn, setNotLoggedIn] = useState(false)
  useEffect(() => { 
    const selectedGame = games.find(item => item.code === router.query.id)
    setGame(selectedGame)
    const player = localStorage.getItem('player')
      if (player) {
        if (router.query.id) {
          comeon.game.launch(router.query.id)
        }
      } else {
        setNotLoggedIn(true)
      }
  }, [])
  return (
    <div className='container'>
      <div className="row bg-white">
        <div className="col-12">
          <h1>Game {game?.name}</h1>
        </div>
        <div className="col-12">
          {notLoggedIn ? 
            <div className='alert alert-danger my-5'>You need to <Link href='/'>login</Link> to play this game</div>
           : <div id="game-launch"></div>}
        </div>
        <div className="col-12">
          <p>{game?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Game

export async function getServerSideProps() {
  const [gamesRes] = await Promise.all([
    fetch(`http://localhost:3001/games`, { method: 'get' }),
  ]);
  const [games] = await Promise.all([
    gamesRes.json(),
  ]);
  return { props: { games } };
}
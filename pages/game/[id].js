import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'

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
    <div className='detail vh-100 d-flex align-items-center'>
      <Head>
        <title>comeon group - we are ComeOn</title>
        <meta name="description" content="comeon group javascript case" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className='container scale-up-center'>
        <div className="row bg-white rounded">
          <div className="col-12 py-3 text-center">
            <h1>Game {game?.name}</h1>
          </div>
          <div className="col-12">
            {notLoggedIn ?
              <div className='alert alert-danger my-5'>You need to <Link href='/'><a>login </a></Link> to play this game</div>
              : <div id="game-launch"></div>}
          </div>
          <div className="col-12 my-3">
            <p>{game?.description}</p>
            <Link href='/'>
              <a className='global-btn'>Back to games</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game

export async function getStaticPaths() {
  const response = await fetch('http://localhost:3001/games')
  const games = await response.json()
  const paths = games.map(game => `/game/${game.code}`)
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps() {
  const [gamesRes] = await Promise.all([
    fetch(`http://localhost:3001/games`, { method: 'get' }),
  ]);
  const [games] = await Promise.all([
    gamesRes.json(),
  ]);
  return { props: { games } };
}
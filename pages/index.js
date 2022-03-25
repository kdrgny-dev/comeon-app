import { useState, useEffect } from 'react';
import Head from 'next/head'
import Script from 'next/script';
import Login from '../components/Login';
import Header from '../components/Header';
import Games from '../components/Games';
import Categories from '../components/Categories';

export default function Home({ games, categories }) {

  const [login, setLogin] = useState(false)
  const [player, setPlayer] = useState({})
  const [filteredGames, setFilteredGames] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [isSubmit, setIsSubmit] = useState(false)
  const [errorText, setErrorText] = useState(false)

  const getLocalStorageData = () => {
    const loginValue = localStorage.getItem('login') === "true"
    const player = JSON.parse(localStorage.getItem('player'))
    if (loginValue) {
      setLogin(loginValue)
      setPlayer(player)
    }
  }

  useEffect(() => {
    getLocalStorageData()
  }, [login])


  useEffect(() => {
    filterData(searchText, selectedCategory)
  }, [searchText, selectedCategory])

  const filterData = (searchValue, categoryValue) => {
    let filteredData = games.filter(game => game.name.toLowerCase().includes(searchValue.toLowerCase()))
    filteredData = filteredData.filter(game => game.categoryIds.includes(categoryValue))
    setFilteredGames(filteredData)
  }


  async function handleLogin(event) {
    setIsSubmit(true)
    const formData = new FormData(event.currentTarget);
    event.preventDefault();

    const response = await fetch('http://localhost:3001/login', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: formData.get('username'),
        password: formData.get('password'),
      }),
    }
    );


    const { player, error } = await response.json();

    if (player) {
      setLogin(true)
      setPlayer(player)
      localStorage.setItem('login', true)
      localStorage.setItem('player', JSON.stringify(player))
      setErrorText(false)
      setIsSubmit(false)
    } else {
      setErrorText(error)
    }
  }

  async function handleLogOut() {
    const response = await fetch('http://localhost:3001/logout', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: player.username,
      })
    }
    );
    const res = await response.json();

    if (res.status === 'success') {
      localStorage.setItem('login', false);
      localStorage.removeItem('player');
      setLogin(false)
    }
  }

  return (
    <div>
      <Head>
        <title>comeon group - we are ComeOn</title>
        <meta name="description" content="comeon group javascript case" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script type="text/javascript" src="/lib/comeon.game-1.0.min.js"></Script>

      {login && (
        <main>
          <div className="wrapper pb-5">
            <div className="container">
              <div className="row">
                <div className="col">
                  <img src="/logo.svg" alt="We Are ComeOn" />
                </div>
              </div>
              <Header player={player} handleLogOut={handleLogOut} setSearchText={setSearchText} />
              <div className="row bg-white">
                <div className="col-md-9 col-sm-12 order-1 order-lg-0">
                  <h2 className='pb-2 border-bottom'>Games</h2>
                  <Games games={filteredGames} />
                </div>
                <div className="col-md-3 col-sm-12">
                  <h2 className='pb-2 border-bottom'>Categories</h2>
                  <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {!login && (
        <div className="wrapper vh-100">
          <div className='container'>
            <div className="row">
              <div className="col align-items-center justify-content-center">
                <Login handleLogin={handleLogin} errorText={errorText} isSubmit={isSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const [gamesRes, categoriesRes] = await Promise.all([
    fetch(`http://localhost:3001/games`, { method: 'get' }),
    fetch(`http://localhost:3001/categories`, { method: 'get' })
  ]);
  const [games, categories] = await Promise.all([
    gamesRes.json(),
    categoriesRes.json()
  ]);
  return { props: { games, categories } };
}

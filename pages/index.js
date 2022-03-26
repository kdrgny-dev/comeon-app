import { useState, useEffect } from 'react';
import Head from 'next/head'
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

    const response = await fetch('https://json-server-comeon.herokuapp.com/login', {
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
    const response = await fetch('https://json-server-comeon.herokuapp.com/logout', {
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
      

      {login && (
        <main>
          <div className="container pb-5">
            <Header player={player} handleLogOut={handleLogOut} setSearchText={setSearchText} />
            <div className="row bg-white">
              <div className="col-md-9 col-sm-12 order-1 order-lg-0 order-md-0 mt-3 mt-lg-0">
                <h3 className='pb-2 border-bottom'>Games</h3>
                {filteredGames.length > 0 ? <Games games={filteredGames} /> : <h3 className='text-center mt-5'>No games found</h3>}
              </div>
              <div className="col-md-3 col-sm-12 mt-3 mt-lg-0">
                <h3 className='pb-2 border-bottom'>Categories</h3>
                <Categories categories={categories} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
              </div>
            </div>
          </div>
        </main>
      )}

      {!login && (
        <div className="vh-100 d-flex align-items-center">
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

export async function getStaticProps() {
  const [gamesRes, categoriesRes] = await Promise.all([
    fetch(`https://my-json-server.typicode.com/kdrgny-dev/json-server-github/games`, { method: 'get' }),
    fetch(`https://my-json-server.typicode.com/kdrgny-dev/json-server-github/categories`, { method: 'get' })
  ]);
  const [games, categories] = await Promise.all([
    gamesRes.json(),
    categoriesRes.json()
  ]);
  return { props: { games, categories } };
}

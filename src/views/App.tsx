import { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'wouter'
import styles from './App.module.css'
import FleactRouter from './FleactRouter'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App({ name = '' }) {
  const [loggedUser, setLoggedUser] = useState({
    isLogged: false,
    email: null
  })

  const [flightVersion, setFlightVersion] = useState('')
  const [reactVersion, setReactVersion] = useState('')

  useEffect(() => {
    fetch('./api/versions')
      .then(response => response.json())
      .then(body => {
        setFlightVersion(body[0])
        setReactVersion(body[1])
      })
  }, [])

  useEffect(() => {
    fetch('./api/auth')
      .then(response => response.json())
      .then(body => {
        setLoggedUser(body)
      })
  }, [])

  return (
    <FleactRouter>
      <main className={styles.main}>
        <img className={styles.logo} src='./favicon.svg' alt="React logo" />
        <h1 className={styles.h1}>Hello {name}!</h1>
        <nav>
          <Link to='/'> Home </Link>
          <Link to='/about'> About </Link>
          {loggedUser.isLogged ? (
            <a href='./logout'> Logout</a>
          ) : (
            <Link to='/login'> Login</Link>
          )}
        </nav>
        <div>
          <Route path='/'>
            <Home loggedUser={loggedUser} />
          </Route>
          <Route path='/about'>
            <About flightVersion={flightVersion} reactVersion={reactVersion} />
          </Route>
          <Route component={Login} path='/login' />
        </div>
      </main>
    </FleactRouter>
  )
}

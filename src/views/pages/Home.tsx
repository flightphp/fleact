export default function Home({ loggedUser = { isLogged: false, email: null } }) {
  return (
    <>
      {loggedUser.isLogged && <h2>Welcome {loggedUser.email}</h2>}

      <p>
        Visit the <a href='https://docs.flightphp.com'> FlightPHP tutorial </a>
        to learn how to build FlightPHP APIs.
      </p>

      <p>
        Visit the <a href='https://react.dev/learn'> React docs </a> to learn how to build
        React apps.
      </p>
    </>
  )
}

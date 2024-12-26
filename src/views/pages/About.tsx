export default function About({ flightVersion = '', reactVersion = '' }) {
  return (
    <p>
      Powered by
      <a href='https://docs.flightphp.com'> Flight {flightVersion} </a> +
      <a href='https://react.dev'> React {reactVersion} </a>
    </p>
  )
}

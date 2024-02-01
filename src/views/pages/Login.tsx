export default function Login() {
  return (
    <form method='post'>
      <h2>Login</h2>
      <input type='email' name='email' defaultValue='example@mail.com' />
      <input type='password' name='password' defaultValue='12345678' />
      <button>Login</button>
    </form>
  )
}

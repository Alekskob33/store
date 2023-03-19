import styles from './login.module.sass';
import {useState} from 'react';

export default function Login() {
  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [token, setToken] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    .then((res) => {
      // console.log("🚀 ~ res:", res)
      return res.json()
      })
      .then((json) => setToken(json.token))
      .catch((error) => console.error('Error:', error));
  }

  return (
    <>
      <form 
        className={styles.formLogin}
        onSubmit={handleSubmit}
      >
        <input type="text" placeholder="username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input type="password" placeholder="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
      {token && <p>Token: {token}</p>}
    </>
  )
}
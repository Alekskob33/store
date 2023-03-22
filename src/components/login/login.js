import Link from 'next/link';
import {useRouter} from 'next/router';

import s from './login.module.sass';

import {useState, useContext} from 'react';
import authContext from '../../context/authContext';

export default function Login() {
  const {token, setToken} = useContext(authContext);
  const router = useRouter();
  console.log(token);

  const [username, setUsername] = useState('mor_2314');
  const [password, setPassword] = useState('83r5^_');
  const [visiblePassword, setVisiblePassword] = useState(false);

  const [status, setStatus] = useState('default'); // 'sending', 'error'
  const [errMsg, setErrMsg] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setStatus('sending');
    logIn();
  }

  function logIn() {
    const endPoint = 'https://fakestoreapi.com/auth/login';
    const data = {
      body: JSON.stringify({username, password}),
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };

    fetch(endPoint, data)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        return res.json();
      })
      .then(json => {
        setToken(json.token);
        console.log('got token successfully');
        router.push('/products');
      })
      .catch(err => {
        setStatus('error');
        setErrMsg('Error with status code: ' + err.message);
      });
    }
    
    return (
    <>
      <form className={s.formLogin}
        onSubmit={handleSubmit}
      >
        <fieldset
          className={status === 'error' ? s.error_fields : s.fields}
          disabled={status === 'sending'} 
        >
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username" 
            required
            />
          <label className={s.password_label}>
            <input 
              type={visiblePassword ? 'text' : 'password'} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              />
            <i 
              onClick={() => setVisiblePassword(!visiblePassword)}
              className={visiblePassword ? s.eye: s.eye_hidden}
            ></i>
          </label>
        </fieldset>

        {status === 'sending' 
          ? <button disabled>sending ...</button>
          : <button>Submit</button>
        }
        {status === 'error' && <p className={s.err_msg}>{errMsg}</p>}
      </form>
      {token && <p>Token: {token}</p>}
      <br/>
      <Link href="/">back to Home</Link>
    </>
  )
}
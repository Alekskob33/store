import '@/styles/globals.css'
import {useState, useContext} from 'react';
import authContext from '../context/authContext';

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState('s');

  return (
    <authContext.Provider value={{token, setToken}}>
      <Component {...pageProps} />
    </authContext.Provider>
  )
}

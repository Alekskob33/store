import '@/styles/globals.css'
import {useState, useContext} from 'react';
import authContext from '../context/authContext';
import TopBar from '../components/topBar/topBar'

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(false);

  return (
    <authContext.Provider value={{token, setToken}}>
      <TopBar/>
      <Component {...pageProps} />
    </authContext.Provider>
  )
}

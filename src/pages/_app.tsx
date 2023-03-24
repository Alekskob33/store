import '@/styles/globals.css';
import { useState } from 'react';
import authContext from '../context/authContext';
import TopBar from '../components/topBar/topBar';

interface AppProps {
  Component: React.ElementType;
  pageProps: Record<string, unknown>;
}

interface AuthContextValue {
  token: boolean | string;
  setToken: (token: boolean | string) => void;
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [token, setToken] = useState<boolean>(false);

  return (
    // @ts-ignore
    <authContext.Provider value={{ token, setToken } as AuthContextValue}>
      <TopBar />
      <Component {...pageProps} />
    </authContext.Provider>
  );
}

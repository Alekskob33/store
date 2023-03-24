import React, { createContext, FC } from 'react';

interface AuthContextProps {
  token: string;
  setToken: (token: string) => void;
}

const authContext = createContext<AuthContextProps>({
  token: '',
  setToken: () => {},
});

export default authContext;

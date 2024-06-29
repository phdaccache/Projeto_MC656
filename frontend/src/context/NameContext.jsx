import React, { createContext, useState, useContext } from 'react';

const NameContext = createContext();

export const NameProvider = ({ children }) => {
  const [name, setName] = useState('');

  return (
    <NameContext.Provider value={{ name, setName }}>
      {children}
    </NameContext.Provider>
  );
};

export const useName = () => {
  return useContext(NameContext);
};
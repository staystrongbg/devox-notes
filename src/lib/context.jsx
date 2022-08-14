import React, { useState, useContext, useReducer, useEffect } from 'react';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const alertFn = () => {
    alert('Hellow from ContextAPI!');
  };

  return (
    <AppContext.Provider
      value={{
        alertFn,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

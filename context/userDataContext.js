"use client";

import { createContext, useContext, useState } from "react";

const UserDataContext = createContext(null);

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import Settings from './settings.json'

export const UserProgressContext = createContext({
  userProgress: undefined,
  setUserProgress: async (userProgress) => null
})

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(Settings.emptyUser)

  return <UserProgressContext.Provider value={{userProgress, setUserProgress}}>{children}</UserProgressContext.Provider>
}
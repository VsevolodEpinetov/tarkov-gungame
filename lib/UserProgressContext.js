import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import Settings from './settings.json'

export const UserProgressContext = createContext({
  userProgress: undefined,
  setUserProgress: async (userProgress) => null
})

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(Settings.emptyUser)
  const [initPassed, setInitPassed] = useState(false)

  useEffect(() => {
    for (const [key, value] of Object.entries(Settings.emptyUser)) {
      if (!checkCookies(key)) {
        setCookies(key, JSON.stringify(value))
      } else {
        const rawCookies = getCookies(key);
        setUserProgress({
          ...userProgress,
          [key]: JSON.parse(decodeURIComponent(rawCookies[key]))
        })
      }
    }

    setInitPassed(true);
  }, [])

  useEffect(() => {
    if (initPassed) {
      for (const [key, value] of Object.entries(userProgress)) {
        setCookies(key, JSON.stringify(value))
      }
    }
  }, [userProgress])

  return <UserProgressContext.Provider value={{ userProgress, setUserProgress }}>{children}</UserProgressContext.Provider>
}
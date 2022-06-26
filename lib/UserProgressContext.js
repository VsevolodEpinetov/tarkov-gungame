import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookies, getCookie, checkCookies, removeCookies } from 'cookies-next';
import Settings from './settings.json'
import gunsData from "../public/data/guns.json"

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
        let copy = value;
        // Create object of empty level by parsing initial level
        let emptyLevel = {};
        Object.keys(copy.progress[0]).forEach(key => {
          emptyLevel[key] = [];
        })

        // For every level from settings (except 0) add a level
        gunsData[key].levels.slice(1).forEach(e => {
          copy.progress.push(emptyLevel);
        });
        setCookies(key, JSON.stringify(copy))
      } else {
        const rawCookies = getCookie(key);
        setUserProgress({
          ...userProgress,
          [key]: JSON.parse(decodeURIComponent(rawCookies))
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
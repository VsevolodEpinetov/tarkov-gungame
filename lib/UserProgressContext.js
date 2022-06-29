import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookies, getCookies, getCookie, checkCookies, removeCookies } from 'cookies-next';
import Settings from './settings.json'
import rawGunsSettings from "../public/data/guns.json"

export const UserProgressContext = createContext({
  userProgress: undefined,
  setUserProgress: async (userProgress) => null
})

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const emptyGunProgress = {
    points: {
      forPMCsKills: 0,
      forScavsKills: 0,
      forSurviving: 0
    },
    progress: []
  };
  const gunsSettings = rawGunsSettings;

  let emptyUser = {};

  for (const key in Settings.firstLevels) {
    emptyUser[key] = {
      ...emptyGunProgress,
      progress: [
        Settings.firstLevels[key]
      ]
    }

    let emptyLevel = {};
    Object.keys(Settings.firstLevels[key]).forEach((partName) => {
      emptyLevel[partName] = [];
    })

    gunsSettings[key].levels.forEach((lvlData, lvl) => {
      if (lvl > 0) emptyUser[key].progress.push(emptyLevel)
    })
  }

  const [userProgress, setUserProgress] = useState(emptyUser)
  const [initPassed, setInitPassed] = useState(false)

  useEffect(() => {
    let copy = userProgress;
    for (const key in emptyUser) {
      if (!checkCookies(key)) {
        setCookies(key, JSON.stringify(emptyUser[key]))
      } else {
        const rawCookies = getCookie(key);
        copy = {
          ...copy,
          [key]: JSON.parse(decodeURIComponent(rawCookies))
        }
      }
    }

    setUserProgress(copy);
    setInitPassed(true);
  }, [])

  // Save cookies upon changes
  useEffect(() => {
    if (initPassed) {
      for (const key in userProgress) {
        setCookies(key, JSON.stringify(userProgress[key]))
      }
    }
  }, [userProgress])

  return <UserProgressContext.Provider value={{ userProgress, setUserProgress }}>{children}</UserProgressContext.Provider>
}
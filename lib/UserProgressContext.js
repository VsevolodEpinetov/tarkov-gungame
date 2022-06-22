import React, { createContext, useContext, useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';

export const UserProgressContext = createContext({
  userProgress: undefined,
  setUserProgress: async (userProgress) => null
})

export const useUserProgress = () => useContext(UserProgressContext);

export const UserProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    ak: {
      points: 0,
      unlocked: [
        {
          butts: ["akts_1_2"],
          grips: ["6p4sb9_1_1"],
          magazines: ["saiga545-10_1_1"],
          muzzles: [],
          covers: [],
          tubes: ["6p1sb12_1_1"],
          handguards: ["vpo136_1_1"],
          tacticalGrips: [],
          ammo: ["545sp_1_1"],
          sights: [],
          optics: []
        },
        {
          butts: [],
          grips: [],
          magazines: [],
          muzzles: [],
          covers: [],
          tubes: [],
          handguards: [],
          tacticalGrips: [],
          ammo: [],
          sights: [],
          optics: []
        },
        {
          butts: [],
          grips: [],
          magazines: [],
          muzzles: [],
          covers: [],
          tubes: [],
          handguards: [],
          tacticalGrips: [],
          ammo: [],
          sights: [],
          optics: []
        }
      ]
    },
    m4a1: {
      points: 0,
      unlocked: [
        {
          butts: [],
          grips: [],
          magazines: [],
          muzzles: [],
          covers: [],
          tubes: [],
          handguards: [],
          tacticalGrips: [],
          ammo: [],
          sights: [],
          optics: []
        }
      ]
    }
  })

  return <UserProgressContext.Provider value={{userProgress, setUserProgress}}>{children}</UserProgressContext.Provider>
}
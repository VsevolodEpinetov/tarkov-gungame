import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button } from '@mantine/core';
import GunsList from '../components/GunsList';
import { useUserProgress } from '../lib/UserProgressContext'

const Home = () => {
  /*const [userData, setUserData] = useState({});
  const rawData = getCookies();

  useEffect(() => {
    if (!checkCookies('ak')) {
      const akObj = {
        points: 0,
        unlocked: [
          {
            butts: [ "akts_1_2" ],
            grips: [ "6p4sb9_1_1" ],
            magazines: [ "saiga545-10_1_1" ],
            muzzles: [],
            covers: [],
            tubes: [ "6p1sb12_1_1" ],
            handguards: [ "vpo136_1_1" ],
            tacticalGrips: [],
            ammo: [ "545sp_1_1" ],
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
      }
      const m4a1Obj = {
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
      setCookies('ak', JSON.stringify(akObj))
      setCookies('m4a1', JSON.stringify(m4a1Obj))
    }

    const rawData = getCookies();
    if (rawData) {
      setUserData({
        'ak': JSON.parse(decodeURIComponent(rawData?.ak)),
        'm4a1': JSON.parse(decodeURIComponent(rawData?.m4a1))
      })
    }
  }, [])*/

  const { userProgress, setUserProgress } = useUserProgress();


  return (
    <div>
      <main style={{ padding: '25px' }}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Tarkov GunGame
        </Title>

        <Button onClick={() => {
          console.log(userProgress)
        }}>
          Settings
        </Button>
        <Button onClick={() => {
          let copy = userProgress;
          copy.ak.unlocked[0].ammo.push('HP')
        }}>
          Test
        </Button>

        <GunsList userData={userProgress}/>
      </main>

      <footer>
        {/* something */}
      </footer>
    </div>
  )
}

export default Home

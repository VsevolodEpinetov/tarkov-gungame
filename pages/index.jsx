import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button } from '@mantine/core';
import GunsList from '../components/GunsList';
import { useUserProgress } from '../lib/UserProgressContext'

const Home = () => {
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

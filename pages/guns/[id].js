import { useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles, NumberInput } from '@mantine/core';
import PartsList from '../../components/PartsList';

import { getAllGunsNames, getGunData } from '../../lib/guns'
import LevelCard from '../../components/LevelCard';
import { useUserProgress } from '../../lib/UserProgressContext'
import Link from 'next/link';
import KillsInput from '../../components/KillsInput';
import GunStats from '../../components/GunStats';

export default function GunPage({ gunData, gunKey }) {
  const { userProgress, setUserProgress } = useUserProgress();

  return (
    <div>
      <main style={{ padding: '25px' }}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          <Link href='/'>Tarkov GunGame</Link>
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
        <Grid>
          <Grid.Col span={3} style={{ padding: '20px' }}>
            <GunStats gunData={gunData}/>
          </Grid.Col>
          <Grid.Col span={9} style={{ padding: '20px' }}>
            {Object.keys(gunData.levels).map((lvlData, lvl) => 
              <LevelCard 
                level={lvl} 
                key={lvl}
                gunKey={gunKey}
                availableParts={gunData.levels[lvl]}
                gunData={gunData}
              />
            )}
          </Grid.Col>
        </Grid>
      </main>
      <footer>
        {/* something */}
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  const paths = getAllGunsNames()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const gunData = await getGunData(params.id)
  return {
    props: {
      gunData,
      gunKey: params.id
    }
  }
}
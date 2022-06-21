import { useEffect, useState } from 'react';
import Head from 'next/head'
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles } from '@mantine/core';
import PartsList from '../../components/PartsList';

import { getAllGunsNames, getGunData } from '../../lib/guns'
import LevelCard from '../../components/LevelCard';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

export default function GunPage({ gunData, gunKey }) {
  const { classes } = useStyles();
  const [userData, setUserData] = useState({});
  const rawData = getCookies();

  useEffect(() => {
    if (!checkCookies('ak')) {
      const akObj = {
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
  }, [])

  return (
    <div>
      <main style={{ padding: '25px' }}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          Tarkov GunGame
        </Title>
        <Grid>
          <Grid.Col span={3} style={{ padding: '20px' }}>
            <Card
              shadow="sm"
              p="md"
              component="a"
              href='#'
              withBorder
              className={classes.card}
            >
              <Card.Section>
                <Image src={`../img/${gunData.previewImage}`} alt="Ak Preview" />
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text weight={500} size="lg">
                  {gunData?.title}
                </Text>
              </Card.Section>

              <Card.Section className={classes.section}>
                <Text weight={500} size="lg">
                  Доступные патроны
                </Text>
                <Text size="sm">
                  SP
                </Text>
              </Card.Section>
            </Card>
          </Grid.Col>
          <Grid.Col span={9} style={{ padding: '20px' }}>
            {Object.keys(gunData.levels).map((lvlData, lvl) => <LevelCard level={lvl} key={lvl} availableParts={gunData.levels[lvl]} unlockedParts={userData[gunKey]?.unlocked[lvl]}/>)}
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
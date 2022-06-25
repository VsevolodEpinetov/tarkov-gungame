import { useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles, NumberInput, Accordion, useAccordionState, Group } from '@mantine/core';
import PartsList from '../../components/PartsList';
import { Lock } from 'tabler-icons-react';

import { getAllGunsNames, getGunData } from '../../lib/guns'
import LevelCard from '../../components/LevelCard';
import { useUserProgress } from '../../lib/UserProgressContext'
import Link from 'next/link';
import GunStats from '../../components/GunStats';

export default function GunPage({ gunSettings, gunID }) {
  const { userProgress, setUserProgress } = useUserProgress();
  const [amountOfUnlockedParts, setAmountOfUnlockedParts] = useState([]);
  const [amountOfAvailableParts, setAmountOfAvailableParts] = useState([]);
  const [wasSet, setWasSet] = useState(false);
  const [andEven0WasSet, setAndEven0WasSet] = useState(false);
  const [state, handlers] = useAccordionState({ total: 7 })

  useEffect(() => {
    if (!wasSet) {
      let lastUnlockedLevel = 0;
      userProgress[gunID].progress.forEach((levelData, level) => {
        for (const [key, value] of Object.entries(levelData)) {
          if (value.length > 0) {
            lastUnlockedLevel = level;
          }
        }
      })
      if (lastUnlockedLevel > 0) {
        handlers.toggle(lastUnlockedLevel)
        setWasSet(true)
      } else {
        // It looks embarassing to me but I am really can't think
        // of better 'not hacky' way to implement it.
        // By the wat, 'setWasSet' is being passed up to
        // PartImage.jsx because there is a click handler
        if (!andEven0WasSet) {
          handlers.toggle(lastUnlockedLevel)
          setAndEven0WasSet(true)
        }
      }
    }
  }, [userProgress])

  useEffect(() => {
    let copy = amountOfUnlockedParts.slice()
    let lastUnlockedLevel = 0;
    userProgress[gunID].progress.forEach((levelData, level) => {
      let counter = 0;
      for (const [key, value] of Object.entries(levelData)) {
        counter += value.length;
      }
      copy = [...copy.slice(0, level), counter, ...copy.slice(level)]

      if (counter > 0) lastUnlockedLevel = level;
    })
    copy = copy.filter((item, index) => index < userProgress[gunID].progress.length);
    setAmountOfUnlockedParts(copy);

    copy = amountOfAvailableParts.slice()
    gunSettings.levels.forEach((levelData, level) => {
      let counter = 0;
      for (const [key, value] of Object.entries(levelData)) {
        counter += value.length;
      }
      copy = [...copy.slice(0, level), counter, ...copy.slice(level)]
    })
    copy = copy.filter((item, index) => index < gunSettings.levels.length);
    setAmountOfAvailableParts(copy);

  }, [userProgress])

  function AccordionLabel({ level, amountOfUnlockedParts, amountOfAvailableParts }) {
    const percentage = Math.ceil(amountOfUnlockedParts[level]/amountOfAvailableParts[level] * 100) || 0;
    let color = 'red';
    switch (true) {
      case percentage > 25 && percentage < 50:
        color = 'orange';
        break;
      case percentage >= 50:
        color = 'green'
        break;
    }
    let isLocked = false;
    if (level > 0) {
      if (amountOfUnlockedParts[level - 1] < 6) isLocked = true;
    }

    return (
      <Group>
        <Text>{isLocked ? '🔒' : ''}Уровень {level} ({amountOfUnlockedParts[level]}/{amountOfAvailableParts[level]})</Text>
        <div style={{width: '30%'}}>
          <Progress color={color} size="xl" value={percentage} label={`${percentage}%`}/>
        </div>
      </Group>
    );
  }

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
            <GunStats gunSettings={gunSettings} gunID={gunID} setWasSet={setWasSet} />
          </Grid.Col>
          <Grid.Col span={9} style={{ padding: '20px' }}>
            <Accordion multiple state={state} onChange={handlers.setState}>
              {Object.keys(gunSettings.levels).map((lvlData, lvl) =>
                <Accordion.Item label={<AccordionLabel level={lvl} amountOfUnlockedParts={amountOfUnlockedParts} amountOfAvailableParts={amountOfAvailableParts} />} key={`${lvl}-accordion-parent`}>
                  <LevelCard
                    level={lvl}
                    key={lvl}
                    gunID={gunID}
                    listOfAvailableParts={gunSettings.levels[lvl]}
                    gunSettings={gunSettings}
                    setWasSet={setWasSet}
                  />
                </Accordion.Item>
              )}
            </Accordion>
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
  const gunSettings = await getGunData(params.id)
  return {
    props: {
      gunSettings,
      gunID: params.id
    }
  }
}
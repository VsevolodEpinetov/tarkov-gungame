import React from 'react';
import { useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles, NumberInput } from '@mantine/core';
import KillsInput from './KillsInput';
import { useUserProgress } from '../lib/UserProgressContext'

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

const GunStats = ({ gunSettings, gunID }) => {
  const { classes } = useStyles();
  const [availablePoints, setAvailablePoints] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const { userProgress, setUserProgress } = useUserProgress();
  const [killedPMC, setKilledPMC] = useState(0);
  const [killedScavs, setKilledScavs] = useState(0);
  const [survived, setSurvived] = useState(0);

  useEffect(() => {
    const totalPoints = userProgress[gunID].points.forPMCsKills + userProgress[gunID].points.forScavsKills + userProgress[gunID].points.forSurviving;
    const spentPoints = 0;

    userProgress[gunID].progress.forEach((lvlData, lvl) => {
      if (lvl > 0) {
        for (const [key, value] of Object.entries(lvlData)) {
          spentPoints += value.length;
        }
      }
    });

    setTotalPoints(totalPoints);
    setAvailablePoints(totalPoints - spentPoints)

    setKilledPMC(userProgress[gunID].points.forPMCsKills);
    setKilledScavs(userProgress[gunID].points.forScavsKills * 5);
    setSurvived(userProgress[gunID].points.forSurviving);
  }, [userProgress])

  const changePMC = (isItIncrementation) => {
    let copy = userProgress;
    let points = userProgress[gunID].points.forPMCsKills;
    if (!isItIncrementation) points--;
    else points++;

    if (points < 0) points = 0;

    copy = {
      ...copy,
      [gunID]: {
        ...copy[gunID],
        points: {
          ...copy[gunID].points,
          forPMCsKills: points
        }
      }
    }
    setUserProgress(copy);
  }

  const changeScavs = (isItIncrementation) => {
    let copy = userProgress;
    let points = userProgress[gunID].points.forScavsKills;
    if (!isItIncrementation) points--;
    else points++;

    if (points < 0) points = 0;

    copy = {
      ...copy,
      [gunID]: {
        ...copy[gunID],
        points: {
          ...copy[gunID].points,
          forScavsKills: points
        }
      }
    }
    setUserProgress(copy);
  }

  const changeSurvived = (isItIncrementation) => {
    let copy = userProgress;
    let points = userProgress[gunID].points.forSurviving;
    if (!isItIncrementation) points--;
    else points++;

    if (points < 0) points = 0;

    copy = {
      ...copy,
      [gunID]: {
        ...copy[gunID],
        points: {
          ...copy[gunID].points,
          forSurviving: points
        }
      }
    }
    setUserProgress(copy);
  }

  return (
    <Card
      shadow="sm"
      p="md"
      component="a"
      withBorder
      className={classes.card}
    >
      <Card.Section>
        <Image src={`../img/${gunSettings.previewImage}`} alt="Ak Preview" />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text weight={500} size="lg">
          {gunSettings?.title}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text weight={500} size="lg">
          Баллы
        </Text>
        <Text size="sm">
          Доступно: {availablePoints}
        </Text>
        <Text size="sm">
          Всего: {totalPoints}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Убито ЧВК'
          label='Убито ЧВК'
          description='Засчитываются убийства ЧВК из данного оружия'
          value={killedPMC}
          onChange={changePMC}
        />
      </Card.Section>
      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Убито Диких'
          label='Убито Диких'
          description='Засчитываются по 5 убитых диких в одном рейде из данного оружия'
          step={5}
          value={killedScavs}
          onChange={changeScavs}
        />
      </Card.Section>

      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Выживаний'
          label='Выживаний'
          description='Засчитываются успешный выход с локации (со статусом Выжил)'
          value={survived}
          onChange={changeSurvived}
        />
      </Card.Section>
    </Card>
  );
};

export default GunStats;
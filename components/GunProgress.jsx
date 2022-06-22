import React, { useEffect, useState } from 'react';
import { Text, Progress } from '@mantine/core';
import { useUserProgress } from '../lib/UserProgressContext'

const GunProgress = ({ totalPoints, gunID  }) => {
  const { userProgress, setUserProgress } = useUserProgress();
  const [percentage, setPercentage] = useState(0);
  const [barColor, setBarColor] = useState('red');
  const [points, setPoints] = useState('red');

  useEffect(() => {
    console.log(userProgress[gunID])
    let per = Math.ceil(userProgress[gunID].points / totalPoints);
    switch (true) {
      case per > 25:
        setBarColor('orange');
        break;
      case per > 50:
        setBarColor('green');
        break;
    }
    setPercentage(per)

    const p = userProgress[gunID].points.forPMCsKills + userProgress[gunID].points.forScavsKills + userProgress[gunID].points.forSurviving;
    setPoints(p);
  }, [userProgress])

  return (
    <>
      <Text size="sm">
        Твой прогресс - {points}/{totalPoints}
      </Text>
      <Progress color={barColor} size="xs" value={percentage} />
    </>
  );
};

export default GunProgress;
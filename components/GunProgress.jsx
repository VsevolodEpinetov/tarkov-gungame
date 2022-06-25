import React, { useEffect, useState } from 'react';
import { Text, Progress, Stack } from '@mantine/core';
import { useUserProgress } from '../lib/UserProgressContext';

const GunProgress = ({ totalPoints, gunID }) => {
  const { userProgress, setUserProgress } = useUserProgress();
  const [percentage, setPercentage] = useState(0);
  const [barColor, setBarColor] = useState('red');
  const [points, setPoints] = useState('red');

  useEffect(() => {
    const p = userProgress[gunID]?.points.forPMCsKills + userProgress[gunID]?.points.forScavsKills + userProgress[gunID]?.points.forSurviving;
    setPoints(p);

    const per = Math.ceil(p / totalPoints * 100) || 0;
    switch (true) {
      case per > 25 && per < 50:
        setBarColor('orange');
        break;
      case per >= 50:
        setBarColor('green');
        break;
    }
    setPercentage(per)
  }, [userProgress])

  return (
    <>
      <Stack spacing='xs'>
        <Text size="sm">
          Твой прогресс - {points}/{totalPoints}
        </Text>
        <Progress color={barColor} size="xl" value={percentage} label={`${percentage}%`} style={{ width: '100%' }} />
      </Stack>
    </>
  );
};

export default GunProgress;
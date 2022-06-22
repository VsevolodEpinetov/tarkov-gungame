import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles } from '@mantine/core';
import PartsList from './PartsList';
import { useUserProgress } from '../lib/UserProgressContext'

function getProgress (availableParts, unlockedParts) {
  let counter = Object.entries(unlockedParts).length - 11;
  return counter; 
}

const LevelCard = ( {level, gunKey, availableParts, gunData} ) => {
  const { userProgress, setUserProgress } = useUserProgress();
  const [progress, setProgress] = useState(0);
  const [totalParts, setTotalParts] = useState(0);

  useEffect(() => {
    if (userProgress[gunKey].unlocked[level]) {
      let counter = 0;
      for (const [key, value] of Object.entries(userProgress[gunKey].unlocked[level])) {
        counter += value.length;
      }
      setProgress(counter);
    }
    if (availableParts) {
      let counter = 0;
      for (const [key, value] of Object.entries(availableParts)) {
        counter += value.length;
      }
      setTotalParts(counter);
    }
  }, [userProgress])
  return (
    <div>
      <Title
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Уровень {level} ({progress}/{totalParts})
      </Title>
      <PartsList 
        availableParts={availableParts}
        level={level}
        gunKey={gunKey}
        gunData={gunData}
        />
    </div>
  );
};

export default LevelCard;
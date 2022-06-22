import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles } from '@mantine/core';
import PartsList from './PartsList';
import { useUserProgress } from '../lib/UserProgressContext'

function getProgress (availableForPurchaseParts, unlockedParts) {
  let counter = Object.entries(unlockedParts).length - 11;
  return counter; 
}

const LevelCard = ( {level, gunID, listOfAvailableParts, gunSettings} ) => {
  const { userProgress, setUserProgress } = useUserProgress();
  const [progress, setProgress] = useState(0);
  const [totalParts, setTotalParts] = useState(0);

  useEffect(() => {
    if (userProgress[gunID].progress[level]) {
      let counter = 0;
      for (const [key, value] of Object.entries(userProgress[gunID].progress[level])) {
        counter += value.length;
      }
      setProgress(counter);
    }
    if (listOfAvailableParts) {
      let counter = 0;
      for (const [key, value] of Object.entries(listOfAvailableParts)) {
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
        listOfAvailableParts={listOfAvailableParts}
        level={level}
        gunID={gunID}
        gunSettings={gunSettings}
        />
    </div>
  );
};

export default LevelCard;
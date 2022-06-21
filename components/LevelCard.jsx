import React, { useEffect, useState } from 'react';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles } from '@mantine/core';
import PartsList from './PartsList';

function getProgress (availableParts, unlockedParts) {
  let counter = Object.entries(unlockedParts).length - 11;
  console.log(Object.entries(unlockedParts).length)
  return counter; 
}

const LevelCard = ( {availableParts, unlockedParts, level} ) => {
  const [progress, setProgress] = useState(0);
  const [totalParts, setTotalParts] = useState(0);

  useEffect(() => {
    if (unlockedParts) {
      let counter = 0;
      for (const [key, value] of Object.entries(unlockedParts)) {
        console.log(value)
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
  }, [availableParts, unlockedParts])
  return (
    <div>
      <Title
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        Уровень {level} ({progress}/{totalParts})
      </Title>
      <PartsList availableParts={availableParts} unlockedParts={unlockedParts} />
    </div>
  );
};

export default LevelCard;
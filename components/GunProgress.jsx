import React from 'react';
import { Text, Progress } from '@mantine/core';

const GunProgress = ({ totalPoints, userPoints }) => {
  let percentage = Math.ceil(userPoints / totalPoints)
  let barColor = 'red';

  switch (true) {
    case percentage > 25:
      barColor = 'orange'
      break;
    case percentage > 50:
      barColor = 'green';
      break;
  }
  return (
    <>
      <Text size="sm">
        Твой прогресс - {userPoints}/{totalPoints}
      </Text>
      <Progress color={barColor} size="xs" value={percentage} />
    </>
  );
};

export default GunProgress;
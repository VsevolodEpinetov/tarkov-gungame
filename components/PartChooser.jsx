import React from 'react';
import { Text, Paper, Title, Image, SimpleGrid } from '@mantine/core';
import PartImage from './PartImage';

const PartChooser = ({ availableParts, partName, partID, unlockedParts }) => {
  return (
    <Paper shadow="xs" p="sm" withBorder style={{ paddingTop: '2px' }}>
      <Text align="center" style={{}} weight={700}>
        {partName}
      </Text>
      <SimpleGrid cols={1}>
        {availableParts.length ?
          <>
            {availableParts.map(name => <PartImage partID={partID} partName={name} key={name} unlocked={unlockedParts?.includes(name)} />)}
          </>
          :
          <Text align='center'>
            Пусто
          </Text>}
      </SimpleGrid>
    </Paper >
  );
};

export default PartChooser;
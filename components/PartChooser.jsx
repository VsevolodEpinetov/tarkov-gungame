import React from 'react';
import { Text, Paper, Title, Image, SimpleGrid } from '@mantine/core';
import PartImage from './PartImage';

const PartChooser = ({ availableParts, partName, partID, gunKey, level, gunData }) => {
  return (
    <Paper shadow="xs" p="sm" withBorder style={{ paddingTop: '2px' }}>
      <Text align="center" style={{}} weight={700}>
        {partName}
      </Text>
      <SimpleGrid cols={1}>
        {availableParts.length ?
          <>
            {availableParts.map(name => 
              <PartImage 
                partID={partID} 
                partNameTechnical={name}
                partName={partName} 
                gunKey={gunKey}
                level={level}
                gunData={gunData}
              />
            )}
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
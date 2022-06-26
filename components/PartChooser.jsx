import React from 'react';
import { Text, Paper, SimpleGrid } from '@mantine/core';
import PartImage from './PartImage';

const PartChooser = ({ listOfAvailableParts, partName, partID, gunID, level, gunSettings, setWasSet }) => {
  return (
    <Paper shadow="xs" p="sm" withBorder style={{ paddingTop: '2px' }}>
      <Text align="center" style={{}} weight={700}>
        {partName}
      </Text>
      <SimpleGrid cols={1}>
        {listOfAvailableParts.length ?
          <>
            {listOfAvailableParts.map(name => 
              <PartImage 
                partID={partID} 
                partNameTechnical={name}
                partName={partName} 
                gunID={gunID}
                level={level}
                gunSettings={gunSettings}
                key={`${partID}-${level}-${name}`}
                setWasSet={setWasSet}
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
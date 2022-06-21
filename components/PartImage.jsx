import React from 'react';
import { Text, Paper, Title, Image, SimpleGrid, Overlay } from '@mantine/core';

const PartImage = ({ partID, partName, unlocked }) => {
  return (
    <>
      {unlocked ?
        <Image
          src={`../img/parts/${partID}/${partName}.png`}
          alt={partName}
          height={`${partName.split('_')[1] * 50}px`}
          width={`${partName.split('_')[2] * 50}px`}
          align='center' />
        :
        <Image
          src={`../img/parts/${partID}/${partName}.png`}
          alt={partName}
          height={`${partName.split('_')[1] * 50}px`}
          width={`${partName.split('_')[2] * 50}px`}
          align='center' 
          style={{filter: 'grayscale(100%)'}}
          />
      }
    </>
  );
};

export default PartImage;
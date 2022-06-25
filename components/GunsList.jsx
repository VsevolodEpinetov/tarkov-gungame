import React from 'react';
import { Grid } from '@mantine/core';
import gunsData from "../public/data/guns.json"
import GunCard from './GunCard';

const GunsList = ( {userData} ) => {

  return (
    <Grid style={{paddingLeft: '100px'}}>
      {Object.keys(gunsData).map(key => <GunCard gunInfo={gunsData[key]} key={`gun-${key}`} gunID={key} />)}
    </Grid>
  );
};

export default GunsList;
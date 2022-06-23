import { Grid } from '@mantine/core';
import React from 'react';
import PartChooser from './PartChooser';

const partsNames = {
  butts: "Приклады",
  grips: "Рукоятки",
  magazines: "Магазины",
  muzzles: 'Дульники',
  covers: 'Ств. Кор.',
  tubes: 'Газ. блок',
  handguards: 'Цевья',
  tacticalGrips: 'Такт. рук.',
  ammo: 'Патроны',
  sights: 'Прицелы',
  optics: 'Оптика'
}

const PartsList = ({ listOfAvailableParts, level, gunID, gunSettings, setWasSet }) => {
  return (
    <Grid>
      {Object.keys(listOfAvailableParts).map(key => {
        return (
          <Grid.Col span={2} key={key}>
            <PartChooser 
              listOfAvailableParts={listOfAvailableParts[key]} 
              partName={partsNames[key]} 
              partID={key}
              level={level}
              gunID={gunID}
              gunSettings={gunSettings}
              setWasSet={setWasSet}
              />
          </Grid.Col>
        )
      })}
    </Grid >
  );
};

export default PartsList;
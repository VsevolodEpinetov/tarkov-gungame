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

const PartsList = ({ availableParts, unlockedParts }) => {
  return (
    <Grid>
      {Object.keys(availableParts).map(key => {
        return (
          <Grid.Col span={2} key={key}>
            <PartChooser availableParts={availableParts[key]} partName={partsNames[key]} partID={key} unlockedParts={unlockedParts ? unlockedParts[key] : undefined} />
          </Grid.Col>
        )
      })}
    </Grid >
  );
};

export default PartsList;
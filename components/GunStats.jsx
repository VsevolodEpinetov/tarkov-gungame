import React from 'react';
import { useEffect, useState } from 'react';
import { setCookies, getCookies, checkCookies, removeCookies } from 'cookies-next';
import { Card, Image, Text, Title, Grid, Progress, Button, SimpleGrid, createStyles, NumberInput } from '@mantine/core';
import KillsInput from './KillsInput';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
      }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

const GunStats = ( {gunData} ) => {
  const { classes } = useStyles();
  return (
    <Card
      shadow="sm"
      p="md"
      component="a"
      withBorder
      className={classes.card}
    >
      <Card.Section>
        <Image src={`../img/${gunData.previewImage}`} alt="Ak Preview" />
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text weight={500} size="lg">
          {gunData?.title}
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text weight={500} size="lg">
          Баллы
        </Text>
        <Text size="sm">
          Доступно: 3
        </Text>
        <Text size="sm">
          Всего: 3
        </Text>
      </Card.Section>

      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Убито ЧВК'
          label='Убито ЧВК'
          description='Засчитываются убийства ЧВК из данного оружия'
        />
      </Card.Section>
      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Убито Диких'
          label='Убито Диких'
          description='Засчитываются по 5 убитых диких в одном рейде из данного оружия'
          step={5}
        />
      </Card.Section>

      <Card.Section className={classes.section}>
        <KillsInput
          placeholder='Выживаний'
          label='Выживаний'
          description='Засчитываются успешный выход с локации (со статусом Выжил)'
        />
      </Card.Section>
    </Card>
  );
};

export default GunStats;
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import Head from 'next/head'
import { Card, Image, Text, Title, Grid, Progress, Button, createStyles, Container, List, ThemeIcon, Group, Modal, ListItem } from '@mantine/core';
import { Check, BrandGithub, CircleX } from 'tabler-icons-react';
import GunsList from '../components/GunsList';
import { useUserProgress } from '../lib/UserProgressContext'
import Pic from '../public/bg.png'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.xl * 4,
    paddingBottom: theme.spacing.xl * 4,
  },

  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,

    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
        : theme.colors[theme.primaryColor][0],
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
  },
}));

const Home = () => {
  const { userProgress, setUserProgress } = useUserProgress();
  const { classes, theme } = useStyles();
  const [opened, setOpened] = useState(false);


  return (
    <div>
      <main>
        <Container>
          <div className={classes.inner}>
            <div className={classes.content}>
              <Title className={classes.title}>
                Ещё более <span className={classes.highlight}>душный</span> Тарков
              </Title>
              <Text color="dimmed" mt="md">
                Раскачали аккаунт, и теперь нечего делать? Выход есть - фанатский режим игры GunGame!
              </Text>

              <List
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                  <ThemeIcon size={20} radius="xl">
                    <Check size={12} />
                  </ThemeIcon>
                }
              >
                <List.Item>
                  <b>Линейная прогрессия</b> – получай очки за убийства с обусловленного оружия и выживания
                </List.Item>
                <List.Item>
                  <b>Несколько стволов</b> – выбирай, с чем ты будешь душниться, на свой вкус
                </List.Item>
                <List.Item>
                  <b>Многоуровневая система</b> – продвигайся по уровням и прокачивай свой ствол
                </List.Item>
              </List>

              <Group mt={30}>
                <Button radius="xl" size="md" className={classes.control} onClick={() => setOpened(true)}>
                  Как это работает?
                </Button>
                <Button component="a" href="https://github.com/VsevolodEpinetov/tarkov-gungame" target='_blank' variant="default" radius="xl" size="md" className={classes.control} leftIcon={<BrandGithub />}>
                  GitHub
                </Button>
              </Group>
            </div>
            <Image src={Pic.src} className={classes.image} alt='header' />
          </div>
          <Title>
            Доступное оружие
          </Title>
          <Text>
            Модули и уровни актуальны для версии 0.12.12.
          </Text>
          <GunsList userData={userProgress} />
        </Container>
      </main>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="А как какать?"
        size='xl'
      >
        <Text>Цель челленджа - прокачать выбранный ствол в мясо. Сделать это можно, покупая модули за баллы (1 модуль = 1 балл). Баллы даются за:</Text>
        <List>
          <ListItem>Убийство ЧВК. 1 ЧВК = 1 балл</ListItem>
          <ListItem>Убийство Диких. 5 Диких = 1 балл</ListItem>
          <ListItem>Выход с рейда с статусом "Выжил". 1 выживание = 1 балл</ListItem>
        </List>
        <Text>Ограничения:</Text>
        <List
          icon={
            <ThemeIcon color="red" size={20} radius="xl">
              <CircleX size={16} />
            </ThemeIcon>
          }
        >
          <ListItem>Убийства с оружия вне челленджа не дают баллов!</ListItem>
          <ListItem>Покупать модули следующего уровня можно только после покупки 6 модулей на предыдущем уровне и всех модулей данного типа в нём.</ListItem>
          <ListItem>После покупки модуля его нельзя продавать. На сайте функционал продажи есть на случай ошибок, но не рекомендуется это абьюзить.</ListItem>
          <ListItem>Нельзя использовать найденные модули и патроны</ListItem>
        </List>
        <Text>Покупать модули следующего уровня можно только после покупки 6 модулей на предыдущем уровне и всех модулей данного типа в нём.</Text>
      </Modal>

      <footer>
        {/* something */}
      </footer>
    </div>
  )
}

export default Home

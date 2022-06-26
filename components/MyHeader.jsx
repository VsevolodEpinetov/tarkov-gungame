import React from 'react';
import { ActionIcon, Image, Container, createStyles, Group } from '@mantine/core';
import { BrandGithub, BrandTelegram, Bulb, BulbOff } from 'tabler-icons-react';
import { setCookies } from 'cookies-next';
import Link from 'next/link';

const useStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  }
}));

const MyHeader = ({ scheme, setScheme }) => {
  const { classes } = useStyles();

  function setUserScheme() {
    setCookies('scheme', !scheme)
    setScheme(!scheme)
  }

  return (
    <div>
      <Container className={classes.header}>
        <Link href='/'>
          <a><Image src={scheme ? '/logo-dark.svg' : '/logo-light.svg'} alt='logo' width='130px' /></a>
        </Link>
        <Group>
          <ActionIcon size="xl" component='a' href='https://github.com/VsevolodEpinetov/tarkov-gungame' target='_blank'>
            <BrandGithub />
          </ActionIcon>
          <ActionIcon size="xl" component='a' href='https://t.me/epinetov' target='_blank'>
            <BrandTelegram />
          </ActionIcon>
          <ActionIcon size="xl" onClick={setUserScheme}>
            {scheme ? <Bulb /> : <BulbOff />}
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default MyHeader;
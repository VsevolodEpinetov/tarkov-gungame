import React from 'react';
import { Card, Text, Grid, createStyles, Stack } from '@mantine/core';
import GunProgress from '../components/GunProgress'

const useStyles = createStyles((theme, _params, getRef) => {
  const image = getRef('image');

  return {
    card: {
      position: 'relative',
      height: 280,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],

      [`&:hover .${image}`]: {
        transform: 'scale(1.03)',
      },
    },

    image: {
      ref: image,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: 'cover',
      transition: 'transform 500ms ease',
    },

    overlay: {
      position: 'absolute',
      top: '20%',
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)',
    },

    content: {
      height: '100%',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

const GunCard = ({ gunInfo, gunID }) => {
  const { classes, theme } = useStyles();

  return (
    <Grid.Col span={6}>
      <div style={{ padding: '15px' }}>
        <Card
          p="lg"
          shadow="lg"
          className={classes.card}
          radius="md"
          component="a"
          href={`/guns/${gunID}`}
        >
          <div className={classes.image} style={{ backgroundImage: theme.colorScheme === 'dark' ? `url(img/${gunInfo.previewImageDark})` : `url(img/${gunInfo.previewImageLight})`, backgroundPosition: 'center' }} />
          <div className={classes.overlay} />

          <div className={classes.content}>
            <div>
              <Text size="lg" className={classes.title} weight={500}>
                {gunInfo.title}
              </Text>

              <Stack spacing='md'>
                <Text size="sm" className={classes.author}>
                  Test
                </Text>

                <GunProgress gunID={gunID} totalPoints={gunInfo.totalPoints} />
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </Grid.Col>
    /*<Grid.Col span={3}>
      <div style={{ padding: '15px' }}>
        <Card
          shadow="sm"
          p="xl"
          component="a"
          href={`/guns/${gunID}`}
        >
          <Card.Section>
            <Image src={`img/${gunInfo.previewImage}`} alt="Ak Preview" />
          </Card.Section>

          <Text weight={500} size="lg">
            {gunInfo.title}
          </Text>

          <Text size="sm">
            {gunInfo.subtitle}
          </Text>
          <br />
          <GunProgress gunID={gunID} totalPoints={gunInfo.totalPoints}/>
        </Card>
      </div>
    </Grid.Col>*/
  );
};

export default GunCard;
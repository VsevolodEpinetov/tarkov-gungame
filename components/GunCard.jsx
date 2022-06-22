import React from 'react';
import { Card, Image, Text, Grid } from '@mantine/core';
import GunProgress from '../components/GunProgress'

const GunCard = ( {gunInfo, userData, gunID} ) => {
  return (
    <Grid.Col span={3}>
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
            {gunInfo?.title}
          </Text>

          <Text size="sm">
            {gunInfo?.subtitle}
          </Text>
          <br />
          <GunProgress gunID={gunID} totalPoints={gunInfo?.totalPoints}/>
        </Card>
      </div>
    </Grid.Col>
  );
};

export default GunCard;
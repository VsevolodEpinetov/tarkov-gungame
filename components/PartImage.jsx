import React, { useEffect, useState } from 'react';
import { Text, Paper, Title, Image, SimpleGrid, Overlay, Modal } from '@mantine/core';
import { useUserProgress } from '../lib/UserProgressContext'

const PartImage = ({ partID, partName, gunKey, level, gunData, partNameTechnical }) => {
  const [style, setStyle] = useState({ filter: 'grayscale(100%)', opacity: '50%' })
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState([])
  const { userProgress, setUserProgress } = useUserProgress();
  useEffect(() => {
    const index = userProgress[gunKey].unlocked[level][partID].indexOf(partNameTechnical);

    if (index > -1) setStyle({})
  }, [])

  const changeStateOfPart = () => {
    if (level === 0) {
      setOpened(true);
      let message = ['Модули нулевого уровня нельзя "продать", они открыты по-умолчанию.']
      setMessage(message)
    } else {
      let counter = 0;
      for (const [key, value] of Object.entries(userProgress[gunKey].unlocked[level - 1])) {
        counter += value.length;
      }
      const minimumPartsAcquired = counter >= 6;
      const allPartsFromPreviousLevelAreAcquired = userProgress[gunKey].unlocked[level - 1][partID].length === gunData.levels[level - 1][partID].length;

      if (minimumPartsAcquired && allPartsFromPreviousLevelAreAcquired) {
        let copy = userProgress;
        const index = copy[gunKey].unlocked[level][partID].indexOf(partNameTechnical)

        if (index > -1) {
          copy[gunKey].unlocked[level][partID].splice(index, 1)
          setStyle({ filter: 'grayscale(100%)', opacity: '50%' })
        } else {
          copy[gunKey].unlocked[level][partID].push(partNameTechnical)
          setStyle({})
        }

        setUserProgress(copy)
      } else {
        let message = [`Не выполнен ряд условий!`]
        
        let part = `Приобретено 6+ модулей ${level - 1} уровня:`
        if (minimumPartsAcquired) part += '✅' 
        else part += `❌ (${counter}/6)`
        message.push(part);

        part = `Открыты все модули ${partName} предыдущего уровня`
        if (allPartsFromPreviousLevelAreAcquired) part += '✅' 
        else part += '❌'
        message.push(part);

        setMessage(message);
        setOpened(true)
      }
    }
  }

  return (
    <>
      <Image
        src={`../img/parts/${partID}/${partNameTechnical}.png`}
        alt={partNameTechnical}
        height={`${partNameTechnical.split('_')[1] * 50}px`}
        width={`${partNameTechnical.split('_')[2] * 50}px`}
        align='center'
        style={style}
        onClick={changeStateOfPart}
      />
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Ошибка'
      >
        {message.map(line => <Text>{line}</Text>)}
      </Modal>
    </>
  );
};

export default PartImage;
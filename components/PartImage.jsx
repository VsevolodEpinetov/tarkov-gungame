import React, { useEffect, useState } from 'react';
import { Text, Image, Modal } from '@mantine/core';
import { useUserProgress } from '../lib/UserProgressContext'

const PartImage = ({ partID, partName, gunID, level, gunSettings, partNameTechnical, setWasSet }) => {
  const [style, setStyle] = useState({ filter: 'grayscale(100%)', opacity: '50%' })
  const [opened, setOpened] = useState(false);
  const [message, setMessage] = useState([])
  const [availablePoints, setAvailablePoints] = useState(0);
  const { userProgress, setUserProgress } = useUserProgress();

  useEffect(() => {
    if (userProgress[gunID].progress.length > 1) {
      const index = userProgress[gunID].progress[level][partID].indexOf(partNameTechnical);

      const totalPoints = userProgress[gunID].points.forPMCsKills + userProgress[gunID].points.forScavsKills + userProgress[gunID].points.forSurviving;
      const spentPoints = 0;

      userProgress[gunID].progress.forEach((lvlData, lvl) => {
        if (lvl > 0) {
          for (const [key, value] of Object.entries(lvlData)) {
            spentPoints += value.length;
          }
        }
      });

      setAvailablePoints(totalPoints - spentPoints)

      if (index > -1) setStyle({})
      else setStyle({ filter: 'grayscale(100%)', opacity: '50%' })
    }
  }, [userProgress])

  const changeStateOfPart = () => {
    setWasSet(true);
    if (level === 0) {
      setOpened(true);
      let message = ['Модули нулевого уровня нельзя "продать", они открыты по-умолчанию.']
      setMessage(message)
    } else {
      let counter = 0;
      for (const [key, value] of Object.entries(userProgress[gunID].progress[level - 1])) {
        counter += value.length;
      }
      let copy = userProgress;
      const index = copy[gunID].progress[level][partID].indexOf(partNameTechnical)
      const enoughPoints = availablePoints > 0;
      const minimumPartsAcquired = counter >= 6;
      const allPartsFromPreviousLevelAreAcquired = userProgress[gunID].progress[level - 1][partID].length === gunSettings.levels[level - 1][partID].length;
      const isSelling = index > -1;

      if (isSelling) {
        copy = {
          ...copy,
          [gunID]: {
            ...copy[gunID],
            progress: [
              ...copy[gunID].progress.slice(0, level),
              {
                ...copy[gunID].progress[level],
                [partID]: [
                  ...copy[gunID].progress[level][partID].slice(0, index),
                  ...copy[gunID].progress[level][partID].slice(index + 1)
                ]
              },
              ...copy[gunID].progress.slice(level + 1)
            ]
          }
        }
        setUserProgress(copy)
      } else {
        if (minimumPartsAcquired && allPartsFromPreviousLevelAreAcquired && enoughPoints) {
          const index = copy[gunID].progress[level][partID].length;
          copy = {
            ...copy,
            [gunID]: {
              ...copy[gunID],
              progress: [
                ...copy[gunID].progress.slice(0, level),
                {
                  ...copy[gunID].progress[level],
                  [partID]: [
                    ...copy[gunID].progress[level][partID].slice(0, index),
                    partNameTechnical,
                    ...copy[gunID].progress[level][partID].slice(index)
                  ]
                },
                ...copy[gunID].progress.slice(level + 1)
              ]
            }
          }


          setUserProgress(copy)
        } else {
          let message = [`Не выполнено как минимум одно условие!`]

          part = `Достаточно баллов`
          if (enoughPoints) part += ' ✅'
          else part += ' ❌'
          message.push(part);

          let part = `Приобретено 6+ модулей ${level - 1} уровня:`
          if (minimumPartsAcquired) part += ' ✅'
          else part += ` ❌ (${counter}/6)`
          message.push(part);

          part = `Открыты все ${partName} предыдущего уровня`
          if (allPartsFromPreviousLevelAreAcquired) part += ' ✅'
          else part += ' ❌'
          message.push(part);

          setMessage(message);
          setOpened(true)
        }
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
        {message.map((line, id) => <Text key={`text-${id}`}>{line}</Text>)}
      </Modal>
    </>
  );
};

export default PartImage;
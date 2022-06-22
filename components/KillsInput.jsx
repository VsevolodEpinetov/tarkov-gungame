import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, Text } from '@mantine/core';

const KillsInput = ({ description, label, placeholder, step, value, onChange }) => {
  const handlers = useRef(NumberInputHandlers);


  return (
    <>
      <Text>
        {label}
      </Text>

      <Text>
        {description}
      </Text>
      <Group spacing={5}>
        <ActionIcon size={42} variant="default" onClick={() => onChange(false)}>
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          handlersRef={handlers}
          step={step ? step : 1}
          style={{ width: '50%' }}
          size='lg'
          disabled
          min={0}
        />

        <ActionIcon size={42} variant="default" onClick={() => onChange(true)}>
          +
        </ActionIcon>
      </Group>
    </>
  );
};

export default KillsInput;
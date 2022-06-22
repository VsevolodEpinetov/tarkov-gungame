import { useState, useRef } from 'react';
import { NumberInput, Group, ActionIcon, NumberInputHandlers, Text } from '@mantine/core';

const KillsInput = ({ description, label, placeholder, step }) => {
  const [value, setValue] = useState(0)
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
        <ActionIcon size={42} variant="default" onClick={() => handlers.current.decrement()}>
          –
        </ActionIcon>

        <NumberInput
          hideControls
          value={value}
          placeholder={placeholder}
          onChange={(val) => setValue(val)}
          handlersRef={handlers}
          step={step ? step : 1}
          style={{ width: '50%' }}
          size='lg'
          disabled
        />

        <ActionIcon size={42} variant="default" onClick={() => handlers.current.increment()}>
          +
        </ActionIcon>
      </Group>
    </>
  );
};

export default KillsInput;
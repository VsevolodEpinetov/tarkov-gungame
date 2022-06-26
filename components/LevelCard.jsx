import React, { useEffect, useState } from 'react';
import PartsList from './PartsList';

const LevelCard = ({ level, gunID, listOfAvailableParts, gunSettings, setWasSet }) => {
  return (
    <PartsList
      listOfAvailableParts={listOfAvailableParts}
      level={level}
      gunID={gunID}
      gunSettings={gunSettings}
      setWasSet={setWasSet}
    />
  );
};

export default LevelCard;
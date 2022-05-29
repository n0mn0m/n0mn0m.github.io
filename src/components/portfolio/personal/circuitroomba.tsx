import React from 'react';
import ProjectItem from './item';

const CircuitRoombaProject = () => {
  return (
    <ProjectItem
      projectName="Circuit Roomba"
      projectInfo={[
        {
          description:
            'Setup SMS interaction with home roomba to be able to text commands the roomba would process and respond to.',
          technologies: [
            'CircuitPython',
            'SMS',
            'Twilio',
            'Raspberry Pi',
            'LoRa',
          ],
        },
      ]}
    />
  );
};

export default CircuitRoombaProject;

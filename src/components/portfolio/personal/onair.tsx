import React from 'react';
import ProjectItem from './item';

const OnAirProject = () => {
  return (
    <ProjectItem
      projectName="On Air"
      projectInfo={[
        {
          description:
            'Trained an NLP model to run on an ESP32 responding to a wake word and command do toggle a status indicator display.',
          technologies: [
            'C++',
            'Tensorflow Lite',
            'ESP-IDF',
            'CircuitPython',
            'Rust',
            'SledDB',
            'REST API',
            'bash',
          ],
        },
      ]}
    />
  );
};

export default OnAirProject;

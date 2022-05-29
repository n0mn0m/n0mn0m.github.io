import React from 'react';
import ProjectItem from './item';

const ValentineProject = () => {
  return (
    <ProjectItem
      projectName="Valentine"
      projectInfo={[
        {
          description:
            'A bluetooth sensor that changes board LED colors based on the count of devices in local proximity.',
          technologies: ['CircuitPython', 'Bluetooth'],
        },
      ]}
    />
  );
};

export default ValentineProject;

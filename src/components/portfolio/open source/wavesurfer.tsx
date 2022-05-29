import React from 'react';
import ProjectItem from './item';

const WavesurferContributions = () => {
  return (
    <ProjectItem
      projectName="wavesurfer.js"
      projectInfo={[
        {
          description: 'Update region event broadcasting during teardown',
          prs: [
            {
              title: 'Region plugin event fix',
              url: 'https://github.com/katspaugh/wavesurfer.js/pull/2409',
            },
          ],
        },
      ]}
    />
  );
};

export default WavesurferContributions;

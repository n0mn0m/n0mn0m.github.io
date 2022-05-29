import React from 'react';
import ProjectItem from './item';

const AiodbcContributions = () => {
  return (
    <ProjectItem
      projectName="aioodbc"
      projectInfo={[
        {
          description: 'Documentation updates based on using the library.',
          prs: [
            {
              title: 'Configuration tuning documentation',
              url: 'https://github.com/aio-libs/aioodbc/pull/176',
            },
          ],
        },
      ]}
    />
  );
};

export default AiodbcContributions;

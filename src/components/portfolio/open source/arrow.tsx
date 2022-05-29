import React from 'react';
import ProjectItem from './item';

const ApacheArrowContributions = () => {
  return (
    <ProjectItem
      projectName="Apache Arrow"
      projectInfo={[
        {
          description:
            'Documentation and minor behavior updates based on using the library.',
          prs: [
            {
              title: 'Add Hash Path',
              url: 'https://github.com/apache/arrow/pull/1765/files',
            },
            {
              title: 'Documentation updates',
              url: 'https://github.com/apache/arrow/pull/1820/files',
            },
            {
              title: 'Memory subpool allocation',
              url: 'https://github.com/apache/arrow/pull/2057',
            },
          ],
        },
      ]}
    />
  );
};

export default ApacheArrowContributions;

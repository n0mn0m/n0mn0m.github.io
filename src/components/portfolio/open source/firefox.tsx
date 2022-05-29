import React from 'react';
import ProjectItem from './item';

const FireFoxContributions = () => {
  return (
    <ProjectItem
      projectName="Firefox Mobile (Android)"
      projectInfo={[
        {
          description:
            'Mobile browser update for a bug I and others experienced.',
          prs: [
            {
              title: 'Orientation Bug Fix',
              url: 'https://bugzilla.mozilla.org/show_bug.cgi?id=769391',
            },
          ],
        },
      ]}
    />
  );
};

export default FireFoxContributions;

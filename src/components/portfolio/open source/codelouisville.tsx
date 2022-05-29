import React from 'react';
import ProjectItem from './item';

const CodeLouisvilleContributions = () => {
  return (
    <ProjectItem
      projectName="Code Louisville"
      projectInfo={[
        {
          description:
            'Volunteer Instructor and content creator for Python web and data analysis tracks.',
          prs: [
            {
              title: 'Python Course',
              url: 'https://github.com/CodeLouisville/PythonClassProject/commit/5dadc2ea1a2588d18e06fa58ade5d417fa78a0fe',
            },
          ],
        },
      ]}
    />
  );
};

export default CodeLouisvilleContributions;

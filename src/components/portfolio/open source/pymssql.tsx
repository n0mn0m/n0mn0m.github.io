import React from 'react';
import ProjectItem from './item';

const PyMYSqlContributions = () => {
  return (
    <ProjectItem
      projectName="PyMSSQL"
      projectInfo={[
        {
          description:
            'Help get the library update to cut a new release addressing several bugs and issues users encountered.',
          prs: [
            {
              title: '2.1.4 release coordinator',
              url: 'https://github.com/pymssql/pymssql/pull/587',
            },
            {
              title: 'Build updates',
              url: 'https://github.com/pymssql/pymssql/pull/577',
            },
            {
              title:
                'Assist others as they onboard and contribute to the project',
              url: 'https://github.com/pymssql/pymssql/pull/591',
            },
            {
              title: 'etc',
              url: 'https://github.com/pymssql/pymssql/pulls?q=is%3Apr+author%3An0mn0m+',
            },
          ],
        },
      ]}
    />
  );
};

export default PyMYSqlContributions;

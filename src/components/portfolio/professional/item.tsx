import React from 'react';

interface ProjectProps {
  title: string;
  description: string;
  technologies: string[];
}

interface ProjectItemProps {
  orgName: string;
  projectInfo: ProjectProps[];
}

const createSummary = (projectInfo: ProjectProps[]) => {
  return projectInfo.map((project) => (
    <>
      <li key={Math.random()}>{project.title}</li>
      <p>
        <strong>Summary</strong>
      </p>
      <p>{project.description}</p>
      <p>
        <strong>Core Technology</strong>
      </p>
      <p>{project.technologies.join(', ')}</p>
    </>
  ));
};

const ProjectItem = ({ orgName, projectInfo }: ProjectItemProps) => {
  return (
    <>
      <h3>{orgName}</h3>
      <ol>{createSummary(projectInfo)}</ol>
    </>
  );
};

export default ProjectItem;

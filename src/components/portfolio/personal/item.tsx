import React from 'react';

interface ProjectProps {
  description: string;
  technologies: string[];
}

interface ProjectItemProps {
  projectName: string;
  projectInfo: ProjectProps[];
}

const createSummary = (projectInfo: ProjectProps[]) => {
  return projectInfo.map((project) => (
    <>
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

const ProjectItem = ({ projectName, projectInfo }: ProjectItemProps) => {
  return (
    <>
      <h3>{projectName}</h3>
      <ol>{createSummary(projectInfo)}</ol>
    </>
  );
};

export default ProjectItem;

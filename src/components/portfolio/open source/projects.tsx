import React from 'react';
import AiodbcContributions from './aioodbc';
import ApacheArrowContributions from './arrow';
import CodeLouisvilleContributions from './codelouisville';
import FireFoxContributions from './firefox';
import PyMYSqlContributions from './pymssql';
import WavesurferContributions from './wavesurfer';

const OpenSourceProjects = () => {
  return (
    <>
      <AiodbcContributions />
      <ApacheArrowContributions />
      <CodeLouisvilleContributions />
      <FireFoxContributions />
      <PyMYSqlContributions />
      <WavesurferContributions />
    </>
  );
};

export default OpenSourceProjects;

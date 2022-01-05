import React from 'react';

interface AnchorProps {
  anchorTitle: string;
  targetUrl: string;
}

const Anchor = ({ anchorTitle, targetUrl }: AnchorProps) => {
  return (
    <a href={targetUrl} target="_blank" rel="noreferrer nofollow">
      {anchorTitle}
    </a>
  );
};

export default Anchor;

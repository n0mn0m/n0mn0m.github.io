import React, { AnchorHTMLAttributes, ReactElement } from 'react';

interface AnchorProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  anchorContent: string | ReactElement;
}
const Anchor = ({ href, className, style, anchorContent }: AnchorProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer nofollow"
      className={className}
      style={style}
    >
      {anchorContent}
    </a>
  );
};

export default Anchor;

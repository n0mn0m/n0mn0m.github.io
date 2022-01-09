import React from 'react';

const AppleMusicPlayer = () => {
  return (
    <iframe
      title="Apple Music Favorites Mix Viewer"
      allow="autoplay *; encrypted-media *; fullscreen *"
      frameBorder="0"
      height="450"
      style={{
        width: '100%',
        maxWidth: 660,
        overflow: 'hidden',
        background: 'transparent',
      }}
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
      src="https://embed.music.apple.com/us/playlist/favorites-mix/pl.pm-d5779e520ff52d7ff48ccfc6a4eff32d"
    />
  );
};

export default AppleMusicPlayer;

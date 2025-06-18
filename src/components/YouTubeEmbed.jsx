// components/YouTubeEmbed.jsx

import React from 'react';

export default function YouTubeEmbed({ videoId }) {
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="yt-embed">
      <iframe
        src={embedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>

      <style jsx>{`
        .yt-embed iframe {
          width: 100%;
          height: 315px;
          border-radius: 8px;
          display: block;
        }
      `}</style>
    </div>
  );
}

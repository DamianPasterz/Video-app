import React from "react";
// import "../style/_modal.css";
// Youtube Player
const YoutubeEmbed = ({ embedId }) => {
  return (
    <div className="video-responsive">
      <iframe
        className="videoA"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YoutubeEmbed;

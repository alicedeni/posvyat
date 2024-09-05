import React from 'react';

const InfoBlock = ({ style, imageSrc, text }) => {
  return (
    <div className="info-block" style={style}>
      <img src={imageSrc} alt={text} className="info-block-image" style={{ transform: 'scale(1)' }} />
      <p className="info-block-text">{text}</p>
    </div>
  );
};

export default InfoBlock;
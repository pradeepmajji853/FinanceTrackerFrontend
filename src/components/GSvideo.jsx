import React from 'react';
import PropTypes from 'prop-types';
import './GSvideo.css';

export default function GSvideo({ video }) {
  return (
    <div className="GSvideo">
      <video autoPlay loop muted>
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

GSvideo.propTypes = {
  video: PropTypes.string.isRequired,
};

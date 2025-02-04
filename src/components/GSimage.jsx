import React from 'react';
import PropTypes from 'prop-types';
import './GSimage.css';

export default function GSimage({ image }) {
  return (
    <div className="GSimage">
      <img src={image} alt="Description" />
    </div>
  );
}

GSimage.propTypes = {
  image: PropTypes.string.isRequired,
};
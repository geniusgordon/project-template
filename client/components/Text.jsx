import React from 'react';

const Text = ({ text }) => (
  <div>{text}</div>
);

Text.propTypes = {
  text: React.PropTypes.string,
};

export default Text;


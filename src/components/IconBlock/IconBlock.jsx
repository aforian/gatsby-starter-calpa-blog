import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../Icon';

const IconBlock = ({ icon, children }) => (
  <div className="flex items-start text-gray-500 text-sm">
    <span className="flex h-5 mr-1 items-center">
      <Icon icon={icon} />
    </span>
    {children}
  </div>
);

IconBlock.propTypes = {
  icon: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default IconBlock;

import React from 'react';
import PropTypes from 'prop-types';

const PageContainer = ({ id, children }) => (
  <div
    id={id}
    className="container lg:max-w-screen-lg md:px-2 mx-auto md:pt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
  >
    {children}
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};
PageContainer.defaultProps = {
  id: '',
};

export default PageContainer;

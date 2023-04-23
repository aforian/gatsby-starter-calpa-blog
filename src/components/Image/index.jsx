import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Image = ({
  className = '', image, alt, title, ...restProps
}) => (
  getImage(image)
    ? (
      <GatsbyImage
        {...restProps}
        className={className}
        image={getImage(image)}
        placeholder="blurred"
        alt={title}
      />
    )
    : (
      <img
        className={className}
        src={image?.publicURL ?? image}
        alt={alt || title}
      />
    )
);

Image.propTypes = {
  image: (PropTypes.object || PropTypes.string).isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  alt: PropTypes.string,
};

Image.defaultProps = {
  className: '',
  title: '',
  alt: '',
};

export default Image;

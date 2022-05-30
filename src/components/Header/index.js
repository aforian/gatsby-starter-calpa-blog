import React from 'react';
import PropTypes from 'prop-types';

const Header = ({
  img,
  title,
  subTitle,
  authorImage,
  authorName,
}) => (
  <div id="header" className="w-full" style={{ padding: 0 }}>
    <div
      className={`
        w-full bg-cover bg-center px-3 py-5 min-h-[140px] md:min-h-[300px] lg:min-h-[400px]
        text-center flex flex-col justify-center text-white relative
      `}
      style={{
        backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2) ), url(${img})`,
      }}
    >
      {title && <h1 className="text-2xl font-semibold md:mb-5">{title}</h1>}
      {subTitle && (
        <div>
          <div className="flex justify-center items-center mb-1 absolute md:static bottom-3 left-3">
            {authorImage && (
              <img
                src={authorImage}
                className="w-5 h-5 mr-1 rounded-full"
                alt={authorName}
              />
            )}
            <span className="leading-4">{authorName}</span>
          </div>
          <span className="absolute md:static bottom-3 right-3">{subTitle}</span>
        </div>
      )}
    </div>
  </div>
);

Header.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
};

Header.defaultProps = {
  title: '',
  subTitle: '',
  authorName: '',
  authorImage: '',
};

export default Header;

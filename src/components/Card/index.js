import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import Tag from '../Tag';

import { parseImgur } from '../../api/images';

const imageStyle = (headerImage, color) => ({
  backgroundColor: `#${color}`,
  backgroundImage: ` url(${parseImgur(headerImage, 'large')})`,
});

const CardHeader = ({ url, image, backgroundColor }) => (
  <Link to={url} href={url} className="block w-full">
    <div className="bg-center bg-cover w-full h-24 md:h-36 lg:h-64" style={imageStyle(image, backgroundColor)} />
  </Link>
);

const Card = ({
  title,
  date,
  url,
  headerImage,
  headerBackgroundColor,
  description,
  tags = [],
}) => (
  <div className="pb-4 px-4 md:px-0">
    <div className="hover:shadow-xl hover:z-2 duration-200 ease-in-out">
      {headerImage && (
        <CardHeader
          url={url}
          image={headerImage}
          backgroundColor={headerBackgroundColor}
        />
      )}
      <div className="relative z-1 bg-white p-3 border-t border-gray-100 flex flex-col">
        <div>
          <span className="inline-block p-3 mr-2 bg-emerald-300 text-white">{date.split('T')[0]}</span>
          {tags.map(name => (
            <Tag name={name} key={name} />
          ))}
        </div>
        <Link to={url} href={url}>
          <h3 className="text-xl md:text-2xl text-cyan-600 mt-3 mb-1 hover:text-cyan-700 hover:underline">{title}</h3>
        </Link>
        <p className="line-clamp-2 mb-4">{description}</p>
        <Link to={url} href={url} className="text-cyan-600 hover:text-cyan-700">
          繼續閱讀全文內容
        </Link>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  url: PropTypes.string.isRequired,
  headerImage: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

CardHeader.propTypes = {
  url: PropTypes.string.isRequired,
  image: PropTypes.string,
  backgroundColor: PropTypes.string,
};

Card.defaultProps = {
  tags: [],
  date: '',
  headerImage: '',
  headerBackgroundColor: '',
  description: '',
};

CardHeader.defaultProps = {
  image: '',
  backgroundColor: '',
};

export default Card;

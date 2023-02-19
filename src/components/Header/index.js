import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

import IconBlock from '../IconBlock';
import TagList from '../TagList';
import { IconName } from '../Icon';

const Header = ({
  img,
  title,
  date,
  tags = [],
  authorImage,
  authorName,
}) => (
  <div id="article-header" className="w-full relative">
    <h1 className="text-3xl font-extrabold mb-4 dark:text-gray-100 duration-200">
      {title}
    </h1>
    <div className="flex flex-wrap md:flex-nowrap gap-3">
      <div className="flex items-center text-gray-500 text-sm dark:text-gray-100 duration-200">
        {authorImage && (
          <img
            src={authorImage}
            className="!w-5 h-5 mr-1 rounded-full"
            alt={authorName}
          />
        )}
        <span>{authorName}</span>
      </div>
      <IconBlock icon={IconName.Date}>
        <div>
          {date.split('T')[0]}
        </div>
      </IconBlock>
      <IconBlock icon={IconName.Tag}>
        <TagList tags={tags} />
      </IconBlock>
    </div>
    <hr className="my-4 md:my-8" />
    {img && (
      <div className="mb-4">
        <GatsbyImage
          image={getImage(img)}
          alt={title}
          className="w-full block"
        />
      </div>
    )}
  </div>
);

Header.propTypes = {
  img: PropTypes.object.isRequired,
  title: PropTypes.string,
  date: PropTypes.string,
  authorName: PropTypes.string,
  authorImage: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Header.defaultProps = {
  title: '',
  date: '',
  authorName: '',
  authorImage: '',
  tags: [],
};

export default Header;

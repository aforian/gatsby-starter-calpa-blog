import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { parseImgur } from '../../api/images';
import IconBlock from '../IconBlock';
import TagList from '../TagList';
import { IconName } from '../Icon';

const Card = ({
  title,
  date,
  url,
  headerImage,
  description,
  tags = [],
}) => (
  <div className="pb-4 last:pb-0 px-4 md:px-0">
    <div className="md:hover:shadow-xl md:hover:z-2 duration-200 ease-in-out">
      <div
        className={`
          relative z-1 flex bg-white border-l-4 border-teal-500
          dark:bg-neutral-900 duration-200
        `}
      >
        <div className="flex-1 p-4">
          <Link to={url} href={url}>
            <h2
              className={`
                inline-block text-xl font-semibold md:text-2xl mb-1 text-teal-500 hover:text-teal-700
                dark:text-teal-300 hover:dark:text-teal-500 duration-200
              `}
            >
              {title}
            </h2>
          </Link>
          <div className="flex mb-1 gap-3 flex-wrap">
            <IconBlock icon={IconName.Date}>
              <div>
                {date.split('T')[0]}
              </div>
            </IconBlock>
            <IconBlock icon={IconName.Tag}>
              <TagList tags={tags} />
            </IconBlock>
          </div>
          <p className="line-clamp-2 mb-4 min-h-[3em] duration-200 dark:text-gray-100">{description}</p>
          <Link to={url} href={url} className="text-gray-400 hover:text-gray-600 dark:text-gray-100 hover:dark:text-gray-400 duration-200">
            繼續閱讀...
          </Link>
        </div>
        {headerImage && (
          <div className="hidden md:block w-[150px] min-w[150px] lg:w-[200px] lg:min-w-[200px] py-4 pr-4">
            <Link to={url} href={url} className="w-full h-full flex items-center justify-center">
              <img
                className="block w-full aspect-video object-cover object-center bg-gray-200"
                src={parseImgur(headerImage, 'large')}
                alt={title}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  </div>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string,
  url: PropTypes.string.isRequired,
  headerImage: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

Card.defaultProps = {
  tags: [],
  date: '',
  headerImage: '',
  description: '',
};

export default Card;

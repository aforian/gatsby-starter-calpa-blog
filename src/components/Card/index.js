import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

import { parseImgur } from '../../api/images';
import IconBlock from '../IconBlock';
import { IconName } from '../Icon';

const TagItem = ({ name, isLast }) => {
  const href = `/tag/${name}`;
  return (
    <Link
      className={`hover:text-gray-600 ${!isLast && 'after:content-["、"] after:inline-block'}`}
      to={href}
      href={href}
    >
      {name}
    </Link>
  );
};

TagItem.propTypes = {
  name: PropTypes.string.isRequired,
  isLast: PropTypes.bool.isRequired,
};

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
      <div className="relative z-1 flex bg-white border-l-4 border-teal-500">
        <div className="flex-1 p-4">
          <Link to={url} href={url}>
            <h2 className="inline-block text-xl font-semibold md:text-2xl mb-1 text-teal-500 hover:text-teal-700">{title}</h2>
          </Link>
          <div className="flex mb-1">
            <IconBlock icon={IconName.Date}>
              <div className="min-w-[82px]">
                {date.split('T')[0]}
              </div>
            </IconBlock>
            <IconBlock icon={IconName.Tag}>
              <div>
                {tags.map((name, index, arr) => (
                  <TagItem key={name} name={name} isLast={index >= arr.length - 1} />
                ))}
              </div>
            </IconBlock>
          </div>
          <p className="line-clamp-2 mb-4 min-h-[3em]">{description}</p>
          <Link to={url} href={url} className="text-gray-400 hover:text-gray-700">
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

import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const PostNodePropType = PropTypes.shape({
  frontmatter: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
});

const SibilingItem = ({ node, type }) => {
  const {
    frontmatter, fields,
  } = node;
  const { slug } = fields;
  const {
    title,
  } = frontmatter;

  const className = {
    previous: 'text-left ml-0 mr-auto',
    next: 'text-right mr-0 ml-auto col-start-2',
  };
  const typeText = {
    previous: '上一篇',
    next: '下一篇',
  };

  return (
    <div className={className[type]}>
      <span className="text-sm">{typeText[type]}</span>
      <Link to={slug} className="hover:text-teal-600">
        <h4 className="font-semibold">{title}</h4>
      </Link>
    </div>
  );
};

SibilingItem.propTypes = {
  node: PostNodePropType.isRequired,
  type: PropTypes.string.isRequired,
};

const SibilingArticles = ({ previous, next }) => (
  <div className="grid grid-cols-2 gap-5">
    {previous?.frontmatter && <SibilingItem node={previous} type="previous" />}
    {next?.frontmatter && <SibilingItem node={next} type="next" />}
  </div>
);

SibilingArticles.propTypes = {
  previous: PostNodePropType.isRequired,
  next: PostNodePropType.isRequired,
};

export default SibilingArticles;

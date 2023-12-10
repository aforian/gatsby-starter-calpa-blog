import PropTypes from 'prop-types';

const ExternalLink = ({ href, title, target, className, rel }) => (
  <a
    href={href}
    rel={rel}
    target={target}
    className={`
      inline-block text-left duration-200 text-teal-500 hover:text-teal-700 
      dark:text-teal-300 hover:dark:text-teal-500 ${className}
    `}
  >
    {title}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  target: PropTypes.string,
  className: PropTypes.string,
  rel: PropTypes.string,
};

ExternalLink.defaultProps = {
  target: '_blank',
  className: '',
  rel: 'external nofollow noopener',
};

export default ExternalLink;

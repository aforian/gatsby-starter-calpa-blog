import PropTypes from 'prop-types';
import Icon from '../Icon';

const IconBlock = ({ icon, children }) => (
  <div className="flex items-start text-gray-400 text-sm dark:text-gray-100 duration-200">
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

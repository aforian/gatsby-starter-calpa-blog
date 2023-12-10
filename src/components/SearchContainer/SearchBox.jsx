import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSearchBox } from 'react-instantsearch-hooks-web';

import Icon, { IconName } from '../Icon';
import { useShowSearch } from '../../hooks/useShowSearch';

const SearchBox = ({ className, inputRef }) => {
  const { refine, query } = useSearchBox();
  const { setShowSearch } = useShowSearch();
  const [value, setValue] = useState(query);

  useEffect(() => {
    refine(value);
  }, [value, refine]);

  return (
    <form className={className} onSubmit={e => e.preventDefault()}>
      <div className="w-full relative shadow-xl dark:shadow-white/30">
        <input
          className={`
            bg-white w-full py-3 px-[3rem] bg-white rounded
            outline-teal-500 focus:outline focus:outline-offset focus:outline-2
            dark:bg-neutral-900 dark:text-gray-100
          `}
          type="text"
          placeholder="搜尋本部落格"
          aria-label="Search"
          onChange={e => setValue(e.target.value)}
          value={value}
          ref={inputRef}
        />
        <button
          type="button"
          aria-label="Search"
          className="absolute top-1/2 left-5 -translate-y-1/2 dark:text-gray-100"
        >
          <Icon icon={IconName.Search} />
        </button>
        <button
          type="button"
          aria-label="Cancel"
          className="absolute top-1/2 right-3 p-2 -translate-y-1/2 duration-200 hover:text-teal-500 dark:text-gray-100"
          onClick={e => {
            e.preventDefault();
            if (value) {
              setValue('');
            } else {
              setShowSearch(false);
            }
          }}
        >
          <Icon icon={IconName.Cancel} />
        </button>
      </div>
    </form>
  );
};
SearchBox.propTypes = {
  className: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.any }),
  ]),
};
SearchBox.defaultProps = {
  className: '',
  inputRef: undefined,
};

export default SearchBox;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { createRef, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import { isBrowser } from '../../api';
import { useShowSearch } from '../../hooks/useShowSearch';
import SearchBox from './SearchBox';
import SearchResult from './SearchResult';

const BlurBlackDrop = () => (
  <div className="absolute bg-white/30 dark:bg-neutral-900/30 backdrop-blur-sm w-full h-full top-0 left-0" />
);

const Search = ({ indices }) => {
  const rootRef = createRef();
  const inputRef = createRef(null);
  const searchClient = useMemo(
    () =>
      algoliasearch(
        process.env.GATSBY_ALGOLIA_APP_ID,
        process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      ),
    [],
  );
  const { showSearch, setShowSearch } = useShowSearch();

  useEffect(() => {
    if (isBrowser) {
      if (showSearch) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  }, [showSearch]);

  useEffect(() => {
    if (showSearch) {
      inputRef?.current?.focus();
    }
  }, [showSearch, inputRef]);

  return (
    <div
      id="search-container"
      role="textbox"
      tabIndex="0"
      className={`
        fixed top-0 left-0 w-full h-full z-[9999] p-4
        flex justify-center items-center 
        ${showSearch ? 'block' : 'hidden'}
      `}
      ref={rootRef}
      aria-label="Search Container"
      onClick={() => setShowSearch(false)}
      onKeyDown={e => {
        if (e.key === 'Escape') {
          setShowSearch(false);
        }
      }}
    >
      <BlurBlackDrop />
      <div
        className="relative w-full md:w-2/3"
        onClick={e => e.stopPropagation()}
        onKeyDown={() => {}}
      >
        <InstantSearch searchClient={searchClient} indexName={indices[0].name}>
          <SearchBox inputRef={inputRef} />
          <SearchResult />
        </InstantSearch>
      </div>
    </div>
  );
};
Search.propTypes = {
  indices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      title: PropTypes.string,
    }),
  ).isRequired,
};

export default Search;

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  useHits,
  PoweredBy,
  Hits,
  Highlight,
  Snippet,
  useSearchBox,
} from 'react-instantsearch-hooks-web';
import { useShowSearch } from '../../hooks/useShowSearch';
import { useDarkMode } from '../../hooks/useDarkMode';
import Icon, { IconName } from '../Icon';

const Hit = ({ hit }) => {
  const { setShowSearch } = useShowSearch();

  return (
    <div role="option" aria-selected="false">
      <Link to={hit.slug} onClick={() => setShowSearch(false)} className="group">
        <h4
          className={`
            text-xl font-semibold text-teal-500 group-hover:text-teal-700
            dark:text-gray-300 dark:group-hover:text-teal-500 duration-200
          `}
        >
          <Highlight attribute="title" hit={hit} highlightedTagName="span" />
        </h4>
        <Snippet
          className="dark:text-gray-100"
          attribute="excerpt"
          hit={hit}
          highlightedTagName="span"
        />
      </Link>
    </div>
  );
};
Hit.propTypes = {
  hit: PropTypes.any.isRequired,
};

const NotFound = () => (
  <div className="h-full text-center flex flex-col justify-center">
    <Icon className="text-5xl text-teal-500 mb-3 dark:text-teal-300" icon={IconName.Warning} />
    <span className="dark:text-gray-100">找不到任何結果，換個關鍵字試試？</span>
  </div>
);

const SearchResult = ({ className }) => {
  const { dark } = useDarkMode();
  const { hits } = useHits();
  const { query } = useSearchBox();
  const hitCount = hits.length;
  const isResultShow = !query || hitCount > 0;

  return (
    <div className={`relative bg-white py-5 mt-4 rounded shadow-2xl dark:shadow-white/30 dark:bg-neutral-900 ${className}`}>
      <div className="px-5 h-[60vh] md:h-[40vh] overflow-auto">
        {isResultShow
          ? <Hits className="Hits" hitComponent={Hit} />
          : <NotFound />}
      </div>
      <div className="px-5 mt-3 flex justify-between items-end">
        <div className="text-sm dark:text-gray-100">
          {!query ? '所有結果' : `共 ${hitCount} 筆符合的結果`}
        </div>
        <PoweredBy theme={dark ? 'dark' : 'light'} />
      </div>
    </div>
  );
};
SearchResult.propTypes = {
  className: PropTypes.string,
};
SearchResult.defaultProps = {
  className: '',
};

const StyledSearchResult = styled(SearchResult)`
  .ais-Highlight, .ais-Snippet {
    &-highlighted {
      position: relative;
      background-color: transparent;
      font-weight: bolder;
      margin: 0 1px;
      &:after {
        content: '';
        position: absolute;
        top: 100%;
        left: -2px;
        width: calc(100% + 4px);
        height: 4px;
        background-color: rgb(20,184,166);
      }
    }
  }
  .Hits {
    ul {
      list-style: none;
      margin-left: 0;
    }
    li.ais-Hits-item {
      margin-bottom: 1em;
      padding: .5rem;
      border-left: .25rem solid rgb(20,184,166);
      a {
        color: ${({ theme }) => theme.foreground};
        h4 {
          margin-bottom: 0.2em;
        }
      }
    }
  }
  .ais-PoweredBy {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: .25rem;
    font-size: 80%;
    svg {
      width: 150px;
    }
  }
`;

export default StyledSearchResult;

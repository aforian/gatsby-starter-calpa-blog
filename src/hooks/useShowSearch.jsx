import React, {
  useContext, useState, createContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const ShowSearchContext = createContext();

export const ShowSearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const searchContext = useMemo(() => ({ showSearch, setShowSearch }), [showSearch, setShowSearch]);

  return (
    <ShowSearchContext.Provider value={searchContext}>
      {children}
    </ShowSearchContext.Provider>
  );
};

ShowSearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useShowSearch = () => {
  const { showSearch, setShowSearch } = useContext(ShowSearchContext);
  return { showSearch, setShowSearch };
};

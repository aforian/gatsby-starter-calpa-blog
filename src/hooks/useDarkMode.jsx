import React, {
  useContext, useState, createContext, useMemo,
} from 'react';
import PropTypes from 'prop-types';

const DarkModeContext = createContext(null);

export const DarkModeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const darkModeContext = useMemo(() => ({ dark, setDark }), [dark, setDark]);

  return (
    <DarkModeContext.Provider value={darkModeContext}>
      {children}
    </DarkModeContext.Provider>
  );
};

DarkModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useDarkMode = () => {
  const { dark, setDark } = useContext(DarkModeContext);
  return { dark, setDark };
};

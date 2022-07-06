/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';

import Transition from '../Transition';
import Navbar from '../Navbar';
import Head from './Head';
import Footer from '../Footer';
import { ThemeContext } from './themeContext';
import { getInitDarkMode } from '../../utils/getInitDarkMode';
import './index.scss';

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a', { offset: 60, speed: 200 });
}

const Layout = ({ children, location }) => {
  const [dark, setDark] = useState(getInitDarkMode());
  const themeContext = useMemo(() => [dark, setDark], [dark, setDark]);

  useEffect(() => {
    window.localStorage.setItem('darkmode', dark);
  }, [dark]);

  return (
    <ThemeContext.Provider value={themeContext}>
      <div className={dark && 'dark'}>
        <div className="layout min-h-[calc(100vh-52px)] bg-gray-100 dark:bg-black duration-200">
          <Head />
          <Navbar location={location} setDark={setDark} dark={dark} />
          <Transition location={location}>
            <div className="w-full mt-header">
              {children}
            </div>
          </Transition>
          <Footer />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;

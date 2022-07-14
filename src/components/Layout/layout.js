/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';

import Transition from '../Transition';
import Navbar from '../Navbar';
import Head from './Head';
import Footer from '../Footer';
import { getInitDarkMode } from '../../utils/getInitDarkMode';
import './index.scss';
import { isBrowser } from '../../api';
import { DarkModeProvider, useDarkMode } from '../../hooks/useDarkMode';

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a', { offset: 60, speed: 200 });
}

const Layout = ({ children, location }) => {
  const { dark, setDark } = useDarkMode();

  useEffect(() => {
    if (isBrowser) {
      setDark(getInitDarkMode());
    }
  }, []);

  useEffect(() => {
    if (isBrowser) {
      window.localStorage.setItem('darkmode', dark);
    }
  }, [dark]);

  return (
    <div className={dark && 'dark'}>
      <div className="layout min-h-[calc(100vh-52px)] bg-gray-100 dark:bg-black duration-200">
        <Head />
        <Navbar />
        <Transition location={location}>
          <div className="w-full mt-header">
            {children}
          </div>
        </Transition>
        <Footer />
      </div>
    </div>
  );
};

const ProviderLayout = props => (
  <DarkModeProvider>
    <Layout {...props} />
  </DarkModeProvider>
);

export default ProviderLayout;

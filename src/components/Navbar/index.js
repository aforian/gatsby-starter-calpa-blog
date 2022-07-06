import React, { useContext } from 'react';
import ReactGA from 'react-ga';

import { gotoPage } from '../../apis/url';
import { ThemeContext } from '../Layout/themeContext';

const Navbar = () => {
  const [dark, setDark] = useContext(ThemeContext);

  return (
    <nav className="fixed w-full top-0 left-0 py-2 z-[1020] duration-200 shadow-lg bg-white dark:bg-neutral-900">
      <div className="container lg:max-w-screen-lg px-2 mx-auto flex justify-between">
        <button
          type="button"
          className={`
            py-1 px-2 text-lg font-bold rounded-md bg-white hover:bg-gray-200 hover:text-teal-600 duration-200
            dark:bg-neutral-900 dark:text-gray-100 hover:dark:bg-neutral-800 hover:dark:text-teal-300
          `}
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Click navbar logo',
            });
            gotoPage('/');
          }}
        >
          {'Alex Ian\'s Blog'}
        </button>
        <button
          type="button"
          className="duration-200 dark:text-gray-100"
          onClick={() => {
            setDark(d => !d);
          }}
        >
          Toggle
          {' '}
          {dark ? 'dark' : 'light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

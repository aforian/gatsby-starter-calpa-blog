import React from 'react';
import ReactGA from 'react-ga';

import { gotoPage } from '../../apis/url';
import { useShowSearch } from '../../hooks/useShowSearch';
import DarkModeSwitch from '../DarkModeSwitch';
import Icon, { IconName } from '../Icon';

const SearchButton = () => {
  const { setShowSearch } = useShowSearch();

  return (
    <button
      className="hover:text-teal-600 duration-200 dark:text-gray-100 hover:dark:text-teal-300"
      type="button"
      onClick={() => setShowSearch(true)}
    >
      <Icon icon={IconName.Search} />
    </button>
  );
};

const Navbar = () => (
  <nav className="fixed w-full top-0 left-0 py-2 z-[1020] duration-200 shadow-lg bg-white dark:bg-neutral-900">
    <div className="container lg:max-w-screen-lg px-2 mx-auto flex justify-between items-center">
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
      <menu className="flex gap-3">
        <SearchButton />
        <DarkModeSwitch />
      </menu>
    </div>
  </nav>
);

export default Navbar;

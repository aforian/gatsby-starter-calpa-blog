import React from 'react';
import ReactGA from 'react-ga';

import { gotoPage } from '../../apis/url';

const Navbar = () => (
  <nav className="fixed w-full top-0 left-0 py-2 z-[1020] shadow-lg bg-white">
    <div className="container lg:max-w-screen-lg mx-auto flex justify-between">
      <button
        type="button"
        className="py-1 px-2 text-lg font-bold rounded-md hover:bg-gray-200 hover:hover:text-teal-600 duration-200"
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
    </div>
  </nav>
);

export default Navbar;

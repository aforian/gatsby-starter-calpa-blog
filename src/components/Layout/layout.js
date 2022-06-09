/* eslint-disable react/prop-types */
import React from 'react';

import Transition from '../Transition';
import Navbar from '../Navbar';
import Head from './Head';
import Footer from '../Footer';
import './index.scss';

if (typeof window !== 'undefined') {
  // Make scroll behavior of internal links smooth
  // eslint-disable-next-line global-require
  require('smooth-scroll')('a', { offset: 60, speed: 200 });
}

const Layout = ({ children, location }) => (
  <div className="layout min-h-[calc(100vh-52px)] bg-gray-100">
    <Head />
    <Navbar location={location} />
    <Transition location={location}>
      <div className="w-full mt-header">
        {children}
      </div>
    </Transition>
    <Footer />
  </div>
);

// Layout.propTypes = {
//   children: PropTypes.object.isRequired,
//   location: PropTypes.any
// };

export default Layout;

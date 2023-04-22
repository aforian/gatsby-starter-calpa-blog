/* eslint-disable no-unused-vars */
import ReactGA from 'react-ga';
import { config } from './data';

const {
  url, gaTrackId, gaOptimizeId,
} = config;

const isLocalDevelopment = () => window && window.location && window.location.origin !== url;

if (isLocalDevelopment() === false) {
  console.log('Welcome to online environment.');
}

// Inspired by APlayer
console.log(
  `${'\n'} %c ALEXIAN %c https://alex-ian.me ${'\n'}${'\n'}`,
  'color: #6cf; background: #030307; padding:5px 0;',
  'background: #6cf; padding:5px 0;',
);

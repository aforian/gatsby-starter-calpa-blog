import React from 'react';
import Icon, { IconName } from '../Icon';
import { useDarkMode } from '../../hooks/useDarkMode';

const DarkModeSwitch = () => {
  const { dark, setDark } = useDarkMode();
  const themeClassName = dark
    ? 'left-0'
    : 'left-1/2';

  return (
    <button
      type="button"
      className={`
        relative w-[50px] aspect-[2/1] rounded-full bg-gray-500 flex items-center justify-around
        dark:text-gray-100 dark:bg-gray-500 duration-200
      `}
      onClick={() => {
        setDark(d => !d);
      }}
    >
      <Icon className={`text-yellow-300 ${dark && 'opacity-0'} duration-200 delay-100`} icon={IconName.Day} />
      <Icon className={`text-yellow-400 ${!dark && 'opacity-0'} duration-200 delay-100`} icon={IconName.Night} />
      <div
        className={`
          absolute top-0 rounded-full w-1/2 aspect-square bg-white
          drop-shadow-[0_0_4px_rgba(20,184,166,0.5)] scale-105 duration-200
          ${themeClassName}
        `}
      />
    </button>
  );
};

export default DarkModeSwitch;

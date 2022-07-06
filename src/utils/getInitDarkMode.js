export function getInitDarkMode() {
  const darkmode = window.localStorage.getItem('darkmode');

  if (darkmode !== null) {
    return darkmode === 'true';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

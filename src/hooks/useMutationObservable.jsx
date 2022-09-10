import { useEffect, useState } from 'react';
import { debounce } from 'lodash-es';

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};
function useMutationObservable(targetEl, cb, options = DEFAULT_OPTIONS) {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    if (!cb || typeof cb !== 'function') {
      console.warn(
        `You must provide a valida callback function, instead you've provided ${cb}`,
      );
      return;
    }
    const { debounceTime } = options;
    const obs = new MutationObserver(
      debounceTime > 0 ? debounce(cb, debounceTime) : cb,
    );
    setObserver(obs);
  }, [cb, options, setObserver]);

  useEffect(() => {
    if (!observer) return;
    const { config } = options;
    observer.observe(targetEl, config);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options]);
}
export default useMutationObservable;

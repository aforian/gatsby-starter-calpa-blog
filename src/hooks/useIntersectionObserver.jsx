import { useEffect, useState } from 'react';

export const useIntersectionObserver = el => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (el?.current) {
      const observer = new IntersectionObserver(entries => {
        const entry = entries[0];
        setShow(!entry.isIntersecting);
      });
      observer.observe(el.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [el]);

  return show;
};

import React from 'react';

export const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(ref.current);
    };
  }, [options, ref]);

  return isIntersecting;
};

// const ref = useRef();
// const isOnScreen = useIntersectionObserver(ref, { threshold: 0.6 });

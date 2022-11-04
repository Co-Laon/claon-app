import { useEffect, useCallback, useRef } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = (
  onIntersect: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  {
    threshold = 0,
    root = null,
    rootMargin = '0%',
    freezeOnceVisible = true,
  }: UseIntersectionObserverOptions
) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && freezeOnceVisible)
          onIntersect(entry, observer);
      });
    },
    [onIntersect, freezeOnceVisible]
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(callback, {
      threshold,
      root,
      rootMargin,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, callback]);

  return ref;
};

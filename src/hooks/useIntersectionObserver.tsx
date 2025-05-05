
import { useEffect, useState, useRef, RefObject } from "react";

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends Element>({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [
  RefObject<T>,
  boolean,
  IntersectionObserverEntry | null
] => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<T>(null);

  const frozen = isVisible && freezeOnceVisible;

  useEffect(() => {
    const node = ref.current;
    if (!node || frozen) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
        setIsVisible(entry.isIntersecting);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, frozen]);

  return [ref, isVisible, entry];
};

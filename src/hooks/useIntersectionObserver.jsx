
import { useEffect, useState, useRef } from "react";

export const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = true,
} = {}) => {
  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

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

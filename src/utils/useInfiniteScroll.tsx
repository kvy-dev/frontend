import { useEffect, useRef, useState, ReactNode } from "react";

interface UseInfiniteScrollProps {
  onLoadMore: () => void;
  threshold?: number; // Default: 1.0 (trigger when fully visible)
}

const useInfiniteScroll = ({ onLoadMore, threshold = 1.0 }: UseInfiniteScrollProps) => {
  const flagRef = useRef<HTMLDivElement | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { threshold }
    );

    if (flagRef.current) {
      observer.observe(flagRef.current);
    }

    return () => observer.disconnect();
  }, [onLoadMore, threshold]);

  // Component that serves as the trigger for infinite scroll
  const InfiniteScrollTrigger: React.FC<{ children?: ReactNode }> = ({ children }) => (
    <div ref={flagRef} style={{ height: "10px", background: "transparent" }}>
      {children}
    </div>
  );

  return { isIntersecting, InfiniteScrollTrigger };
};

export default useInfiniteScroll;
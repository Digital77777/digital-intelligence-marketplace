
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  
  // Scroll to top whenever pathname or search params change
  useEffect(() => {
    // Skip scroll if there's a hash in the URL (anchor link)
    if (hash) return;
    
    // Use requestAnimationFrame for better performance and smoother animation
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
    
    // Use setTimeout to ensure the scrolling happens after any DOM updates
    const timeoutId = setTimeout(() => {
      requestAnimationFrame(scrollToTop);
    }, 10);
    
    // Performance monitoring 
    if (typeof window !== 'undefined' && window.performance) {
      try {
        // Mark navigation timing for performance analysis
        performance.mark(`navigation-${pathname}`);
      } catch (e) {
        console.error('Performance marking failed:', e);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [pathname, search, hash]);
};

export default useScrollToTop;

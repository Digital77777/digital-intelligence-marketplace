
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Enhanced version with better performance
const useScrollToTop = () => {
  const { pathname, search, hash } = useLocation();
  
  // Scroll to top whenever pathname or search params change
  useEffect(() => {
    // Skip scroll if there's a hash in the URL (anchor link)
    if (hash) return;
    
    // Use requestAnimationFrame for better performance
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    };
    
    // Use requestAnimationFrame for smoother scrolling
    requestAnimationFrame(scrollToTop);
    
    // Also implement performance monitoring
    if (typeof window !== 'undefined' && window.performance) {
      try {
        // Record navigation timing
        performance.mark(`navigation-${pathname}`);
      } catch (e) {
        console.error('Performance marking failed:', e);
      }
    }
  }, [pathname, search, hash]);
};

export default useScrollToTop;

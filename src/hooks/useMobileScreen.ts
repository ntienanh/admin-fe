import { useEffect, useState } from 'react';

const useMobileScreen = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= breakpoint : false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= breakpoint);
    };

    // Check initially
    checkIfMobile();

    // Add event listener
    window.addEventListener('resize', checkIfMobile);

    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return {
    isMobile,
  };
};

export default useMobileScreen;

import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const UnauthorizedPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/108151f2-62c5-452b-a7ac-58ee59fa5a7e/mcM8MhlxzI.json',
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className='z-50 flex h-full flex-col items-center justify-center bg-white bg-opacity-95'>
      <div ref={containerRef} className='h-48 w-48' />
      <div className='mt-4 text-center text-lg font-semibold text-red-600'>
        You don't have permission to access this page!
      </div>
    </div>
  );
};

export default UnauthorizedPage;

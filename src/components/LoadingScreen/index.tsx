import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const LoadingScreen = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://assets2.lottiefiles.com/packages/lf20_j1adxtyb.json', // bạn có thể đổi sang animation khác nếu muốn
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-100 bg-opacity-95'>
      <div ref={containerRef} className='h-48 w-48' />
      <p className='mt-6 animate-pulse text-lg font-medium text-gray-700'>Loading, please wait...</p>
    </div>
  );
};

export default LoadingScreen;

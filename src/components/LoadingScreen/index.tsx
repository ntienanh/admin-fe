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
      path: 'https://lottie.host/ac5e45b8-bf61-4b1c-9357-f6f957726043/rKXru3whmD.json',
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-95'>
      <div ref={containerRef} className='h-48 w-48' />
    </div>
  );
};

export default LoadingScreen;

import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';

const NotFoundPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'https://lottie.host/78b4961a-8edd-42ed-8018-1f21788da41f/Dy84DqBJYU.json',
    });

    return () => anim.destroy();
  }, []);

  return (
    <div className='relative z-50 flex h-full flex-col items-center justify-center bg-white bg-opacity-95'>
      <div ref={containerRef} className='h-[600px] w-[600px]' />
    </div>
  );
};

export default NotFoundPage;

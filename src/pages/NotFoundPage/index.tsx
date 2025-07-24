import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <div className='relative z-50 flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-[#9fb7bb] to-[#ffffff]'>
      <Link
        to={'/'}
        className='absolute z-50 -mt-[23rem] flex items-center gap-2 text-center text-lg font-semibold text-blue-600'
      >
        <span>🔙</span>
        <span>Go back Home</span>
      </Link>
      <div ref={containerRef} className='relative z-40 h-[600px] w-[600px]'></div>
    </div>
  );
};

export default NotFoundPage;

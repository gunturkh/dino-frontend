import React, { useEffect } from 'react';

export const useIteration = (incr = 0.1) => {
  const [i, setI] = React.useState(0);

  // at mount start raf
  useEffect(() => {
    let raf: any;

    const loop = () => {
      raf = requestAnimationFrame(loop);
      setI(i => i + incr);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);

  return i;
}
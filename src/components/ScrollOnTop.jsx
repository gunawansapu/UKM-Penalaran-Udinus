// src/components/ScrollToTop.jsx
import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // 1. Matikan fitur "sok pintar" browser yang suka mengingat posisi scroll terakhir
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Tarik ke atas SECARA INSTAN sebelum layar sempat digambar (menggunakan 'auto')
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto', // Gunakan 'auto' karena 'instant' kadang tidak dikenali oleh Safari/iOS
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
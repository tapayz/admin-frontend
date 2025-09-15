'use client';

import { useEffect, useState } from 'react';

export const useResize = () => {
  // 초기값을 null로 설정
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPc, setIsPc] = useState(false);

  useEffect(() => {
    // 화면 크기에 따라 상태 업데이트
    const handleResize = () => {
      const windowWidth = window.innerWidth;

      // 모바일: 768px 미만
      setIsMobile(windowWidth < 769);

      // 태블릿: 1280px 미만 (768px 이상인지 체크하지 않음)
      setIsTablet(windowWidth < 1280);

      // PC: 1280px 이상
      setIsPc(windowWidth >= 1400);
    };

    // 컴포넌트 마운트 시 초기 실행
    handleResize();

    // 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile, isTablet, isPc };
};

'use client'

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginSuccess() {
  const router = useRouter();

  useEffect(() => {
    const userDataString = new URLSearchParams(window.location.search).get('user');
    if (userDataString) {
      const userData = JSON.parse(decodeURIComponent(userDataString));
      console.log('로그인 성공:', userData);
      // 여기서 사용자 정보를 상태 관리 라이브러리나 로컬 스토리지에 저장할 수 있습니다.
      // 예: localStorage.setItem('user', JSON.stringify(userData));
      
      // 로그인 성공 후 메인 페이지로 리디렉션
      router.push('/');
    }
  }, [router]);

  return <div>로그인 성공! 리디렉션 중...</div>;
}
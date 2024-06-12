import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/initSupabase';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // auth 상태 변화를 처리하는 콜백 함수
    const handleAuthStateChange = (event, sessionData) => {
      setSession(sessionData?.session);
      if (sessionData?.session) {
        router.push('/');
      }
    };

    // auth 상태 변화 구독 등록
    const { data: authListener } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    // 컴포넌트가 언마운트될 때 구독을 제거하는 함수
    const cleanup = () => {
      authListener.unsubscribe(); // 구독 해제
    };

    // 컴포넌트가 언마운트될 때 실행되는 클린업 함수 반환
    return cleanup;
  }, [router]);

  return <Component {...pageProps} session={session} />;
}

export default MyApp;

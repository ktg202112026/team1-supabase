import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/initSupabase';

function Index() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // 로그인 정보를 가져오는 useEffect
  useEffect(() => {
    // 사용자 정보 가져오기
    const fetchUserData = async () => {
      try {
        const { user, error } = supabase.auth.user();
        if (error) throw error;
        setUser(user); // 사용자 정보 설정
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    // 페이지가 렌더링될 때 사용자 정보 가져오기
    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Welcome to the Index Page!</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <button onClick={() => router.push('/profile')}>Go to Profile</button>
        </div>
      ) : (
        <p>Please log in to see your information</p>
      )}
    </div>
  );
}

export default Index;

// pages/login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/initSupabase';
import Link from 'next/link';
import LoginForm from '../styles/components/LoginForm';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      router.push('/'); // 로그인 성공 후 홈 페이지로 이동
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <LoginForm onSubmit={handleLogin} loading={loading} />
      <div style={{ marginTop: 20 }}>
        <button onClick={handleGitHubLogin}>Login with GitHub</button>
        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
      <p>
        Don't have an account?{' '}
        <Link href="/signup">Sign up here</Link>
      </p>
    </div>
  );
}

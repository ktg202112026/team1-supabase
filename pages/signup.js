// pages/signup.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import supabase from '../utils/initSupabase';
import Link from 'next/link';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert('Signup successful! Please check your email for verification.');
      router.push('/login'); // 회원가입 후 로그인 페이지로 이동
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // GitHub로 회원가입 처리
  const handleGitHubSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  // Google로 회원가입 처리
  const handleGoogleSignup = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
      if (error) throw error;
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
      <div style={{ marginTop: 20 }}>
        <button onClick={handleGitHubSignup}>Sign Up with GitHub</button>
        <button onClick={handleGoogleSignup}>Sign Up with Google</button>
      </div>
      <p>
        Already have an account?{' '}
        <Link href="/login">Login here</Link>
      </p>
    </div>
  );
}

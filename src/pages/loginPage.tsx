import Login from '@/components/login/login';
import Head from 'next/head';

export default function LoginPage() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="login-form page" />
      </Head>
      <Login/>
    </>
  )
}
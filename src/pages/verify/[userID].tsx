import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';

const UserVerification = () => {
  const router = useRouter();
  const { userID } = router.query;

  return (
    <>
      <Head>
        <title> 官方驗證｜Bityo</title>
      </Head>
      <p>{userID}</p>
    </>
  )
};

export default UserVerification;
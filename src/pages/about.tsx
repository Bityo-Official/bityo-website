import Intro from "@/components/About/Intro";
import Member from "@/components/About/Member";
import Head from "next/head";
import SEO from "@/config/SEO.json";
import { GetServerSideProps } from "next";
import { MemberDataProps } from "@/types/Member/Member";
import { initAdmin } from "../../lib/firebaseAdmin";
import admin from "firebase-admin";

interface AboutProps {
  members: MemberDataProps[];
}

const About = ({ members }: AboutProps) => {
  return (
    <>
      <Head>
        <title>{SEO.About.title}</title>
        <meta name="description" content={SEO.About.description} />
        <meta property="og:title" content={SEO.About.title} />
        <meta property="og:description" content={SEO.About.description} />
        <meta property="og:image" content={SEO.About.image} />
        <meta property="og:type" content={SEO.About.type} />
        <meta name="twitter:title" content={SEO.About.title} />
        <meta name="twitter:description" content={SEO.About.description} />
        <meta name="twitter:image" content={SEO.About.image} />
      </Head>
      <Intro />
      <Member members={members} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const baseUrl = req.headers.host?.startsWith('localhost')
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;

  try {
    // 初始化 Firebase Admin
    await initAdmin();

    const res = await fetch(`${baseUrl}/api/getAllTeamMembers`);
    if (!res.ok) {
      throw new Error(`Failed to fetch members, status: ${res.status}`);
    }

    const members: MemberDataProps[] = await res.json();

    // 使用 Firebase Admin 獲取圖片 URL
    const membersWithImageUrls = await Promise.all(
      members.map(async (member) => {
        const file = admin.storage().bucket().file(`TeamMember/${member.id}/${member.img}`);
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491', // 選擇一個較長的過期時間
        });
        return { ...member, img: url };
      })
    );

    return {
      props: {
        members: membersWithImageUrls,
      },
    };
  } catch (error) {
    console.error('Error fetching members:', error);
    return {
      props: {
        members: [],
      },
    };
  }
};

export default About;

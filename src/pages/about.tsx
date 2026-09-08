import Intro from "@/components/About/Intro";
import Member from "@/components/About/Member";
import SEO from "@/config/SEO.json";
import { GetServerSideProps } from "next";
import { MemberDataProps } from "@/types/Member/Member";
import { getAdminBucket } from "../../lib/firebaseAdmin";
import SkeletonMember from "@/components/Skeleton/SkeletonMember";
import Seo from "@/components/Seo";

interface AboutProps {
  members: MemberDataProps[];
}

const About = ({ members }: AboutProps) => {
  return (
    <>
      <Seo meta={SEO.About} />
      <Intro />
      {
        members.length !== 0 ?
          <Member members={members} />
          :
          <div className="container my-3">
            <SkeletonMember />
          </div>
      }
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const baseUrl = req.headers.host?.startsWith('localhost')
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;

  try {
    const bucket = await getAdminBucket();

    const res = await fetch(`${baseUrl}/api/getAllTeamMembers`);
    if (!res.ok) {
      throw new Error(`Failed to fetch members, status: ${res.status}`);
    }

    const members: MemberDataProps[] = await res.json();

    // 使用 Firebase Admin 獲取圖片 URL
    const membersWithImageUrls = await Promise.all(
      members.map(async (member) => {
        const file = bucket.file(`TeamMember/${member.id}/${member.img}`);
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

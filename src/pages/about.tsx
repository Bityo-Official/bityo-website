import Intro from "@/components/About/Intro";
import Member from "@/components/About/Member";
import Head from "next/head";

const about = () => {
  return (
    <>
      <Head>
        <title>關於我們｜Bityo</title>
      </Head>
      <Intro></Intro>
      <Member></Member>
    </>
  );
};

export default about;

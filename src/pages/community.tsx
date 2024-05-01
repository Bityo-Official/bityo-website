import H2 from "@/components/Title/H2";
import Head from "next/head";

const community = () => {
  return (
    <>
      <Head>
        <title>社群｜Bityo</title>
      </Head>
      <section className="p-5 sm:p-20">
        <H2 className="text-center" title="我們歡迎您的加入" />
        <p className="text-base text-center text-body dark:text-body-dark">我們擁有豐富的社群資源，包含交易及區塊鏈技術。</p>
      </section>
    </>
  );
}

export default community;
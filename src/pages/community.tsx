import H2 from "@/components/Title/H2";
import SEO from "@/config/SEO.json";
import Seo from "@/components/Seo";

const community = () => {
  return (
    <>
      <Seo meta={SEO.Community} />
      <section className="p-5 sm:p-20">
        <H2 className="text-center" title="我們歡迎您的加入" />
        <p className="text-base text-center text-body dark:text-body-dark">我們擁有豐富的社群資源，包含交易及區塊鏈技術。</p>
      </section>
    </>
  );
}

export default community;
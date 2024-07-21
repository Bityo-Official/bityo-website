import PartnerCard from "@/components/Card/PartnerCard";
import List from "@/components/List/CheckedList";
import Head from "next/head";
import SEO from "@/config/SEO.json";

const Partners = () => {
  return (
    <>
      <Head>
        <title>{SEO.Partners.title}</title>
        <meta name="description" content={SEO.Partners.description} />
        <meta property="og:title" content={SEO.Partners.title} />
        <meta property="og:description" content={SEO.Partners.description} />
        <meta property="og:image" content={SEO.Partners.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Partners.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Partners.title} />
        <meta name="twitter:description" content={SEO.Partners.description} />
        <meta name="twitter:image" content={SEO.Partners.image} />
      </Head>
      <section className="p-5 sm:pt-10 sm:px-10 sm:pb-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PartnerCard
            packageName="現缺"
            position="個人代理"
            department="代理部"
            description="歡迎個人或團隊，成為代理或代理商"
            link={{
              text: "了解更多",
              href: "/cooperate/position/agent",
            }}
          >
            <List text="高手續費反傭/反現" />
            <List text="團內不定時抽獎" />
            <List text="優先參與線下活動聚會" />
            <List text="優先客服疑難排解" />
            <List text="合作交易所週邊商品" />
          </PartnerCard>
          <PartnerCard
            packageName="現缺"
            position={"報單群老師"}
            department={"教學部"}
            description="歡迎有帶單交易員背景的人加入"
            link={{
              text: "了解更多",
              href: "/cooperate/position/teacher",
            }}
          >
            <List text="老師特別專屬高反傭" />
          </PartnerCard>
          <PartnerCard
            packageName="現缺"
            position={"量化工程師"}
            department={"開發部"}
            description="歡迎對於量化交易有興趣的人加入"
            link={{
              text: "了解更多",
              href: "/cooperate/position/at",
            }}
          >
            <List text="量化工程師特別專屬高反傭" />
          </PartnerCard>
          <PartnerCard
            packageName="現缺"
            position={"團隊合作"}
            department={"合夥人"}
            description="歡迎交易所及團隊與我們合作"
            link={{
              text: "了解更多",
              href: "/cooperate/position/team",
            }}
          >
            <List text="交易所推廣曝光" />
            <List text="其他團隊資源" />
          </PartnerCard>
        </div>
      </section>
    </>
  )
}

export default Partners;
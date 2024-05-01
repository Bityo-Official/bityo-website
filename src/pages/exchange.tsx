import IntroCard from "@/components/Card/IntroCard";
import List from "@/components/List/CheckedList";
import H2 from "@/components/Title/H2";
import Head from "next/head";

const exchange = () => {
  return (
    <>
      <Head>
        <title>交易所｜Bityo</title>
      </Head>
      <section className="p-5 sm:pt-10 sm:px-10 sm:pb-20">
        <H2 className="text-center" title="幣友合作的交易所" />
        <p className="text-base text-center text-body dark:text-body-dark">提供市場最低手續費減免反傭</p>
        <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 "> { /* xl:grid-cols-3 */}
          <IntroCard
            title="Bitunix - 合約交易所"
            img="/background/bitunix.webp"
            link="https://www.bitunix.com/register?vipCode=bityo"
            type={{
              name: "合約交易所",
              bgColor: "bg-primary",
            }}
          >
            <IntroCard.Description>
              <List text="全球衍生品交易量Top20交易所" />
              <List text="US/CA/PH MSB合規牌照及Cobo安全託管" />
              <List text="2023杜拜未來區塊鏈峰會黃金贊助商" />
              <List text="七折手續費減免" />
            </IntroCard.Description>
            <IntroCard.Footer
              data={[
                {
                  title: "專屬邀請碼",
                  description: "Bityo",
                  link: "https://www.bitunix.com/register?vipCode=bityo",
                },
                {
                  title: "現貨/合約 手續費減免",
                  description: "30%/20%",
                  link: "https://www.bitunix.com/register?vipCode=bityo",
                }
              ]}
            />
          </IntroCard>
          <IntroCard
            title="Pionex 派網 - 量化交易所"
            img="/background/pionex.webp"
            link="https://www.pionex.com/signUp?r=bityo"
            type={{
              name: "量化交易所",
              bgColor: "bg-primary",
            }}
          >
            <IntroCard.Description>
              <List text="美國42州授權許可" />
              <List text="SEC監管投資顧問" />
              <List text="證劵經濟交易商申請遞交" />
              <List text="樂天桃猿 2023 贊助商" />
              <List text="量化交易龍頭交易所" />
            </IntroCard.Description>
            <IntroCard.Footer
              data={[
                {
                  title: "專屬邀請碼",
                  description: "Bityo",
                  link: "https://www.pionex.com/signUp?r=bityo",
                },
                {
                  title: "現貨/合約 手續費減免",
                  description: "20%/20%",
                  link: "https://www.pionex.com/signUp?r=bityo",
                }
              ]}
            />
          </IntroCard>
        </div>
      </section>
    </>
  );
}

export default exchange;
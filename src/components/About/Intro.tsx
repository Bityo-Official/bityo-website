import SectionTitle from "@/components/Title/SectionTitle";
import Image from "next/image";
import List from "../List/CheckedList";

const Intro = () => {
  return (
    <>
      <section id="about" className="pt-4 md:pt-5">
        <div className="container">
          <div className="border-b border-body/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4 lg:w-1/2">
                <SectionTitle
                  title="幣友科技團隊"
                  paragraph="我們是於 2023 年成立的區塊鏈教育團隊，專注在量化交易及智能合約開發，帶領學員及新手邁入區塊鏈的第一步。"
                  mb="44px"
                />

                <div
                  className="mb-12 max-w-[570px] lg:mb-0"
                  data-wow-delay=".15s"
                >
                  <div className="mx-[-12px] flex flex-wrap">
                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="區塊鏈教育" />
                      <List text="加密貨幣教育" />
                      <List text="智能合約開發" />
                    </div>

                    <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                      <List text="量化交易平台" />
                      <List text="跟單交易平台" />
                      <List text="高手續費減免" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                  <Image
                    src="/icon/bityo.png"
                    alt="about-image"
                    width={1920}
                    height={1920}
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px'
                    quality={0}
                    priority
                    className="mx-auto max-w-full drop-shadow-three dark:drop-shadow-none lg:mr-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Intro;
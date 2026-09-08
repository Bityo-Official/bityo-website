import { MemberDataProps } from "@/types/Member/Member";
import SEO from "@/config/SEO.json";
import Seo from "@/components/Seo";

const Member = (props: MemberDataProps) => {
  return (
    <>
      {/* 這頁尚未實作內容，暫不開放索引 */}
      <Seo meta={{ ...SEO.About, title: `團隊成員｜幣友 Bityo` }} noindex />
    </>
  )
}

export default Member;
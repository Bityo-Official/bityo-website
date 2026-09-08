import type { GetServerSideProps } from "next";

/**
 * 團隊成員個人頁尚未實作。
 * 先回 404，避免可以被直接訪問卻只看到空白頁（也不會被搜尋引擎收錄）。
 * 實作內容時把 getServerSideProps 換成真正的資料取得即可。
 */
export const getServerSideProps: GetServerSideProps = async () => ({ notFound: true });

const Member = () => null;

export default Member;

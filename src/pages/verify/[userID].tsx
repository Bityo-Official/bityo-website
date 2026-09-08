import type { GetServerSideProps } from "next";

/**
 * 依 userID 查驗證結果的頁面尚未實作（原本只會把 userID 印出來）。
 * 先回 404，避免可以被直接訪問卻只看到一組 ID。
 * 官方驗證查詢功能目前在 /verify。
 */
export const getServerSideProps: GetServerSideProps = async () => ({ notFound: true });

const UserVerification = () => null;

export default UserVerification;

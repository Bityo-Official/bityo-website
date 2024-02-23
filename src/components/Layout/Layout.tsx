import { ReactNode } from "react";
import Head from "next/head"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutData } from "@/types/Layout/Layout";
import Particles from "../particles";

const Layout = ({ children }: LayoutData) => {
  return (
    <>
      {/* HEAD */}
      <Head>
        <meta name="description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta name="keywords" content="Bityo,幣友,Crypto,加密,CryptoCurrency,加密貨幣,BTC,Bitcoin,比特幣,ETH,Ethereum,乙太坊" />
        <meta name="author" content="TershiXia" />
        <meta name="copyright" content="Bityo" />
        <meta httpEquiv="Content-Language" content="zh-TW" />
        <meta property="og:title" content="Bityo 幣友官方網站" />
        <meta property="og:description" content="一個致力於研究區塊鏈和程式設計的台灣團隊，發展區塊鏈教育。" />
        <meta property="og:image" content="https://bityo.tw/imgs/bityo_bg_circle.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      </Head>

      {/* Body */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Particles
            className="absolute inset-0 -z-10 animate-fade-in"
            quantity={1000}
          />
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout;

import { ReactNode } from "react";
import Head from "next/head"
import Navbar from "./Navbar";
import Footer from "./Footer";
import { LayoutData } from "@/types/Layout/Layout";
import Particles from "../particles";

const Layout = ({ children }: LayoutData) => {
  return (
    <>
      {/* Body */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="grow">
          {/* 粒子每一幀都要重畫，數量直接等於 CPU 成本。
              1000 顆在低階裝置上明顯吃效能，視覺密度差異其實不大。
              想調回原本的視覺，把 quantity 改回 1000 即可。 */}
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
            quantity={400}
          />
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout;

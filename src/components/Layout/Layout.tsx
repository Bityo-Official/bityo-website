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
        <main className="flex-grow">
          <Particles
            className="fixed inset-0 -z-10 animate-fade-in"
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

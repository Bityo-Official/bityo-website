import SectionTitle from "@/components/Title/SectionTitle";
import MemberCard from "../Card/MemberCard";
import { faFacebook, faInstagram, faTelegram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const MemberData = [
  {
    img: "/avater/tsx.jpg",
    name: "夏特稀",
    uid: "000000000",
    position: "CEO & Co-Founder",
    description: "",
    socials: {
      facebook: "https://www.facebook.com/TershiXia",
      twitter: "https://www.twitter.com/TershiXia",
      instagram: "https://www.instagram.com/TershiXia",
      tiktok: "https://www.tiktok.com/tsx526",
      globe: "https://tershi.com",
      telegram: "https://t.me/tershixia",
    }
  },
  {
    img: "/avater/yian.jpeg",
    name: "小霸王",
    uid: "000000000",
    position: "秘書兼吉祥物",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    }
  },
  {
    img: "",
    name: "Gallace",
    uid: "000000000",
    position: "Co-Founder & 助理",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
    }
  },
  {
    img: "",
    name: "Eric",
    uid: "000000000",
    position: "Co-Founder & 助理",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    }
  },
  {
    img: "/avater/roalx.jpg",
    name: "ROALX (晨光)",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: {
      facebook: "https://www.facebook.com/profile.php?id=100085615297125",
      twitter: "https://twitter.com/ChenGuang0812",
      instagram: "https://www.instagram.com/roalx._.87/",
      youtube: "https://www.tiktok.com/@roalx._.87",
      globe: "https://chenguang.vercel.app/",
    }
  },
  {
    img: "/avater/salt.jpeg",
    name: "Salz von Einzbern",
    uid: "000000000",
    position: "助教｜開發部",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    }
  },
  {
    img: "",
    name: "Lonax",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    }
  },
  {
    img: "",
    name: "Hong",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: {
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    }
  },
]

const Member = () => {
  return (
    <>
      <section id="about" className="pt-4 md:pt-5">
        <div className="container">
          <div className="border-b border-body/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4">
                <SectionTitle
                  title="團隊陣容"
                  mb="44px"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
                  {
                    MemberData.map((member, index) => (
                      <div key={index}>
                        <MemberCard
                          img={member.img}
                          name={member.name}
                          position={member.position}
                          description={member.description}
                          socials={member.socials}
                          uid="000000000"
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Member;
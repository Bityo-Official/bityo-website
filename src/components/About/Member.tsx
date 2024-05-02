import SectionTitle from "@/components/Title/SectionTitle";
import MemberCard from "../Card/MemberCard";
import { faFacebook, faInstagram, faTelegram, faTiktok, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const MemberData = [
  {
    img: "/avater/tsx.jpg",
    name: "夏特稀",
    uid: "000000000",
    position: "CEO & Co-Founder",
    description: "",
    socials: [
      { link: "https://www.facebook.com/TershiXia", icon: 'faFacebook', color: "#1F8EF4" },
      { link: "https://www.twitter.com/TershiXia", icon: 'faTwitter', color: "#D92F7E" },
      { link: "https://www.instagram.com/TershiXia", icon: 'faInstagram', color: "#FF0000" },
      { link: "https://www.tiktok.com/tsx526", icon: 'faTiktok', color: "#000" },
      { link: "https://tershi.com", icon: 'faGlobe', color: "#27A5E4" },
    ],
  },
  {
    img: "/avater/yian.jpeg",
    name: "小霸王",
    uid: "000000000",
    position: "秘書兼吉祥物",
    description: "",
    socials: [],
  },
  {
    img: "/avater/gallace.png",
    name: "Gallace",
    uid: "000000000",
    position: "Co-Founder & 助理",
    description: "",
    socials: [],
  },
  {
    img: "/avater/eric.webp",
    name: "Eric",
    uid: "000000000",
    position: "Co-Founder & 助理",
    description: "",
    socials: [],
  },
  {
    img: "/avater/roalx.jpg",
    name: "ROALX (晨光)",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: [
      { link: "https://www.facebook.com/profile.php?id=100085615297125", icon: 'faFacebook', color: "#1F8EF4" },
      { link: "https://www.youtube.com/@ROALX", icon: 'faYoutube', color: "#FF0000" },
      { link: "https://www.instagram.com/roalx._.87/", icon: 'faInstagram', color: "#FF0000" },
      { link: "https://www.tiktok.com/@roalx._.87", icon: 'faTiktok', color: "#000" },
      { link: "https://chenguang.vercel.app/", icon: 'faGlobe', color: "#27A5E4" },
    ],
  },
  {
    img: "/avater/salt.jpeg",
    name: "Salz von Einzbern",
    uid: "000000000",
    position: "助教｜開發部",
    description: "",
    socials: [],
  },
  {
    img: "",
    name: "Lonax",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: [],
  },
  {
    img: "",
    name: "Hong",
    uid: "000000000",
    position: "代理｜行銷部",
    description: "",
    socials: [],
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
                          uid="000000000"
                        >
                          <MemberCard.Header
                            img={member.img}
                          />
                          <MemberCard.Infomartion
                            name={member.name}
                            position={member.position}
                          />
                          <MemberCard.Footer>
                            {
                              member.socials.map((social, index) => (
                                <MemberCard.Socials
                                  key={index}
                                  link={social.link}
                                  icon={social.icon}
                                  color={social.color}
                                />
                              ))
                            }
                          </MemberCard.Footer>
                        </MemberCard>
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
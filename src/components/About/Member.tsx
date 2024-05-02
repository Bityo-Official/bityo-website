import SectionTitle from "@/components/Title/SectionTitle";
import MemberCard from "../Card/MemberCard";
import MemberData from "@/config/MemberData.json";
import { MemberDataProps } from "@/types/Member/Member";

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
                  {
                    MemberData.map((member: MemberDataProps, index: number) => (
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
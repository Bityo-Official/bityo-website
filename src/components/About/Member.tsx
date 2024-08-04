import SectionTitle from "@/components/Title/SectionTitle";
import ProfileCard from "../Card/ProfileCard";
import { MemberDataProps } from "@/types/Member/Member";
import FaceBookIcon from "@/images/icon/fb.svg";
import XIcon from "@/images/icon/x.svg";
import IGIcon from "@/images/icon/ig.svg";
import TikTokIcon from "@/images/icon/tiktok.svg";
import GlobeIcon from "@/images/icon/globe.svg";

interface MemberProps {
  members: MemberDataProps[];
}

const Member = ({ members }: MemberProps) => {
  if (!members || !Array.isArray(members)) {
    return <div>No members found</div>;
  }

  return (
    <>
      <section id="about" className="pt-4 md:pt-5">
        <div className="container">
          <div className="border-b border-body/[.15] pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28">
            <div className="-mx-4 flex flex-wrap items-center">
              <div className="w-full px-4">
                <SectionTitle title="團隊陣容" mb="44px" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 justify-items-center">
                  {members.map((member: MemberDataProps, index: number) => (
                    <div key={index}>
                      <ProfileCard uid={member.uid}>
                        <ProfileCard.Header img={member.img} />
                        <ProfileCard.Infomartion name={member.name} position={member.position} />
                        <ProfileCard.Footer>
                          {member.socials.facebook && (
                            <ProfileCard.Socials
                              icon={FaceBookIcon}
                              link={member.socials.facebook} />
                          )}
                          {member.socials.twitter && (
                            <ProfileCard.Socials
                              icon={ XIcon }
                              link={member.socials.twitter}
                              className="dark:invert"
                            />
                          )}
                          {member.socials.instagram && (
                            <ProfileCard.Socials
                              icon={IGIcon}
                              link={member.socials.instagram} />
                          )}
                          {member.socials.tiktok && (
                            <ProfileCard.Socials
                              icon={TikTokIcon}
                              link={member.socials.tiktok}
                              className="invert dark:invert-0"
                            />
                          )}
                          {member.socials.globe && (
                            <ProfileCard.Socials
                              icon={GlobeIcon}
                              link={member.socials.globe}
                              className="dark:invert"
                            />
                          )}
                        </ProfileCard.Footer>
                      </ProfileCard>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Member;

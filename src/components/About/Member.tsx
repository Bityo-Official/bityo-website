import SectionTitle from "@/components/Title/SectionTitle";
import ProfileCard from "../Card/ProfileCard";
import { MemberDataProps } from "@/types/Member/Member";

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
                            icon="faFacebook"
                            color="text-[#1F8EF4]"
                            link={member.socials.facebook} />
                          )}
                          {member.socials.twitter && (
                            <ProfileCard.Socials
                            icon="faTwitter"
                            color="text-[#D92F7E]"
                            link={member.socials.twitter} />
                          )}
                          {member.socials.instagram && (
                            <ProfileCard.Socials
                            icon="faInstagram"
                            color="text-[#FF0000]"
                            link={member.socials.instagram} />
                          )}
                          {member.socials.tiktok && (
                            <ProfileCard.Socials
                            icon="faTiktok"
                            color="text-[#000]"
                            link={member.socials.tiktok} />
                          )}
                          {member.socials.globe && (
                            <ProfileCard.Socials
                            icon="faGlobe"
                            color="text-[#27A5E4]"
                            link={member.socials.globe} />
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

import { PartnerCardProps } from "@/types/Card/PartnerCard";
import { useRouter } from "next/router";

const PartnerCard = (props: PartnerCardProps) => {
  const router = useRouter();

  return (
    <>
      <div className="relative z-10 rounded-sm bg-white px-8 py-10 shadow-three dark:bg-txt-dark dark:shadow-two transition-transform duration-300 transform hover:scale-105 hover:shadow-two dark:hover:shadow-txt-dark">
        <div className="flex items-center justify-between">
          <h3 className="price mb-2 text-[32px] font-bold text-black dark:text-white">
            <span className="amount">{props.position}</span>
            <span className="time text-lg font-medium text-body">
              /{props.department}
            </span>
          </h3>
          <h4 className="mb-2 text-xl font-bold text-txt-dark dark:text-white">
            {props.packageName}
          </h4>
        </div>
        <p className="mb-7 text-base text-body">{props.description}</p>
        <div className="mb-8 border-b border-body-color border-opacity-10 pb-8 dark:border-white dark:border-opacity-10">
          <button
            onClick={() => router.push(props.link.href)}
            className="flex w-full items-center justify-center rounded-sm bg-web-green p-3 text-base font-semibold text-white transition department-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
          >
            {props.link.text}
          </button>
        </div>
        <div>{props.children}</div>
      </div>
    </>
  );
};

export default PartnerCard;

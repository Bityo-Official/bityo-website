import { SectionTitleProps } from "@/types/Title/SectionTitle";

const SectionTitle = ({
    title,
    paragraph,
    width = "570px",
    center,
    mb = "100px",
  }: SectionTitleProps) => {
    return (
      <>
        <div
          className={`w-full ${center ? "mx-auto text-center" : ""}`}
          style={{ maxWidth: width, marginBottom: mb }}
        >
          <h2 className="mb-4 text-3xl font-bold !leading-tight text-black dark:text-white sm:text-4xl md:text-[45px]">
            {title}
          </h2>
          <p className="text-base !leading-relaxed text-body dark:text-body-dark md:text-lg">
            {paragraph}
          </p>
        </div>
      </>
    );
  };
  
  export default SectionTitle;
  
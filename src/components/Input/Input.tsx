import { ExtendedInputProps } from "@/types/Input/Input";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = (props: ExtendedInputProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<boolean | null>(null);
  const [content, setContent] = useState<string>('');

  // 掛載後設定 mounted 為 true
  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果按下 Enter 鍵，則執行 handleClick 函式
  const handleClick = () => {
    if (props.validate) {
      const isValid = props.validate(content);
      setError(!isValid);
      if (isValid) {
        props.onCorrect && props.onCorrect();
      } else {
        props.onError && props.onError();
      }
    }
  };

  // 如果按下 Enter 鍵，則執行 handleBlur 函式
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleClick();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="relative w-full min-w-[200px] h-10">
        {props.icon && (
          <button onClick={handleClick} className="grid place-items-center absolute text-web-green top-2/4 right-3 -translate-y-2/4 w-5 h-5">
            <FontAwesomeIcon icon={props.icon} />
          </button>
        )}
        <input
          type={props.type}
          className={`peer w-full h-full bg-transparent font-sans font-normal outline outline-0 focus:outline-0 disabled:border-0 disabled:cursor-not-allowed transition-all placeholder-shown:border border focus:border-2 border-t-transparent focus:border-t-transparent placeholder:opacity-0 focus:placeholder:opacity-100 text-sm px-3 py-2.5 rounded-[7px] ${props.className} ${theme === 'dark' ? 'text-web-green disabled:bg-blue-gray-50 placeholder-shown:border-web-green placeholder-shown:border-b-web-green placeholder-shown:border-t-web-green focus:border-web-green border-web-green border-t-transparent' : 'text-blue-gray-700 disabled:bg-blue-gray-50  placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border-blue-gray-200 focus:border-gray-900'}`}
          placeholder=" "
          onChange={e => setContent(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <label
          className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate dark:peer-placeholder-shown:text-web-green/70 leading-tight peer-focus:leading-tight peer-disabled:text-transparent dark:peer-disabled:peer-placeholder-shown:text-web-green/60 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] dark:text-web-green/50 dark:peer-focus:text-web-green dark:before:border-web-green dark:peer-focus:before:!border-web-green dark:after:border-web-green dark:peer-focus:after:!border-web-green peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900"
        >
          {props.placeholder}
        </label>
      </div>
    </>
  );
};

export default Input;
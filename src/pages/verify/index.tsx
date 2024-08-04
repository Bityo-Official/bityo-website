import Head from 'next/head';
import { Tooltip, Avatar, Typography, dialog } from "@material-tailwind/react";
import Input from "@/components/Input/Input";
import { faCircleCheck, faCircleXmark, faMagnifyingGlass, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import AuthList from "@/config/AuthList.json";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DialogVerify from '@/components/Dialog/Dialog';
import SEO from "@/config/SEO.json";

const UserVerification = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogData, setDialogData] = useState({ title: '', message: '', footer: '', icon: faMagnifyingGlass, status: false });
  const [content, setContent] = useState('');
  const [authType, setAuthType] = useState('');


  // 驗證輸入值是否為官方驗證內容
  const validateAuthInput = (value: string): boolean => {
    setContent(value);
    const authItem = AuthList.find(auth => auth.content === value);
    if (authItem) {
      setAuthType(authItem.type);
      return true;
    }
    setAuthType('');
    return false;
  };

  // 驗證通過
  const handleCorrect = () => {
    setDialogData({
      title: '驗證通過',
      message: '已通過 BITYO 官方認證',
      footer: '您查詢的資訊已經被 幣友 BITYO 官方確認。',
      icon: faCircleCheck,
      status: true,
    });
    setDialogOpen(true);
  };

  // 驗證失敗
  const handleError = () => {
    setDialogData({
      title: '失敗',
      message: '此資訊無法認證',
      footer: '您查詢的資訊尚未被 幣友 BITYO 官方確認。',
      icon: faCircleXmark,
      status: false,
    });
    setDialogOpen(true);
  };

  // 關閉 Dialog
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Head>
        <title>{SEO.Verify.title}</title>
        <meta name="description" content={SEO.Verify.description} />
        <meta property="og:title" content={SEO.Verify.title} />
        <meta property="og:description" content={SEO.Verify.description} />
        <meta property="og:image" content={SEO.Verify.image} />
        {/* <meta property="og:url" content={`https://yourdomain.com/post/${post.frontMatter.id}`} /> */}
        <meta property="og:type" content={SEO.Verify.type} />
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content={SEO.Verify.title} />
        <meta name="twitter:description" content={SEO.Verify.description} />
        <meta name="twitter:image" content={SEO.Verify.image} />
      </Head>

      <section className="flex flex-col items-center pt-14 sm:pb-28 sm:justify-center h-[calc(100vh-64px)] text-center">
        <Avatar
          src="/icon/bityo_bg2.png"
          alt="avatar"
          size="xxl"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          withBorder={true}
          className="p-1 border-bityo"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <p className="mt-4 text-3xl tracking-tighter sm:tracking-widest">幣友 BITYO｜官方驗證渠道</p>

        <div className="w-full px-5 sm:w-[32rem] block justify-items-center mt-6">
          <Input
            type="text"
            placeholder="官方驗證查詢"
            icon={faMagnifyingGlass}
            validate={validateAuthInput}
            onCorrect={handleCorrect}
            onError={handleError}
          />
          <Typography
            variant="small"
            color="gray"
            className="mt-2 flex items-center gap-1 font-normal dark:text-body"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Tooltip
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom-start"
              className="dark:bg-[rgba(50,53,64,0.92)] border-2 border-web-green"
              content={
                <div className="w-80">
                  <Typography
                    color="white"
                    className="font-medium flex gap-1"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <FontAwesomeIcon icon={faTriangleExclamation} className='w-5' />
                    請檢查您輸入的內容
                  </Typography>
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal opacity-80"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    <ul className="list-disc pl-5">
                      <li>IG：前面必須加入「@」</li>
                      <li>TG：前面必須加入「@」</li>
                      <li>DC：前面必須是使用者名稱</li>
                      <li>FB：前面必須是名稱或是ID或網址</li>
                      <li>email：前面必須是「使用者名稱@網域」</li>
                    </ul>

                  </Typography>
                </div>
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="-mt-px h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </Tooltip>
            支援查詢網域、TG、FB、IG、DC、Email
          </Typography>
        </div>
      </section>

      <DialogVerify
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={dialogData.message}
        title={dialogData.title}
        type={authType}
        content={content}
        footer={dialogData.footer}
        icon={dialogData.icon}
        status={dialogData.status}
      />
    </>
  )
}

export default UserVerification;

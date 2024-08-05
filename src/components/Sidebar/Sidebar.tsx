import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Drawer,
  Card,
} from "@material-tailwind/react";
import { SidebarListItemProps, SidebarProps } from "@/types/Sidebar/Sidebar";
import BityoIcon from "@/images/icon/bityo.png";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import AlertCard from "../Alert/AlertCard";
import toast from "react-hot-toast";

const SidebarListItem = (props: SidebarListItemProps) => {
  const router = useRouter();

  return (
    <ListItem
      disabled={props.disabled}
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      onClick={() => {
        props.onClick && props.onClick();
        router.push(props.link);
      }}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <ListItemPrefix
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <props.icon className="h-5 w-5" />
      </ListItemPrefix>
      {props.text}
      {
        props.chip && (
          <ListItemSuffix
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Chip
              value={props.chip.value}
              size={props.chip.size}
              variant="ghost"
              color={props.chip.color}
              className="rounded-full"
            />
          </ListItemSuffix>
        )
      }
    </ListItem>
  )
}

const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(props.isDrawerOpen);
  const router = useRouter();

  useEffect(() => {
    setIsDrawerOpen(props.isDrawerOpen);
  }, [props.isDrawerOpen]);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    props.setIsDrawerOpen(false);
  };

  return (
    <>
      <Drawer open={isDrawerOpen}
        onClose={closeDrawer}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placement="right"
        className="text-white dark:bg-txt-dark"
        transition={{ type: "spring", duration: 0.8 }}
        overlayProps={{
          className: "fixed",
          onClick: closeDrawer
        }} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <Card
          color="transparent"
          shadow={false}
          className="h-full w-full p-4 overflow-y-auto" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          <button
            className="mb-2 flex items-center gap-4 p-4"
            onClick={() => {
              router.push('/');
              closeDrawer();
            }}
          >
            <Image
              src={BityoIcon}
              alt="Bityo"
              className="h-8 w-8"
            />
            <Typography variant="h5" className="text-black dark:text-white" nonce={undefined} onResize={undefined} onResizeCapture={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              Bityo
            </Typography>
          </button>
          <List nonce={undefined} onResize={undefined} onResizeCapture={undefined} className="dark:text-blue-gray-100" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            {
              props.ListData.map((item, index) => (
                <SidebarListItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  link={item.link}
                  disabled={item.disabled}
                  onClick={() => {
                    item.onClick && item.onClick();
                    closeDrawer();
                  }}
                  chip={item.chip}
                />
              ))
            }
          </List>
          <AlertCard
            icon={"symbol"}
            title="幣友合夥人計畫"
            description="加入幣友，成為合夥人，可以獲取高額反傭，還有更多福利等你來拿。"
            openAlert={openAlert}
            onClose={() => setOpenAlert(false)}
            leftBtn={{
              text: "取消",
              onClick: () => setOpenAlert(false)
            }}
            rightBtn={{
              text: "了解更多",
              onClick: () => {
                toast.error("此功能尚未開放！\n敬請期待", {
                  duration: 2000,
                  position: 'top-left',
                })
                router.push('/cooperate/partners');
                closeDrawer();
              }
            }}
          />
        </Card>
      </Drawer>
    </>
  );
}

export default Sidebar;

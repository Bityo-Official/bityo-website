import React, { useState } from "react";
import Drawer from "@/components/ui/Drawer";
import Typography from "@/components/ui/Typography";
import Chip from "@/components/ui/Chip";
import { List, ListItem, ListItemPrefix, ListItemSuffix } from "@/components/ui/List";
import { SidebarListItemProps, SidebarProps } from "@/types/Sidebar/Sidebar";
import BityoIcon from "@/images/icon/bityo.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AlertCard from "../Alert/AlertCard";
import toast from "react-hot-toast";

const SidebarListItem = (props: SidebarListItemProps) => {
  const router = useRouter();

  return (
    <ListItem
      disabled={props.disabled}
      onClick={() => {
        props.onClick?.();
        router.push(props.link);
      }}
    >
      <ListItemPrefix>
        <props.icon className="h-5 w-5" />
      </ListItemPrefix>
      {props.text}
      {props.chip && (
        <ListItemSuffix>
          <Chip
            value={props.chip.value}
            size={props.chip.size}
            color={props.chip.color}
            className="rounded-full"
          />
        </ListItemSuffix>
      )}
    </ListItem>
  );
};

const Sidebar = (props: SidebarProps) => {
  const [openAlert, setOpenAlert] = useState(true);
  const router = useRouter();

  const closeDrawer = () => props.setIsDrawerOpen(false);

  return (
    <Drawer
      open={props.isDrawerOpen}
      onClose={closeDrawer}
      placement="right"
      className="bg-white text-black dark:bg-txt-dark dark:text-white"
    >
      <div className="flex h-full w-full flex-col overflow-y-auto p-4">
        <button
          type="button"
          className="mb-2 flex items-center gap-4 p-4"
          onClick={() => {
            router.push("/");
            closeDrawer();
          }}
        >
          <Image src={BityoIcon} alt="Bityo" className="h-8 w-8" />
          <Typography variant="h5" className="text-black dark:text-white">
            Bityo
          </Typography>
        </button>

        <List className="dark:text-blue-gray-100">
          {props.ListData.map((item) => (
            <SidebarListItem
              key={item.link}
              icon={item.icon}
              text={item.text}
              link={item.link}
              disabled={item.disabled}
              onClick={() => {
                item.onClick?.();
                closeDrawer();
              }}
              chip={item.chip}
            />
          ))}
        </List>

        <AlertCard
          icon={"symbol"}
          title="幣友合夥人計畫"
          description="加入幣友，成為合夥人，可以獲取高額反傭，還有更多福利等你來拿。"
          openAlert={openAlert}
          onClose={() => setOpenAlert(false)}
          leftBtn={{
            text: "取消",
            onClick: () => setOpenAlert(false),
          }}
          rightBtn={{
            text: "了解更多",
            onClick: () => {
              toast.error("此功能尚未開放！\n敬請期待", {
                duration: 2000,
                position: "top-left",
              });
              router.push("/cooperate/partners");
              closeDrawer();
            },
          }}
        />
      </div>
    </Drawer>
  );
};

export default Sidebar;

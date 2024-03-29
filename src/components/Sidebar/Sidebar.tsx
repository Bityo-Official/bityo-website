import React, { useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Alert,
  Input,
  Drawer,
  Card,
  // Accordion,
  // AccordionHeader,
  // AccordionBody,
} from "@material-tailwind/react";
import {
  InformationCircleIcon,
  CurrencyDollarIcon,
  ChatBubbleLeftRightIcon,
  ChartBarSquareIcon,
  Square3Stack3DIcon,
  Cog6ToothIcon,
  PresentationChartBarIcon,
  UserCircleIcon,
  // ChevronDownIcon,
  // ChevronRightIcon,
  // ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import {
  CubeTransparentIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { SidebarProps } from "@/types/Sidebar/Sidebar";
import Icon from "@/components/Icon";
import BityoIcon from "@/images/icon/bityo.png";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

const Sidebar = (props: SidebarProps) => {
  const [open, setOpen] = React.useState(0);
  const [openAlert, setOpenAlert] = React.useState(true);
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
      >
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          <button
            className="mb-2 flex items-center gap-4 p-4"
            onClick={() => {
              router.push('/');
              closeDrawer();
            }}
          >
            <Icon
              icon_light={BityoIcon}
              className="h-8 w-8"
            />
            <Typography variant="h5" className="text-black dark:text-white" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              Bityo
            </Typography>
          </button>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="搜尋" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          </div>
          <List nonce={undefined} onResize={undefined} onResizeCapture={undefined} className="dark:text-blue-gray-100">
            {/* <Accordion
              open={open === 1}
              icon={<ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`} />}  nonce={undefined} onResize={undefined} onResizeCapture={undefined}            >
              <ListItem className="p-0" selected={open === 1}  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}                >
                  <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                  <ListItem  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion> */}
            {/* <Accordion
              open={open === 2}
              icon={<ChevronDownIcon
                strokeWidth={2.5}
                className={`mx-auto h-4 w-4 transition-transform ${open === 2 ? "rotate-180" : ""}`} />}  nonce={undefined} onResize={undefined} onResizeCapture={undefined}            >
              <ListItem className="p-0" selected={open === 2}  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}                >
                  <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0"  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                  <ListItem  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                    <ListItemPrefix  nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion> */}
            {/* <hr className="my-2 border-blue-gray-50" /> */}
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/market')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              我的帳戶
            </ListItem>
            <ListItem
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/market')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <ChartBarSquareIcon className="h-5 w-5" />
              </ListItemPrefix>
              市場行情
              <ListItemSuffix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <Chip
                  value="11"
                  size="sm"
                  variant="ghost"
                  color="light-green"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/community')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <ChatBubbleLeftRightIcon className="h-5 w-5" />
              </ListItemPrefix>
              社群
            </ListItem>
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/exchanges')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <CurrencyDollarIcon className="h-5 w-5" />
              </ListItemPrefix>
              交易所
            </ListItem>
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/quantify')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <Square3Stack3DIcon className="h-5 w-5" />
              </ListItemPrefix>
              量化交易
            </ListItem>
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/follow')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              跟單平台
            </ListItem>
            <ListItem
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/about')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <InformationCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              關於我們
            </ListItem>
            <ListItem
              disabled={true}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onClick={() => {
                router.push('/settings')
                closeDrawer();
              }}>
              <ListItemPrefix nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              設定
            </ListItem>
          </List>
          <Alert
            open={openAlert}
            className="mt-auto"
            onClose={() => setOpenAlert(false)}
          >
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              幣友合夥人計畫
            </Typography>
            <Typography variant="small" className="font-normal opacity-80" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              加入幣友，成為合夥人，可以獲取高額反傭，還有更多福利等你來拿。
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)} nonce={undefined} onResize={undefined} onResizeCapture={undefined}
              >
                取消
              </Typography>
              <Typography
                onClick={() => {
                  toast.error("此功能尚未開放！\n敬請期待", {
                    duration: 2000,
                    position: 'top-left',
                  })
                }}
                as="a"
                href="#"
                variant="small"
                className="font-medium" nonce={undefined} onResize={undefined} onResizeCapture={undefined}
              >
                取得更多
              </Typography>
            </div>
          </Alert>
        </Card>
      </Drawer>
    </>
  );
}

export default Sidebar;
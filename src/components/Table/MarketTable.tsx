import { TableProps } from "@/types/Table/MarketTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import Chip from "@/components/Chip/Chip";

// 搜尋幣種
const searchName = (cache: string, rows: any) => {
  return rows.filter((row: any) => {
    return row.name.toLowerCase().includes(cache.toLowerCase()) || row.full_name.toLowerCase().includes(cache.toLowerCase());
  });
}

// TD 的文字(成交量等)
const TableText = (props: { classes: string, text: string | number }) => {
  return (
    <td className={props.classes}>
      <div className="flex flex-col">
        <Typography
          variant="small"
          className="font-normal text-gray-800 dark:text-gray-100" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          {props.text}
        </Typography>
      </div>
    </td>
  )
}

const MembersTable = (props: TableProps) => {
  const router = useRouter();

  // 搜尋的暫存
  const [cache, setCache] = useState('');

  // 搜尋後的資料
  const [filteredData, setFilteredData] = useState(props.rows);

  // 目前選取的交易所
  const [exchangesData, setExchangesData] = useState({ label: props.tab[0].label, exchange: props.tab[0].value, color: props.tab[0].color, bgColor: props.tab[0].bgColor });

  useEffect(() => {
    setFilteredData(searchName(cache, props.rows));
  }, [cache]);


  return (
    <Card className={`h-full w-full ${props.className} dark:bg-txt-dark`} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>

      {/* 表格頂端列 */}
      <CardHeader floated={false} shadow={false} className="rounded-none dark:bg-txt-dark" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h3" className="text-black dark:text-white" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              加密貨幣市場
            </Typography>
            <Typography color="gray" className="mt-1 font-normal dark:text-gray-500" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              查看最近火熱的加密貨幣市場
            </Typography>
          </div>
        </div>

        {/* 交易所選擇 */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="pionex" className="w-full md:w-max">
            <TabsHeader nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              {props.tab.map(({ label, value, disabled, color, bgColor }) => (
                <Tab disabled={disabled} key={value} onClick={() => { setExchangesData({ label: label, exchange: value, color: color, bgColor: bgColor }) }} value={value} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>

          {/* 搜尋對話框 */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              onChange={(e) => setCache(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />} nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          </div>
        </div>
      </CardHeader>

      {/* 表格內容 */}
      <CardBody className="overflow-scroll px-0" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">

          {/* 表格的標題 */}
          <thead>
            <tr>
              {props.head.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4"
                >
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100" nonce={undefined} onResize={undefined} onResizeCapture={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>

          {/* 表格的內容 */}
          <tbody>
            {filteredData.map(
              ({ img, name, full_name, price }, index) => {
                const isLast = index === props.rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 dark:border-blue-gray-800";

                return (
                  <tr className="hover:bg-gray-300 dark:hover:bg-gray-800 hover:cursor-pointer" key={name} onClick={() => router.push(`/market/${exchangesData.exchange}/${name}`)}>
                    {/* 幣種 */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-800 dark:text-gray-100" nonce={undefined} onResize={undefined} onResizeCapture={undefined} >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal opacity-70 text-gray-800 dark:text-gray-100" nonce={undefined} onResize={undefined} onResizeCapture={undefined} >
                            {full_name}
                          </Typography>
                        </div>
                      </div>
                    </td>

                    {/* 交易所 */}
                    <td className={classes}>
                      <div className="flex">
                        <Chip
                          text={exchangesData.label}
                          color={exchangesData.color}
                          bgColor={exchangesData.bgColor}
                        />
                      </div>
                    </td>

                    {/* 價格 */}
                    <TableText
                      classes={classes}
                      text={price}
                    />

                    {/* 24h% */}
                    <TableText
                      classes={classes}
                      text={price}
                    />

                    {/* 24h 成交量 */}
                    <TableText
                      classes={classes}
                      text={price}
                    />

                    {/* 最高 */}
                    <TableText
                      classes={classes}
                      text={price}
                    />

                    {/* 最低 */}
                    <TableText
                      classes={classes}
                      text={price}
                    />
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 dark:border-blue-gray-900 p-4" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <Typography variant="small" className="font-normal text-gray-800 dark:text-gray-100" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          第1頁，共1頁
        </Typography>
        <div className="flex gap-2">
          <Button className="text-gray-800 dark:text-gray-100 border-gray-400" variant="outlined" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            上一頁
          </Button>
          <Button className="text-gray-800 dark:text-gray-100 border-gray-400" variant="outlined" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            下一頁
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MembersTable;
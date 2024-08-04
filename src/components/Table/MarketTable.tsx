import { TableProps } from "@/types/Table/MarketTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
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
import { useEffect, useState, useRef } from "react";
import Chip from "@/components/Chip/Chip";
import Image from "next/image";
import BityoIcon from "@/images/icon/bityo_bg2.png";
import { useTheme } from "next-themes";

interface SortConfig {
  key: keyof RowData;
  direction: 'ascending' | 'descending';
}

interface RowData {
  img: string;
  name: string;
  full_name: string;
  price: number;
  vol24h: number;
  vol24p: number;
  high: number;
  low: number;
}

// 搜尋幣種
const searchName = (cache: string, rows: RowData[]) => {
  return rows.filter((row: RowData) => {
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
          className="font-normal text-gray-800 dark:text-gray-100"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {props.text}
        </Typography>
      </div>
    </td>
  )
}

const MarketTable = (props: TableProps) => {
  const router = useRouter();

  // 搜尋的暫存
  const [cache, setCache] = useState('');

  // 搜尋後的資料
  const [filteredData, setFilteredData] = useState<RowData[]>(props.rows);

  // 排序後的資料
  const [sortedData, setSortedData] = useState<RowData[]>(props.rows);

  // 目前選取的交易所
  const [exchangesData, setExchangesData] = useState({ label: props.tab[0].label, exchange: props.tab[0].value, color: props.tab[0].color, bgColor: props.tab[0].bgColor });

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 排序狀態
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // 計算顯示的資料
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setFilteredData(searchName(cache, props.rows));
  }, [cache, props.rows]);

  useEffect(() => {
    let sortedData = [...filteredData];
    if (sortConfig !== null) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedData(sortedData);
  }, [sortConfig, filteredData]);

  useEffect(() => {
    if (sortConfig === null) {
      setSortedData(filteredData);
    }
  }, [filteredData, sortConfig]);

  // 換頁功能
  const nextPage = () => {
    if (currentPage < Math.ceil(sortedData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // 排序功能
  const requestSort = (key: keyof RowData) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <Card
      className={`h-full w-full ${props.className} dark:bg-txt-dark`}
      nonce={undefined}
      onResize={undefined}
      onResizeCapture={undefined}
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none dark:bg-txt-dark"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h3"
              className="text-black dark:text-white"
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              加密貨幣市場
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal dark:text-gray-500"
              nonce={undefined} onResize={undefined}
              onResizeCapture={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              查看最近火熱的加密貨幣市場
            </Typography>
          </div>
        </div>

        {/* 交易所選擇 */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="pionex" className="w-full md:w-max">
            <TabsHeader
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              {props.tab.map(({ label, value, disabled, color, bgColor }) => (
                <Tab
                  disabled={disabled}
                  key={value}
                  onClick={() => { setExchangesData({ label: label, exchange: value, color: color, bgColor: bgColor }); }}
                  value={value}
                  nonce={undefined}
                  onResize={undefined}
                  onResizeCapture={undefined}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>

          {/* 搜尋對話框 */}
          <div className="w-full md:w-72">
            <Input
              label="Search"
              color={theme === 'dark' ? 'white' : 'black'}
              onChange={(e) => setCache(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              nonce={undefined}
              onResize={undefined}
              onResizeCapture={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>

      {/* 表格內容 */}
      <CardBody
        className="overflow-scroll px-0"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="mt-4 w-full min-w-max table-auto text-left">

          {/* 表格的標題 */}
          <thead>
            <tr>
              {/* 幣種 */}
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('name')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100" nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    幣種名稱
                  </Typography>
                  {sortConfig && sortConfig.key === 'name' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>

              {/* 交易所 */}
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100" nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    交易所
                  </Typography>
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('price')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    價格
                  </Typography>
                  {sortConfig && sortConfig.key === 'price' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('vol24p')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    24h%
                  </Typography>
                  {sortConfig && sortConfig.key === 'vol24p' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('vol24h')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                    nonce={undefined} onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                  >
                    24h成交量
                  </Typography>
                  {sortConfig && sortConfig.key === 'vol24h' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('high')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    最高
                  </Typography>
                  {sortConfig && sortConfig.key === 'high' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('low')}
              >
                <div className="flex items-center">
                  <Typography
                    variant="small"
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                    nonce={undefined}
                    onResize={undefined}
                    onResizeCapture={undefined}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    最低
                  </Typography>
                  {sortConfig && sortConfig.key === 'low' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
            </tr>
          </thead>

          {/* 表格的內容 */}
          <tbody>
            {currentItems.map(
              ({ img, name, full_name, price, vol24h, vol24p, high, low }, index) => {
                const isLast = index === props.rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 dark:border-blue-gray-800";

                return (
                  <tr
                    className="hover:bg-gray-300 dark:hover:bg-gray-800 hover:cursor-pointer"
                    key={name}
                    onClick={() => router.push(`/market/${exchangesData.exchange}/${name}`)}
                  >
                    {/* 幣種 */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        {
                          img !== '' ?
                            <Avatar
                              src={img}
                              alt={name}
                              size="sm"
                              nonce={undefined}
                              onResize={undefined}
                              onResizeCapture={undefined}
                              className="w-9 h-9"
                              placeholder={undefined}
                              onPointerEnterCapture={undefined}
                              onPointerLeaveCapture={undefined}
                            />
                            :
                            <Image
                              src={BityoIcon}
                              alt={name}
                              sizes="100%"
                              className="rounded-full w-9 h-9" />
                        }
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            className="font-normal text-gray-800 dark:text-gray-100"
                            nonce={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            className="font-normal opacity-70 text-gray-800 dark:text-gray-100"
                            nonce={undefined}
                            onResize={undefined}
                            onResizeCapture={undefined}
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}
                          >
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
                      text={vol24p}
                    />

                    {/* 24h 成交量 */}
                    <TableText
                      classes={classes}
                      text={vol24h}
                    />

                    {/* 最高 */}
                    <TableText
                      classes={classes}
                      text={high}
                    />

                    {/* 最低 */}
                    <TableText
                      classes={classes}
                      text={low}
                    />
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter
        className="flex items-center justify-between border-t border-blue-gray-50 dark:border-blue-gray-900 p-4"
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="small"
          className="font-normal text-gray-800 dark:text-gray-100"
          nonce={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          第 {currentPage} 頁，共 {Math.ceil(filteredData.length / itemsPerPage)} 頁
        </Typography>
        <div className="flex gap-2">
          <Button
            className="text-gray-800 dark:text-gray-100 border-gray-400"
            variant="outlined"
            size="sm"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined} onClick={prevPage}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            上一頁
          </Button>
          <Button className="text-gray-800 dark:text-gray-100 border-gray-400"
            variant="outlined" size="sm"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            onClick={nextPage}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            下一頁
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MarketTable;

import { TableProps } from "@/types/Table/MarketTable";
import { MagnifyingGlassIcon, HeartIcon as HeartIconOutLine } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon, HeartIcon } from "@heroicons/react/24/solid";
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
  Tooltip,
} from "@material-tailwind/react";
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from "react";
import Chip from "@/components/Chip/Chip";
import Image from "next/image";
import BityoIcon from "@/images/icon/bityo_bg2.png";
import { useTheme } from "next-themes";
import { CryptoProps } from "@/types/Market/Merket";
import toast from "react-hot-toast";


interface SortConfig {
  key: keyof CryptoProps;
  direction: 'ascending' | 'descending';
}

// 搜尋幣種
const searchName = (cache: string, rows: CryptoProps[]) => {
  return rows.filter((row: CryptoProps) => {
    return row.name.toLowerCase().includes(cache.toLowerCase()) || row.full_name.toLowerCase().includes(cache.toLowerCase());
  });
}

// TD 的文字(成交量等)
const TableText = (props: { className: string, children: React.ReactNode, onClick?: () => void }) => {
  return (
    <td className={props.className} onClick={props.onClick}>
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
          {props.children}
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
  const [filteredData, setFilteredData] = useState<CryptoProps[]>([]);

  // 排序後的資料
  const [sortedData, setSortedData] = useState<CryptoProps[]>([]);

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 排序狀態
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // 計算顯示的資料
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setFilteredData(searchName(cache, props.data));
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
  const requestSort = (key: keyof CryptoProps) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // 切換到盤面
  const switchToMarket = (exchange: string, symbol: string) => {
    router.push(`/market/${exchange}/${symbol}`)
  }

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
                  onClick={() => {
                    props.setSelectedTab({ label, value, color, bgColor, disabled })
                    toast.success(`切換至 ${label} 交易所成功！`, {
                      duration: 2000,
                      position: 'top-center',
                    })
                  }}
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
              {/* 自選 */}
              {/* <th
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
                    自選
                  </Typography>
                  {sortConfig && sortConfig.key === 'name' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th> */}

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
                onClick={() => requestSort('market_cap')}
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
                    市值
                  </Typography>
                  {sortConfig && sortConfig.key === 'market_cap' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('current_price')}
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
                  {sortConfig && sortConfig.key === 'current_price' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('price_change_percentage_24h')}
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
                  {sortConfig && sortConfig.key === 'price_change_percentage_24h' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('total_volume')}
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
                  {sortConfig && sortConfig.key === 'total_volume' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('high_24h')}
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
                  {sortConfig && sortConfig.key === 'high_24h' && (
                    sortConfig.direction === 'ascending' ?
                      <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                      <ArrowDownIcon className="ml-1 h-4 w-4" />
                  )}
                </div>
              </th>
              <th
                className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                onClick={() => requestSort('low_24h')}
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
                  {sortConfig && sortConfig.key === 'low_24h' && (
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
              (item, index) => {
                const isLast = index === props.rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 dark:border-blue-gray-800";

                return (
                  <tr
                    className="hover:bg-gray-300 dark:hover:bg-gray-800 hover:cursor-pointer"
                    key={item.name}
                  >
                    {/* 自選 */}
                    {/* <TableText className={classes}>
                      <HeartIconOutLine className="w-8 hover:text-red-500" />
                      <HeartIcon className="w-8 text-red-500 hover:text-white" />
                    </TableText> */}

                    {/* 幣種 */}
                    <td
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      <Tooltip
                        className="bg-[rgba(50,53,64,0.6)] dark:bg-[rgba(50,53,64,0.92)] border-2 border-web-green"
                        placement="right-start"
                        content={
                          <p className="font-medium">
                            <table>
                              <tr>
                                <td>市值排名</td>
                                <td>{item.market_cap_rank}</td>
                              </tr>
                              <tr>
                                <td>市值</td>
                                <td>{parseFloat(item.market_cap.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>流通供給量</td>
                                <td>{parseFloat(item.circulating_supply.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>總供給量</td>
                                <td>{parseFloat(item.total_supply.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>最大供給量</td>
                                <td>{parseFloat(item.max_supply?.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>ATH</td>
                                <td>{parseFloat(item.ath.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td>ATH%</td>
                                {item.ath_change_percentage.toFixed(2)}%
                              </tr>
                            </table>
                          </p>
                        }
                      >
                        <div className="flex items-center gap-3">
                          {
                            item.image !== '' ?
                              <Avatar
                                src={item.image}
                                alt={item.name}
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
                                alt={item.name}
                                sizes="100%"
                                className="rounded-full w-9 h-9"
                              />
                          }
                          <div className="flex flex-col">
                            {/* 幣種代號 */}
                            <p className="text-[15px] font-normal text-gray-800 dark:text-gray-100">
                              {item.name.toUpperCase()}
                            </p>

                            {/* 幣種全稱 */}
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
                              {item.full_name}
                            </Typography>
                          </div>
                        </div>
                      </Tooltip>
                    </td>

                    {/* 交易所 */}
                    <td
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      <div className="flex">
                        <Chip
                          text={props.selectedTab.label}
                          color={props.selectedTab.color}
                          bgColor={props.selectedTab.bgColor}
                        />
                      </div>
                    </td>

                    {/* 市值 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.market_cap.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 價格 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.current_price.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 24h% */}
                    {
                      item.price_change_percentage_24h > 0 ?
                        <TableText
                          className={classes}
                          onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                        >
                          <span className="text-green-500 flex items-center">
                            <ArrowUpIcon className="h-4 w-4" />
                            {item.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </TableText>
                        :
                        <TableText
                          className={classes}
                          onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                        >
                          <span className="text-red-500 flex items-center" >
                            <ArrowDownIcon className="h-4 w-4" />
                            {(item.price_change_percentage_24h * -1).toFixed(2)}%
                          </span>
                        </TableText>
                    }

                    {/* 24h 成交量 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.total_volume.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 最高 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.high_24h.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 最低 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.low_24h.toFixed(3)).toLocaleString()}
                    </TableText>
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
    </Card >
  );
}

export default MarketTable;

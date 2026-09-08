import { TableProps } from "@/types/Table/MarketTable";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";
import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Typography from "@/components/ui/Typography";
import Tooltip from "@/components/ui/Tooltip";
import Avatar from "@/components/ui/Avatar";
import Tabs from "@/components/ui/Tabs";
import SearchInput from "@/components/ui/SearchInput";
import { useRouter } from 'next/router';
import { useMemo, useState } from "react";
import Chip from "@/components/Chip/Chip";
import Image from "next/image";
import BityoIcon from "@/images/icon/bityo_bg2.png";
import { CryptoProps } from "@/types/Market/Market";
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
        >
          {props.children}
        </Typography>
      </div>
    </td>
  )
}

// 表格的標題
const RowTitle = (props: {
  text: string;
  name: string;
  className?: string;
  sortable?: boolean;
  sortConfig: SortConfig | null;
  onSort: (key: keyof CryptoProps) => void;
}) => {
  const active = props.sortable && props.sortConfig && props.sortConfig.key === props.name;

  return (
    <th
      className={`${props.className ?? ''} border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer`}
      onClick={() => props.sortable && props.onSort(props.name as keyof CryptoProps)}
    >
      <div className="flex items-center">
        <Typography
          variant="small"
          className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
        >
          {props.text}
        </Typography>
        {active && (
          props.sortConfig!.direction === 'ascending' ?
            <ArrowUpIcon className="ml-1 h-4 w-4" /> :
            <ArrowDownIcon className="ml-1 h-4 w-4" />
        )}
      </div>
    </th>
  );
}

const MarketTable = (props: TableProps) => {
  const router = useRouter();

  // 搜尋的暫存
  const [cache, setCache] = useState('');

  // 分頁狀態
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 排序狀態
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  // 搜尋後的資料（衍生值，不需要另外存成 state）
  const filteredData = useMemo(() => searchName(cache, props.data), [cache, props.data]);

  // 排序後的資料
  const sortedData = useMemo(() => {
    if (sortConfig === null) return filteredData;
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // 計算顯示的資料
  const currentItems = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
      className={`h-full w-full ${props.className} bg-neutral-200 dark:bg-txt-dark`}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none bg-neutral-200 dark:bg-txt-dark"
      >
        <div className="mb-2 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h3"
              className="text-black dark:text-white"
            >
              加密貨幣市場
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal dark:text-gray-500"
            >
              查看最近火熱的加密貨幣市場
            </Typography>
          </div>
        </div>

        {/* 交易所選擇 */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs
            className="w-full md:w-max"
            tabs={props.tab}
            value={props.selectedTab.value}
            onChange={(tab) => {
              if (props.selectedTab.value !== tab.value) {
                props.setSelectedTab(tab);
                toast.success(`切換至 ${tab.label} 交易所成功！`, {
                  duration: 2000,
                  position: 'top-center',
                });
              }
            }}
          />

          {/* 搜尋對話框 */}
          <div className="w-full md:w-72">
            <SearchInput
              label="搜尋加密貨幣"
              value={cache}
              onChange={(e) => setCache(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>

      {/* 表格內容 */}
      <CardBody
        className=" px-0"
      >
        <table className="w-full min-w-max table-auto text-left">

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
                    className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
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

              {/* {
                props.rows.map((row, index) => (
                  <th
                    key={index}
                    className="border-y border-blue-gray-100 dark:border-blue-gray-700 bg-blue-gray-50/50 dark:bg-blue-gray-900/50 p-4 cursor-pointer"
                    onClick={() => requestSort(row.key)}
                  >
                    <div className="flex items-center">
                      <Typography
                        variant="small"
                        className="font-normal leading-none opacity-70 text-gray-800 dark:text-gray-100"
                      >
                        {row.label}
                      </Typography>
                      {sortConfig && sortConfig.key === row.key && (
                        sortConfig.direction === 'ascending' ?
                          <ArrowUpIcon className="ml-1 h-4 w-4" /> :
                          <ArrowDownIcon className="ml-1 h-4 w-4" />
                      )}
                    </div>
                  </th>
                ))
              } */}

              {/* 市值排名 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="#"
                name="market_cap_rank"
                sortable={false}
              />

              {/* 幣種 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="幣種名稱"
                name="name"
                className="w-[15%]"
                sortable={true}
              />

              {/* 價格 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="價格"
                name="current_price"
                sortable={true}
              />

              {/* 市值 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="市值"
                name="market_cap"
                sortable={true}
              />

              {/* 24h% */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="24h%"
                name="price_change_percentage_24h"
                sortable={true}
              />

              {/* 24h 成交量 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="24h成交量"
                name="total_volume"
                sortable={true}
              />

              {/* 24h 最高 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="最高"
                name="high_24h"
                sortable={true}
              />

              {/* 24h 最低 */}
              <RowTitle
                sortConfig={sortConfig}
                onSort={requestSort}
                text="最低"
                name="low_24h"
                sortable={true}
              />
            </tr>
          </thead>

          {/* 表格的內容 */}
          <tbody>
            {currentItems.map(
              (item, index) => {
                // 這裡走訪的是當前分頁（currentItems），不能拿全部資料的長度來比
                const isLast = index === currentItems.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50 dark:border-blue-gray-800";

                return (
                  <tr
                    className="hover:bg-gray-300 dark:hover:bg-gray-800 hover:cursor-pointer"
                    key={item.name}
                  >
                    {/* 市值排名 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      <span className="">
                        {parseFloat(item.market_cap_rank.toFixed(3)).toLocaleString()}
                      </span>
                    </TableText>

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
                          <table className="font-medium">
                            <tbody>
                              <tr>
                                <td className="pr-3">市值排名</td>
                                <td>{item.market_cap_rank}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">市值</td>
                                <td>{parseFloat(item.market_cap.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">流通供給量</td>
                                <td>{parseFloat(item.circulating_supply.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">總供給量</td>
                                <td>{parseFloat(item.total_supply.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">最大供給量</td>
                                <td>{item.max_supply ? parseFloat(item.max_supply.toFixed(3)).toLocaleString() : '—'}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">ATH</td>
                                <td>{parseFloat(item.ath.toFixed(3)).toLocaleString()}</td>
                              </tr>
                              <tr>
                                <td className="pr-3">ATH%</td>
                                <td>{item.ath_change_percentage.toFixed(2)}%</td>
                              </tr>
                            </tbody>
                          </table>
                        }
                      >
                        <div className="flex items-center gap-3">
                          {
                            item.image !== '' ?
                              <Avatar
                                src={item.image}
                                alt={item.name}
                                size="sm"
                                className="w-9 h-9"
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
                            >
                              {
                                item.full_name ?
                                  item.full_name :
                                  item.name
                              }
                            </Typography>
                          </div>
                        </div>
                      </Tooltip>
                    </td>

                    {/* 價格 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.current_price.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 市值 */}
                    <TableText
                      className={classes}
                      onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                    >
                      {parseFloat(item.market_cap.toFixed(3)).toLocaleString()}
                    </TableText>

                    {/* 24h% */}
                    {
                      item.price_change_percentage_24h > 0 ?
                        <TableText
                          className={classes}
                          onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                        >
                          <span className="dark:text-bityo text-[#16c784] flex items-center">
                            <ArrowUpIcon className="h-4 w-4" />
                            {item.price_change_percentage_24h.toFixed(2)}%
                          </span>
                        </TableText>
                        :
                        <TableText
                          className={classes}
                          onClick={() => switchToMarket(props.selectedTab.label, item.symbol)}
                        >
                          <span className="text-[#ea3943] flex items-center" >
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
      >
        <Typography
          variant="small"
          className="font-normal text-gray-800 dark:text-gray-100"
        >
          第 {currentPage} 頁，共 {Math.ceil(filteredData.length / itemsPerPage)} 頁。 <br />
          共 {filteredData.length} 個加密貨幣
        </Typography>
        <div className="flex gap-2">
          <Button
            className="text-gray-800 dark:text-gray-100 border-gray-400"
            variant="outlined"
            size="sm" onClick={prevPage}
          >
            上一頁
          </Button>
          <Button className="text-gray-800 dark:text-gray-100 border-gray-400"
            variant="outlined" size="sm"
            onClick={nextPage}
          >
            下一頁
          </Button>
        </div>
      </CardFooter>
    </Card >
  );
}

export default MarketTable;

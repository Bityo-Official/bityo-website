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
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

// search name and fullname from row data list
const searchName = (cache: string, rows: any) => {
  return rows.filter((row: any) => {
    return row.name.toLowerCase().includes(cache.toLowerCase()) || row.full_name.toLowerCase().includes(cache.toLowerCase());
  });
}

const TableText = (props: { classes: string, text: string | number }) => {
  return (
    <td className={props.classes}>
      <div className="flex flex-col">
        <Typography
          variant="small"
          color="blue-gray"
          className="font-normal" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          {props.text}
        </Typography>
      </div>
    </td>
  )
}

const MembersTable = (props: TableProps) => {
  const router = useRouter();

  const [cache, setCache] = useState('');
  const [filteredData, setFilteredData] = useState(props.rows);

  const [exchanges, setExchanges] = useState('pionex');
  console.log(exchanges)

  useEffect(() => {
    setFilteredData(searchName(cache, props.rows));
  }, [cache]);


  return (
    <Card className={`h-full w-full ${props.className}`} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
      <CardHeader floated={false} shadow={false} className="rounded-none" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h3" color="blue-gray" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              加密貨幣市場
            </Typography>
            <Typography color="gray" className="mt-1 font-normal" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              查看最近火熱的加密貨幣市場
            </Typography>
          </div>
          {/* <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
						<Button variant="outlined" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
							view all
						</Button>
						<Button className="flex items-center gap-3" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
							<UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
						</Button>
					</div> */}
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="pionex" className="w-full md:w-max">
            <TabsHeader nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
              {props.tab.map(({ label, value, disabled }) => (
                <Tab disabled={disabled} key={value} onClick={() => { setExchanges(value) }} value={value} nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              onChange={(e) => setCache(e.target.value)}
              icon={<MagnifyingGlassIcon className="h-5 w-5" />} nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {props.head.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70" nonce={undefined} onResize={undefined} onResizeCapture={undefined}                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map(
              ({ img, name, full_name, price }, index) => {
                const isLast = index === props.rows.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name} onClick={() => router.push(`/market/${exchanges}/${name}`)}>
                    {/* 幣種 */}
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={img} alt={name} size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined} />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal" nonce={undefined} onResize={undefined} onResizeCapture={undefined} >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70" nonce={undefined} onResize={undefined} onResizeCapture={undefined} >
                            {full_name}
                          </Typography>
                        </div>
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
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
        <Typography variant="small" color="blue-gray" className="font-normal" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
          第1頁，共10頁
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            上一頁
          </Button>
          <Button variant="outlined" size="sm" nonce={undefined} onResize={undefined} onResizeCapture={undefined}>
            下一頁
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default MembersTable;
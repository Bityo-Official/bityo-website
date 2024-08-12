// pages/api/getAddressData.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { address } = req.query;

  if (typeof address !== 'string' || !ethers.isAddress(address)) {
    return res.status(400).json({ error: 'Invalid address' });
  }

  // 使用 Alchemy URL 連接到以太坊節點
  const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/e3a_Ao5wtGEA3p_N5UbNxOc48RMXKRj7');

  try {
    // 獲取地址餘額
    const balance = await provider.getBalance(address);

    // 將餘額轉換為以太坊單位
    const balanceInEth = ethers.formatEther(balance);

    res.status(200).json({ balance: balanceInEth });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data from blockchain' });
  }
}

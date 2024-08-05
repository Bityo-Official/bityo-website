import { NextApiRequest, NextApiResponse } from 'next';
import { initAdmin } from '../../../lib/firebaseAdmin';

/**
 * @openapi
 * /api/getTeamMember:
 *   get:
 *     description: 取得團隊成員資訊
 *     tags:
 *       - Team
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: 使用者名稱
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功回傳使用者資訊
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: 使用者名稱
 *                 position:
 *                   type: string
 *                   description: 職位
 *                 socials:
 *                   type: object
 *                   description: 社交鏈接
 *                   properties:
 *                     twitter:
 *                       type: string
 *                       description: Twitter 連結
 *                     globe:
 *                       type: string
 *                       description: 個人網站
 *                     tiktok:
 *                       type: string
 *                       description: TikTok 連結
 *                     facebook:
 *                       type: string
 *                       description: Facebook 連結
 *                     instagram:
 *                       type: string
 *                       description: Instagram 連結
 *                 TeamID:
 *                   type: integer
 *                   description: 團隊 ID
 *                 img:
 *                   type: string
 *                   description: 圖片連結
 *                 id:
 *                   type: string
 *                   description: 使用者 ID
 *                 description:
 *                   type: string
 *                   description: 描述
 *       400:
 *         description: 缺少使用者名稱
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 錯誤信息
 *       404:
 *         description: 未找到使用者
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 錯誤信息
 *       500:
 *         description: 內部伺服器錯誤
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 錯誤信息
 */
const getTeamMember = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admin = await initAdmin();
    const db = admin.firestore();
    
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userDoc = await db.collection('Users').doc(username as string).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getTeamMember;

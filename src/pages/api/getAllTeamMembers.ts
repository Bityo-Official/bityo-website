import { NextApiRequest, NextApiResponse } from 'next';
import { initAdmin } from '../../../lib/firebaseAdmin';

const getAllTeamMembers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const admin = await initAdmin();
    const db = admin.firestore();
    
    const usersCollection = await db.collection('Users').get();

    if (usersCollection.empty) {
      return res.status(404).json({ error: 'No users found' });
    }

    const users = usersCollection.docs.map(doc => doc.data());
    
    // 根據 TeamID 對用戶數據進行排序
    users.sort((a, b) => (a.TeamID || 0) - (b.TeamID || 0));

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getAllTeamMembers;

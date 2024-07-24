
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../lib/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const db = await connectToDatabase();
  const collection = db.collection('posts');

  if (req.method === 'POST') {
    const { title, content } = req.body;
    const result = await collection.insertOne({ title, content });
    res.status(200).json((result as any).ops[0]);
  } else {
    const posts = await collection.find({}).toArray();
    res.status(200).json(posts);
  }
};

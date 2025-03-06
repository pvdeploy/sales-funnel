import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const activity = await prisma.activity.create({
        data: req.body,
      });
      res.status(200).json(activity);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Error creating activity' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
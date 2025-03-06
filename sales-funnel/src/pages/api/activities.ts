import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const activity = await prisma.activity.create({
        data: {
          type: req.body.type,
          contactName: req.body.contactName,
          companyName: req.body.companyName,
          description: req.body.description,
          activityDate: new Date(req.body.activityDate),
          activityType: req.body.activityType,
          lead: {
            connect: { 
              id: req.body.leadId || 1 // Connect to a lead using the leadId, default to 1 if not provided
            }
          }
        },
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
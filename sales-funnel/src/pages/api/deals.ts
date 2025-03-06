import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const deal = await prisma.deal.create({
        data: {
          dealName: req.body.dealName,
          dealValue: req.body.value,
          currency: req.body.currency,
          status: req.body.status,
          stage: req.body.stage,
          createdAt: new Date(req.body.createdAt),
          lead: {
            connect: {
              id: req.body.leadId || 1 // Connect to a lead using the leadId, default to 1 if not provided
            }
          }
        },
      });
      res.status(200).json(deal);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Error creating deal' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
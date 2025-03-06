import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      // Create a data object with the correct field mappings from schema
      const data = {
        dealName: req.body.dealName,
        dealValue: parseFloat(req.body.value), // Convert to a number
        currency: req.body.currency || 'USD',
        status: req.body.status,
        lead: {
          connect: {
            id: req.body.leadId || "1" // Make sure to use string for UUID
          }
        }
      };
      
      console.log('Data being sent to Prisma:', JSON.stringify(data, null, 2));
      
      const deal = await prisma.deal.create({
        data
      });
      
      console.log('Deal created:', deal);
      res.status(200).json(deal);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error creating deal' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
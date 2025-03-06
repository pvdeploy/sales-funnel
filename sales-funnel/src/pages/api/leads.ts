import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const lead = await prisma.lead.create({
        data: {
          companyName: req.body.companyName,
          contactName: req.body.contactName,
          email: req.body.email,
          phone: req.body.phone,
          leadSource: req.body.leadSource,
          industry: req.body.industry,
          createdAt: new Date(req.body.createdAt),
        },
      });
      res.status(200).json(lead);
    } catch (error) {
      console.error('API Error:', error);
      res.status(500).json({ error: 'Error creating lead' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
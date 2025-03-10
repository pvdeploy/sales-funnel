import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET method for fetching all leads
  if (req.method === 'GET') {
    try {
      const leads = await prisma.lead.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      res.status(200).json(leads);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error fetching leads' });
    }
  } 
  // POST method for creating a new lead
  else if (req.method === 'POST') {
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      // Create a data object with the correct field mappings from schema
      const data = {
        companyName: req.body.companyName,
        contactName: req.body.contactName,
        email: req.body.email,
        phone: req.body.phone || '',
        leadSource: req.body.leadSource,
        industry: req.body.industry || '',
      };
      
      console.log('Data being sent to Prisma:', JSON.stringify(data, null, 2));
      
      const lead = await prisma.lead.create({
        data
      });
      
      console.log('Lead created:', lead);
      res.status(200).json(lead);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error creating lead' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
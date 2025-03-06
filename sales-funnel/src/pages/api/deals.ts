import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET method for fetching all deals
  if (req.method === 'GET') {
    try {
      const deals = await prisma.deal.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          lead: true, // Include the related lead information
        },
      });
      
      res.status(200).json(deals);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error fetching deals' });
    }
  } 
  // POST method for creating a new deal
  else if (req.method === 'POST') {
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      // Check if a leadId was provided
      const providedLeadId = req.body.leadId ? String(req.body.leadId) : null;
      let leadId;
      
      if (providedLeadId) {
        // If a leadId was provided, check if it exists
        const leadExists = await prisma.lead.findUnique({
          where: { id: providedLeadId }
        });
        
        if (!leadExists) {
          return res.status(400).json({ 
            error: `No lead found with ID ${providedLeadId}. Please create a lead first.` 
          });
        }
        
        leadId = providedLeadId;
      } else {
        // If no leadId was provided, find the first lead in the database
        const firstLead = await prisma.lead.findFirst({
          orderBy: { createdAt: 'desc' }
        });
        
        if (!firstLead) {
          return res.status(400).json({ 
            error: 'No leads found in the database. Please create a lead first.' 
          });
        }
        
        leadId = firstLead.id;
      }
      
      // Create a data object with the correct field mappings from schema
      const data = {
        dealName: req.body.dealName,
        dealValue: parseFloat(req.body.value), // Convert to a number
        currency: req.body.currency || 'USD',
        status: req.body.status,
        lead: {
          connect: {
            id: leadId
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
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  // Handle DELETE request to delete a lead
  if (req.method === 'DELETE') {
    try {
      // Check if the lead exists
      const lead = await prisma.lead.findUnique({
        where: { id: String(id) },
      });
      
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      // Check if lead has related records (deals, activities)
      const relatedDeals = await prisma.deal.findMany({
        where: { leadId: String(id) },
      });
      
      const relatedActivities = await prisma.activity.findMany({
        where: { leadId: String(id) },
      });
      
      // If there are related records, return an error
      if (relatedDeals.length > 0 || relatedActivities.length > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete lead with related deals or activities. Delete those first.' 
        });
      }
      
      // Delete the lead
      await prisma.lead.delete({
        where: { id: String(id) },
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error deleting lead' });
    }
  } 
  // Handle GET request to get a single lead
  else if (req.method === 'GET') {
    try {
      const lead = await prisma.lead.findUnique({
        where: { id: String(id) },
      });
      
      if (!lead) {
        return res.status(404).json({ error: 'Lead not found' });
      }
      
      return res.status(200).json(lead);
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error fetching lead' });
    }
  } 
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
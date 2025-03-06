import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  // Handle DELETE request to delete a deal
  if (req.method === 'DELETE') {
    try {
      // Check if the deal exists
      const deal = await prisma.deal.findUnique({
        where: { id: String(id) },
      });
      
      if (!deal) {
        return res.status(404).json({ error: 'Deal not found' });
      }
      
      // Check if deal has related records (activities)
      const relatedActivities = await prisma.activity.findMany({
        where: { 
          dealId: String(id)
        },
      });
      
      // If there are related activities, return an error
      if (relatedActivities.length > 0) {
        return res.status(400).json({ 
          error: 'Cannot delete deal with related activities. Delete those first.' 
        });
      }
      
      // Delete related deal stages first (if any)
      await prisma.dealStage.deleteMany({
        where: { dealId: String(id) },
      });
      
      // Delete the deal
      await prisma.deal.delete({
        where: { id: String(id) },
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error deleting deal' });
    }
  } 
  // Handle GET request to get a single deal
  else if (req.method === 'GET') {
    try {
      const deal = await prisma.deal.findUnique({
        where: { id: String(id) },
        include: {
          lead: true,
        },
      });
      
      if (!deal) {
        return res.status(404).json({ error: 'Deal not found' });
      }
      
      return res.status(200).json(deal);
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error fetching deal' });
    }
  } 
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
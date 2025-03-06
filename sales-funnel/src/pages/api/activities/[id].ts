import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  // Handle DELETE request to delete an activity
  if (req.method === 'DELETE') {
    try {
      // Check if the activity exists
      const activity = await prisma.activity.findUnique({
        where: { id: String(id) },
      });
      
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      // Delete the activity
      await prisma.activity.delete({
        where: { id: String(id) },
      });
      
      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error deleting activity' });
    }
  } 
  // Handle GET request to get a single activity
  else if (req.method === 'GET') {
    try {
      const activity = await prisma.activity.findUnique({
        where: { id: String(id) },
        include: {
          lead: true,
          deal: true,
        },
      });
      
      if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
      }
      
      return res.status(200).json(activity);
    } catch (error) {
      console.error('API Error details:', error);
      return res.status(500).json({ error: 'Error fetching activity' });
    }
  } 
  // Method not allowed
  else {
    res.setHeader('Allow', ['GET', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET method for fetching all activities
  if (req.method === 'GET') {
    try {
      const activities = await prisma.activity.findMany({
        orderBy: {
          activityDate: 'desc',
        },
        include: {
          lead: true, // Include the related lead information
          deal: true, // Include the related deal information if available
        },
      });
      
      res.status(200).json(activities);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error fetching activities' });
    }
  } 
  // POST method for creating a new activity
  else if (req.method === 'POST') {
    try {
      console.log('Request body:', JSON.stringify(req.body, null, 2));
      
      // Ensure leadId is a string
      const leadId = req.body.leadId ? String(req.body.leadId) : "1";
      
      // Create a data object with the correct field mappings from schema
      const data = {
        activityType: req.body.type, // Map to enum
        description: req.body.description,
        activityDate: new Date(req.body.date), // Use the date from the form
        // Required fields from schema
        contactName: req.body.contactName,
        companyName: req.body.companyName,
        lead: {
          connect: { 
            id: leadId // Now leadId is guaranteed to be a string
          }
        }
      };
      
      console.log('Data being sent to Prisma:', JSON.stringify(data, null, 2));
      
      const activity = await prisma.activity.create({
        data
      });
      
      console.log('Activity created:', activity);
      res.status(200).json(activity);
    } catch (error) {
      console.error('API Error details:', error);
      res.status(500).json({ error: 'Error creating activity' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 
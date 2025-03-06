'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { prisma } from '@/lib/prisma';

interface LogActivityFormProps {
  onLogActivity: (activity: Activity) => void;
}

export type Activity = {
  id: number;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'FOLLOW_UP' | 'DEMO';
  contactName: string;
  companyName: string;
  description: string;
  date: string;
  leadId?: number;
};

const LogActivityForm = ({ onLogActivity }: LogActivityFormProps) => {
  const [activity, setActivity] = useState<Activity>({
    id: Date.now(),
    type: 'EMAIL',
    contactName: '',
    companyName: '',
    description: '',
    date: new Date().toISOString(),
    leadId: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Format the data correctly for the API
      const apiData = {
        ...activity,
        // Map the type field properly
        activityDate: activity.date, // Make sure the field name matches
      };
      
      console.log('Sending data to API:', apiData);
      
      const response = await fetch('/api/activities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });

      if (response.ok) {
        const newActivity = await response.json();
        onLogActivity(newActivity);
        setActivity({
          id: Date.now(),
          type: 'EMAIL',
          contactName: '',
          companyName: '',
          description: '',
          date: new Date().toISOString(),
          leadId: 1,
        });
      } else {
        const errorData = await response.json();
        console.error('Error logging activity:', errorData);
      }
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="contactName">Contact Name</Label>
        <Input
          id="contactName"
          name="contactName"
          value={activity.contactName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={activity.companyName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="activityType">Activity Type</Label>
        <Select
          value={activity.type}
          onValueChange={(value) => handleSelectChange(value, 'type')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CALL">Call</SelectItem>
            <SelectItem value="EMAIL">Email</SelectItem>
            <SelectItem value="MEETING">Meeting</SelectItem>
            <SelectItem value="FOLLOW_UP">Follow Up</SelectItem>
            <SelectItem value="DEMO">Demo</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={activity.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit">Log Activity</Button>
      </div>
    </form>
  );
};

export default LogActivityForm; 
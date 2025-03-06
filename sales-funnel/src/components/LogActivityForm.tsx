'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface LogActivityFormProps {
  onLogActivity: (activity: Activity) => void;
}

export type Activity = {
  id: string | number;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'FOLLOW_UP' | 'DEMO';
  contactName: string;
  companyName: string;
  description: string;
  date: string;
  leadId?: string;
};

const LogActivityForm = ({ onLogActivity }: LogActivityFormProps) => {
  const [activity, setActivity] = useState<Activity>({
    id: Date.now(),
    type: 'EMAIL',
    contactName: '',
    companyName: '',
    description: '',
    date: new Date().toISOString(),
    leadId: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // Format the data correctly for the API
      const apiData = {
        ...activity,
        activityDate: activity.date,
        leadId: activity.leadId || undefined
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
          leadId: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error logging activity');
        console.error('Error logging activity:', errorData);
      }
    } catch (error) {
      setError('Failed to submit form. Please try again.');
      console.error('Error logging activity:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="type">Activity Type</Label>
        <Select
          value={activity.type}
          onValueChange={(value) => handleSelectChange(value, 'type')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select activity type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EMAIL">Email</SelectItem>
            <SelectItem value="CALL">Call</SelectItem>
            <SelectItem value="MEETING">Meeting</SelectItem>
            <SelectItem value="FOLLOW_UP">Follow-up</SelectItem>
            <SelectItem value="DEMO">Demo</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={activity.description}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Log Activity'}
      </Button>
    </form>
  );
};

export default LogActivityForm; 
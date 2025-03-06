'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

interface LogActivityFormProps {
  onLogActivity: (activity: Activity) => void;
}

interface Lead {
  id: string;
  companyName: string;
  contactName: string;
}

export type Activity = {
  id: string | number;
  type: 'EMAIL' | 'CALL' | 'MEETING' | 'FOLLOW_UP' | 'DEMO';
  description: string;
  date: string;
  leadId?: string;
  // For display purposes only - not sent to the API
  companyName?: string;
  contactName?: string;
};

const LogActivityForm = ({ onLogActivity }: LogActivityFormProps) => {
  const [activity, setActivity] = useState<Activity>({
    id: Date.now(),
    type: 'EMAIL',
    description: '',
    date: new Date().toISOString(),
    leadId: "",
    companyName: "",
    contactName: "",
  });
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch leads on component mount
  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/leads');
        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }
        const data = await response.json();
        setLeads(data);
      } catch (err) {
        console.error('Error fetching leads:', err);
        setError('Failed to load leads. Please refresh the page and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    if (name === 'leadId') {
      // When a lead is selected, update the company and contact name
      const selectedLead = leads.find(lead => lead.id === value);
      if (selectedLead) {
        setActivity(prev => ({
          ...prev,
          leadId: value,
          companyName: selectedLead.companyName,
          contactName: selectedLead.contactName
        }));
      }
    } else {
      setActivity((prevActivity) => ({ ...prevActivity, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      if (!activity.leadId) {
        setError('Please select a lead for this activity');
        setIsSubmitting(false);
        return;
      }
      
      // Format the data correctly for the API
      const apiData = {
        type: activity.type,
        description: activity.description,
        date: activity.date,
        leadId: activity.leadId
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
          description: '',
          date: new Date().toISOString(),
          leadId: "",
          companyName: "",
          contactName: "",
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
  
  // Show loading state while fetching leads
  if (loading) {
    return <div className="p-4 text-center">Loading leads...</div>;
  }
  
  // Show error if we couldn't fetch leads
  if (error && leads.length === 0) {
    return <div className="p-4 text-red-500">{error}</div>;
  }
  
  // Show message if no leads exist
  if (!loading && leads.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">No leads found. Please create a lead first.</p>
        <Button onClick={() => window.location.href = '/leads'}>Go to Leads</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3 mb-4">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="leadId">Select Lead</Label>
        <Select
          value={activity.leadId}
          onValueChange={(value) => handleSelectChange(value, 'leadId')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a lead" />
          </SelectTrigger>
          <SelectContent>
            {leads.map((lead) => (
              <SelectItem key={lead.id} value={lead.id}>
                {lead.companyName} - {lead.contactName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {activity.leadId && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Company</Label>
              <div className="p-2 border rounded-md bg-gray-50">
                {activity.companyName}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Contact</Label>
              <div className="p-2 border rounded-md bg-gray-50">
                {activity.contactName}
              </div>
            </div>
          </div>
          
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
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={activity.description}
              onChange={handleChange}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="datetime-local"
              value={activity.date.slice(0, 16)} // Format date for datetime-local input
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Log Activity'}
          </Button>
        </>
      )}
    </form>
  );
};

export default LogActivityForm; 
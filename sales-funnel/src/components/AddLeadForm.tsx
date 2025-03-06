'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';

interface Lead {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  leadSource: string;
  industry: string;
  createdAt: string;
}

interface AddLeadFormProps {
  onAddLead: (lead: Lead) => void;
}

export type { Lead };

const AddLeadForm = ({ onAddLead }: AddLeadFormProps) => {
  const [lead, setLead] = useState<Lead>({
    id: Date.now(),
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    leadSource: 'REFERRAL',
    industry: '',
    createdAt: new Date().toISOString(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLead((prevLead) => ({ ...prevLead, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setLead((prevLead) => ({ ...prevLead, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLead(lead);
    setLead({
      id: Date.now(),
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      leadSource: 'REFERRAL',
      industry: '',
      createdAt: new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="companyName">Company Name</Label>
        <Input
          id="companyName"
          name="companyName"
          value={lead.companyName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="contactName">Contact Name</Label>
        <Input
          id="contactName"
          name="contactName"
          value={lead.contactName}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          value={lead.email}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          value={lead.phone}
          onChange={handleChange}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="leadSource">Lead Source</Label>
        <Select 
          value={lead.leadSource} 
          onValueChange={(value) => handleSelectChange(value, 'leadSource')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select lead source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="REFERRAL">Referral</SelectItem>
            <SelectItem value="COLD_OUTREACH">Cold Outreach</SelectItem>
            <SelectItem value="EVENT">Event</SelectItem>
            <SelectItem value="WEBSITE">Website</SelectItem>
            <SelectItem value="OTHER">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          value={lead.industry}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-end">
        <Button type="submit">Add Lead</Button>
      </div>
    </form>
  );
};

export default AddLeadForm; 
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { prisma } from '@/lib/prisma';

interface AddDealFormProps {
  onAddDeal: (deal: Deal) => void;
}

export type Deal = {
  id: string | number;
  leadName: string;
  dealName: string;
  value: number;
  currency: string;
  status: 'OPEN' | 'WON' | 'LOST';
  stage: string;
  createdAt: string;
  leadId?: string;
};

const AddDealForm = ({ onAddDeal }: AddDealFormProps) => {
  const [deal, setDeal] = useState<Deal>({
    id: Date.now(),
    leadName: '',
    dealName: '',
    value: 0,
    currency: 'USD',
    status: 'OPEN',
    stage: 'CONTACTED',
    createdAt: new Date().toISOString(),
    leadId: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  const handleSelectChange = (value: string, name: string) => {
    setDeal((prevDeal) => ({ ...prevDeal, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/deals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...deal,
          leadId: deal.leadId || undefined
        }),
      });

      if (response.ok) {
        const newDeal = await response.json();
        onAddDeal(newDeal);
        setDeal({
          id: Date.now(),
          leadName: '',
          dealName: '',
          value: 0,
          currency: 'USD',
          status: 'OPEN',
          stage: 'CONTACTED',
          createdAt: new Date().toISOString(),
          leadId: "",
        });
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Error creating deal');
        console.error('Error creating deal:', errorData);
      }
    } catch (error) {
      setError('Failed to submit form. Please try again.');
      console.error('Error creating deal:', error);
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
        <Label htmlFor="leadName">Lead Name</Label>
        <Input
          id="leadName"
          name="leadName"
          value={deal.leadName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="dealName">Deal Name</Label>
        <Input
          id="dealName"
          name="dealName"
          value={deal.dealName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="value">Value</Label>
        <Input
          id="value"
          type="number"
          name="value"
          value={deal.value}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="currency">Currency</Label>
        <Select
          value={deal.currency}
          onValueChange={(value) => handleSelectChange(value, 'currency')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select
          value={deal.status}
          onValueChange={(value) => handleSelectChange(value, 'status')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OPEN">Open</SelectItem>
            <SelectItem value="WON">Won</SelectItem>
            <SelectItem value="LOST">Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="stage">Stage</Label>
        <Select
          value={deal.stage}
          onValueChange={(value) => handleSelectChange(value, 'stage')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select stage" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="CONTACTED">Contacted</SelectItem>
            <SelectItem value="MEETING_SCHEDULED">Meeting Scheduled</SelectItem>
            <SelectItem value="PROPOSAL_SENT">Proposal Sent</SelectItem>
            <SelectItem value="NEGOTIATION">Negotiation</SelectItem>
            <SelectItem value="CLOSED_WON">Closed Won</SelectItem>
            <SelectItem value="CLOSED_LOST">Closed Lost</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Add Deal'}
      </Button>
    </form>
  );
};

export default AddDealForm; 
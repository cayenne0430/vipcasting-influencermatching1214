```typescript
export interface ScheduleTask {
  id: string;
  campaignId: string;
  campaignTitle: string;
  companyName: string;
  taskType: 'draft' | 'post' | 'meeting' | 'other';
  dueDate: string;
  dueTime?: string;
  status: 'pending' | 'completed';
  description?: string;
}

export interface Campaign {
  id: string;
  title: string;
  company: string;
  tasks: ScheduleTask[];
}
```
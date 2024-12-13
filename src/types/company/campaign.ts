import type { Platform } from '../platform';

export type CampaignStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface CampaignApplication {
  id: string;
  influencerId: string;
  influencerName: string;
  status: ApplicationStatus;
  appliedAt: string;
  message: string;
  profileImage?: string;
  followers?: number;
  engagement?: number;
}

export interface CompanyCampaign {
  id: string;
  title: string;
  platform: Platform;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  budget: string;
  applications: CampaignApplication[];
  totalApplications: number;
  acceptedApplications: number;
  completedApplications: number;
  description?: string;
  requirements?: string[];
  isPublic?: boolean;
}
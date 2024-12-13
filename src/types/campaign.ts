export interface Campaign {
  id: number;
  company: string;
  title: string;
  budget: string;
  platform: string;
  followers: string;
  deadline: string;
  image: string;
  genre: string;
  isVip: boolean;
  requiresDraft?: boolean;
  draftDeadline?: string;
  isPublic?: boolean;
}

export interface CampaignFilters {
  genres: Set<string>;
  platforms: string[];
  showVipOnly: boolean;
  showPaidOnly: boolean;
  showFreeOnly: boolean;
  searchQuery: string;
}

export interface CampaignState {
  campaigns: Campaign[];
  initialize: () => void;
  getPublicCampaigns: () => Campaign[];
  getVisibleCampaigns: (isAuthenticated: boolean) => Campaign[];
}
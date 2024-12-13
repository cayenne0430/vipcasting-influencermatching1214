import { create } from 'zustand';
import { Campaign, CampaignState } from '../types/campaign';
import { generateCampaigns } from '../utils/campaignGenerator';

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],

  initialize: () => {
    const campaigns = generateCampaigns();
    set({ campaigns });
  },

  getPublicCampaigns: () => {
    return get().campaigns.filter(campaign => campaign.isPublic);
  },

  getVisibleCampaigns: (isAuthenticated: boolean) => {
    const campaigns = get().campaigns;
    if (isAuthenticated) {
      return campaigns;
    }
    return campaigns.filter(campaign => campaign.isPublic);
  }
}));
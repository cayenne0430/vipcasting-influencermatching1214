import { create } from 'zustand';
import type { CompanyCampaign, CampaignStatus } from '../../types/company/campaign';
import { generateMockCampaigns } from '../../utils/company/mockDataGenerator';

interface CompanyCampaignState {
  campaigns: CompanyCampaign[];
  initialize: () => void;
  filterCampaigns: (status: CampaignStatus | 'all', searchQuery: string) => CompanyCampaign[];
  getCampaign: (id: string) => CompanyCampaign | undefined;
  updateCampaignStatus: (id: string, status: CampaignStatus) => void;
  updateApplicationStatus: (campaignId: string, applicationId: string, status: 'accepted' | 'rejected' | 'completed') => void;
}

export const useCompanyCampaignStore = create<CompanyCampaignState>((set, get) => ({
  campaigns: [],

  initialize: () => {
    const campaigns = generateMockCampaigns();
    set({ campaigns });
  },

  filterCampaigns: (status, searchQuery) => {
    const { campaigns } = get();
    return campaigns.filter(campaign => {
      const matchesStatus = status === 'all' || campaign.status === status;
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  },

  getCampaign: (id) => {
    return get().campaigns.find(campaign => campaign.id === id);
  },

  updateCampaignStatus: (id, status) => {
    set(state => ({
      campaigns: state.campaigns.map(campaign =>
        campaign.id === id ? { ...campaign, status } : campaign
      )
    }));
  },

  updateApplicationStatus: (campaignId, applicationId, status) => {
    set(state => ({
      campaigns: state.campaigns.map(campaign => {
        if (campaign.id !== campaignId) return campaign;

        const updatedApplications = campaign.applications.map(app =>
          app.id === applicationId ? { ...app, status } : app
        );

        const acceptedCount = updatedApplications.filter(app => app.status === 'accepted').length;
        const completedCount = updatedApplications.filter(app => app.status === 'completed').length;

        return {
          ...campaign,
          applications: updatedApplications,
          acceptedApplications: acceptedCount,
          completedApplications: completedCount
        };
      })
    }));
  }
}));
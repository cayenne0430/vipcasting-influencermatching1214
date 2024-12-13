import React from 'react';
import CampaignRow from './CampaignRow';
import type { CompanyCampaign } from '../../../types/company/campaign';

interface CampaignListProps {
  campaigns: CompanyCampaign[];
  onStatusClick: (campaignId: string, status: 'pending' | 'accepted' | 'completed') => void;
  onEdit: (id: string) => void;
}

const CampaignList: React.FC<CampaignListProps> = ({
  campaigns,
  onStatusClick,
  onEdit
}) => {
  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        該当する案件がありません。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => (
        <CampaignRow
          key={campaign.id}
          campaign={campaign}
          onStatusClick={onStatusClick}
          onEdit={() => onEdit(campaign.id)}
        />
      ))}
    </div>
  );
};

export default CampaignList;
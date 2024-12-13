import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import CampaignStatusCards from './CampaignStatusCards';
import CampaignActions from './CampaignActions';
import type { CompanyCampaign } from '../../../types/company/campaign';

interface CampaignRowProps {
  campaign: CompanyCampaign;
  onStatusClick: (campaignId: string, status: 'pending' | 'accepted' | 'completed' | null) => void;
  onEdit: () => void;
}

const CampaignRow: React.FC<CampaignRowProps> = ({
  campaign,
  onStatusClick,
  onEdit
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              to={`/company/campaigns/${campaign.id}`}
              className="text-lg font-medium text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              {campaign.title}
            </Link>
            <CampaignStatusBadge status={campaign.status} />
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {campaign.startDate} 〜 {campaign.endDate}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {campaign.budget}
            </div>
            <div>
              {campaign.platform}
            </div>
          </div>
        </div>
        <CampaignActions onEdit={onEdit} />
      </div>

      <CampaignStatusCards
        applications={campaign.applications}
        onStatusClick={(status) => onStatusClick(campaign.id, status)}
      />
    </div>
  );
};

export default CampaignRow;
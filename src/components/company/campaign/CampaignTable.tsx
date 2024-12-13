import React from 'react';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import CampaignSummary from './CampaignSummary';
import CampaignActions from './CampaignActions';
import type { CompanyCampaign } from '../../../types/company/campaign';

interface CampaignTableProps {
  campaigns: CompanyCampaign[];
  onCampaignClick: (id: string) => void;
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
}

const CampaignTable: React.FC<CampaignTableProps> = ({
  campaigns,
  onCampaignClick,
  onEdit,
  onCopy,
  onDelete
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              依頼タイトル
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              形式
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ステータス
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              対応が必要
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              お仕事サマリー
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              操作
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {campaigns.map((campaign, index) => (
            <tr
              key={campaign.id}
              className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              onClick={() => onCampaignClick(campaign.id)}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{campaign.title}</div>
                <div className="text-sm text-gray-500">{campaign.platform}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                プロジェクト
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CampaignStatusBadge status={campaign.status} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                なし
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <CampaignSummary
                  consulting={campaign.applications.filter(app => app.status === 'pending').length}
                  applications={campaign.totalApplications}
                  contracted={campaign.acceptedApplications}
                  completed={campaign.completedApplications}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right">
                <CampaignActions
                  onEdit={() => onEdit(campaign.id)}
                  onCopy={() => onCopy(campaign.id)}
                  onDelete={() => onDelete(campaign.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CampaignTable;
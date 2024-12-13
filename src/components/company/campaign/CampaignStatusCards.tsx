import React from 'react';
import { Users, CheckCircle, Flag, FileText } from 'lucide-react';
import type { CampaignApplication } from '../../../types/company/campaign';

interface CampaignStatusCardsProps {
  applications: CampaignApplication[];
  onStatusClick: (status: 'pending' | 'accepted' | 'completed' | null) => void;
}

const CampaignStatusCards: React.FC<CampaignStatusCardsProps> = ({
  applications,
  onStatusClick
}) => {
  const totalCount = applications.length;
  const pendingCount = applications.filter(app => app.status === 'pending').length;
  const acceptedCount = applications.filter(app => app.status === 'accepted').length;
  const completedCount = applications.filter(app => app.status === 'completed').length;
  const rejectedCount = applications.filter(app => app.status === 'rejected').length;

  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Total Status Card */}
      <button
        onClick={() => onStatusClick(null)}
        className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 border border-gray-200 transition group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">全体</span>
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {totalCount}<span className="text-sm font-normal text-gray-500 ml-1">人</span>
        </div>
        {rejectedCount > 0 && (
          <div className="text-xs text-gray-500 mt-1">
            却下: {rejectedCount}人
          </div>
        )}
      </button>

      {/* Pending Applications Card */}
      <button
        onClick={() => onStatusClick('pending')}
        className="bg-gray-50 p-4 rounded-lg hover:bg-purple-50 hover:border-purple-200 border border-gray-200 transition group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">応募</span>
          <Users className="w-5 h-5 text-purple-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 group-hover:text-purple-600">
          {pendingCount}<span className="text-sm font-normal text-gray-500 ml-1">人</span>
        </div>
      </button>

      {/* Accepted Applications Card */}
      <button
        onClick={() => onStatusClick('accepted')}
        className="bg-gray-50 p-4 rounded-lg hover:bg-green-50 hover:border-green-200 border border-gray-200 transition group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">契約済み</span>
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 group-hover:text-green-600">
          {acceptedCount}<span className="text-sm font-normal text-gray-500 ml-1">人</span>
        </div>
      </button>

      {/* Completed Applications Card */}
      <button
        onClick={() => onStatusClick('completed')}
        className="bg-gray-50 p-4 rounded-lg hover:bg-blue-50 hover:border-blue-200 border border-gray-200 transition group"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 font-medium">完了</span>
          <Flag className="w-5 h-5 text-blue-600" />
        </div>
        <div className="text-2xl font-bold text-gray-900 group-hover:text-blue-600">
          {completedCount}<span className="text-sm font-normal text-gray-500 ml-1">人</span>
        </div>
      </button>
    </div>
  );
};

export default CampaignStatusCards;
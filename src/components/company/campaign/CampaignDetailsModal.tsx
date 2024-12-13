import React, { useState } from 'react';
import { Calendar, DollarSign, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { CampaignStatusBadge } from './CampaignStatusBadge';
import ApplicationList from './ApplicationList';
import CampaignEditModal from './CampaignEditModal';
import type { CompanyCampaign } from '../../../types/company/campaign';

interface CampaignDetailsModalProps {
  campaign: CompanyCampaign;
  onClose: () => void;
  onViewProfile: (influencerId: string) => void;
  onSendMessage: (influencerId: string) => void;
  onUpdateStatus: (applicationId: string, status: 'accepted' | 'rejected' | 'completed') => void;
  initialApplicationStatus?: 'pending' | 'accepted' | 'completed' | null;
}

const CampaignDetailsModal: React.FC<CampaignDetailsModalProps> = ({
  campaign,
  onClose,
  onViewProfile,
  onSendMessage,
  onUpdateStatus,
  initialApplicationStatus
}) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const filteredApplications = initialApplicationStatus
    ? campaign.applications.filter(app => app.status === initialApplicationStatus)
    : campaign.applications;

  const getStatusTitle = () => {
    if (!initialApplicationStatus) return '全体';
    switch (initialApplicationStatus) {
      case 'pending':
        return '応募者';
      case 'accepted':
        return '契約済み';
      case 'completed':
        return '完了';
      default:
        return '応募者一覧';
    }
  };

  const handleSave = (updatedCampaign: Partial<CompanyCampaign>) => {
    // TODO: Implement save functionality
    console.log('Save updated campaign:', updatedCampaign);
    setIsEditModalOpen(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-2xl font-bold">{campaign.title}</h2>
                  <CampaignStatusBadge status={campaign.status} />
                </div>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {campaign.startDate} 〜 {campaign.endDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {campaign.budget}
                  </div>
                  <div>{campaign.platform}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-500 border border-purple-600 hover:bg-purple-50 rounded-lg transition"
                >
                  編集
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {campaign.description && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">案件内容</h3>
                <p className="text-gray-600">{campaign.description}</p>
              </div>
            )}

            {campaign.requirements && campaign.requirements.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">応募条件</h3>
                <ul className="list-disc list-inside text-gray-600">
                  {campaign.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-4">{getStatusTitle()}</h3>
              <ApplicationList
                applications={filteredApplications}
                onViewProfile={onViewProfile}
                onSendMessage={onSendMessage}
                onUpdateStatus={onUpdateStatus}
              />
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <CampaignEditModal
          campaign={campaign}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default CampaignDetailsModal;
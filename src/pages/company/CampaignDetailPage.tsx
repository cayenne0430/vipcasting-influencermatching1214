import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, DollarSign, Users, MessageSquare, FileText, AlertCircle } from 'lucide-react';
import { useCompanyCampaignStore } from '../../store/company/campaignStore';
import { CampaignStatusBadge } from '../../components/company/campaign/CampaignStatusBadge';
import ApplicationList from '../../components/company/campaign/ApplicationList';
import CampaignEditModal from '../../components/company/campaign/CampaignEditModal';

const CampaignDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCampaign, updateApplicationStatus } = useCompanyCampaignStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'latest' | 'engagement' | 'followers'>('latest');

  const campaign = getCampaign(id || '');

  if (!campaign) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600">
          案件が見つかりませんでした。
        </div>
      </div>
    );
  }

  const handleViewProfile = (influencerId: string) => {
    // TODO: Implement profile view
    console.log('View profile:', influencerId);
  };

  const handleSendMessage = (influencerId: string) => {
    // TODO: Implement messaging
    console.log('Send message:', influencerId);
  };

  const handleSave = (updatedCampaign: any) => {
    // TODO: Implement save functionality
    console.log('Save updated campaign:', updatedCampaign);
    setIsEditModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl font-bold">{campaign.title}</h1>
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
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-500 border border-purple-600 hover:bg-purple-50 rounded-lg transition"
              >
                編集
              </button>
              <button
                onClick={() => navigate('/company/campaigns')}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-500 border border-gray-300 hover:bg-gray-50 rounded-lg transition"
              >
                一覧に戻る
              </button>
            </div>
          </div>

          {/* Campaign Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 font-medium">応募者数</span>
                <Users className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-2xl font-bold">
                {campaign.totalApplications}
                <span className="text-sm font-normal text-gray-500 ml-1">人</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 font-medium">契約済み</span>
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-2xl font-bold">
                {campaign.acceptedApplications}
                <span className="text-sm font-normal text-gray-500 ml-1">人</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 font-medium">完了</span>
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl font-bold">
                {campaign.completedApplications}
                <span className="text-sm font-normal text-gray-500 ml-1">人</span>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Details */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">案件詳細</h2>
          {campaign.description && (
            <div className="mb-6">
              <h3 className="font-medium mb-2">案件内容</h3>
              <p className="text-gray-600">{campaign.description}</p>
            </div>
          )}

          {campaign.requirements && campaign.requirements.length > 0 && (
            <div>
              <h3 className="font-medium mb-2">応募条件</h3>
              <ul className="list-disc list-inside text-gray-600">
                {campaign.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Applications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">応募者一覧</h2>
          <ApplicationList
            applications={campaign.applications}
            onViewProfile={handleViewProfile}
            onSendMessage={handleSendMessage}
            onUpdateStatus={(applicationId, status) => {
              if (id) {
                updateApplicationStatus(id, applicationId, status);
              }
            }}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <CampaignEditModal
          campaign={campaign}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CampaignDetailPage;
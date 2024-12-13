import React, { useState, useEffect } from 'react';
import { Search, FileText } from 'lucide-react';
import { useCompanyCampaignStore } from '../../store/company/campaignStore';
import { CampaignStatusBadge } from '../../components/company/campaign/CampaignStatusBadge';
import CampaignList from '../../components/company/campaign/CampaignList';
import CampaignDetailsModal from '../../components/company/campaign/CampaignDetailsModal';
import CreateCampaignButton from '../../components/company/campaign/CreateCampaignButton';
import type { CampaignStatus } from '../../types/company/campaign';

const CampaignManagementPage = () => {
  const [selectedStatus, setSelectedStatus] = useState<CampaignStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCampaignId, setSelectedCampaignId] = useState<string | null>(null);
  const [selectedApplicationStatus, setSelectedApplicationStatus] = useState<'pending' | 'accepted' | 'completed' | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const {
    initialize,
    filterCampaigns,
    getCampaign,
    updateApplicationStatus
  } = useCompanyCampaignStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const filteredCampaigns = filterCampaigns(selectedStatus, searchQuery);
  const selectedCampaign = selectedCampaignId ? getCampaign(selectedCampaignId) : null;

  const handleViewProfile = (influencerId: string) => {
    // TODO: Implement profile view
    console.log('View profile:', influencerId);
  };

  const handleSendMessage = (influencerId: string) => {
    // TODO: Implement messaging
    console.log('Send message:', influencerId);
  };

  const handleUpdateStatus = (applicationId: string, status: 'accepted' | 'rejected' | 'completed') => {
    if (selectedCampaignId) {
      updateApplicationStatus(selectedCampaignId, applicationId, status);
    }
  };

  const handleStatusClick = (campaignId: string, status: 'pending' | 'accepted' | 'completed' | null) => {
    setSelectedCampaignId(campaignId);
    setSelectedApplicationStatus(status);
    setIsDetailsModalOpen(true);
  };

  const handleEditCampaign = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit campaign:', id);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">案件管理</h1>
        <div className="flex gap-4">
          <CreateCampaignButton />
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <FileText className="w-4 h-4" />
            レポート出力
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="案件を検索"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as CampaignStatus | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="all">すべてのステータス</option>
            <option value="active">進行中</option>
            <option value="draft">下書き</option>
            <option value="completed">完了</option>
            <option value="cancelled">中止</option>
          </select>
        </div>

        <CampaignList
          campaigns={filteredCampaigns}
          onStatusClick={handleStatusClick}
          onEdit={handleEditCampaign}
        />
      </div>

      {isDetailsModalOpen && selectedCampaign && (
        <CampaignDetailsModal
          campaign={selectedCampaign}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedApplicationStatus(null);
          }}
          onViewProfile={handleViewProfile}
          onSendMessage={handleSendMessage}
          onUpdateStatus={handleUpdateStatus}
          initialApplicationStatus={selectedApplicationStatus}
        />
      )}
    </div>
  );
};

export default CampaignManagementPage;
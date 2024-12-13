import React from 'react';
import type { CampaignStatus, ApplicationStatus } from '../../../types/company/campaign';

interface StatusBadgeProps {
  status: CampaignStatus | ApplicationStatus;
  size?: 'sm' | 'md';
}

export const CampaignStatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getStatusColor = (status: CampaignStatus | ApplicationStatus) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: CampaignStatus | ApplicationStatus) => {
    switch (status) {
      case 'active':
        return '進行中';
      case 'draft':
        return '下書き';
      case 'completed':
        return '完了';
      case 'cancelled':
        return '中止';
      case 'accepted':
        return '契約済み';
      case 'pending':
        return '応募';
      case 'rejected':
        return '不採用';
      default:
        return status;
    }
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span className={`rounded-full font-medium ${sizeClasses[size]} ${getStatusColor(status)}`}>
      {getStatusText(status)}
    </span>
  );
};
import React from 'react';

interface CampaignActionsProps {
  onEdit: () => void;
}

const CampaignActions: React.FC<CampaignActionsProps> = ({ onEdit }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onEdit();
      }}
      className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-500 border border-purple-600 hover:bg-purple-50 rounded-lg transition"
    >
      編集
    </button>
  );
};

export default CampaignActions;
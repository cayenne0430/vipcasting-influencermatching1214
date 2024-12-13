import React from 'react';

interface CampaignSummaryProps {
  consulting: number;
  applications: number;
  contracted: number;
  completed: number;
}

const CampaignSummary: React.FC<CampaignSummaryProps> = ({
  consulting,
  applications,
  contracted,
  completed
}) => {
  return (
    <div className="flex gap-4 text-sm">
      <div>
        <span className="text-gray-600">相談:</span>
        <span className="ml-1 font-medium">{consulting}人</span>
      </div>
      <div>
        <span className="text-gray-600">応募:</span>
        <span className="ml-1 font-medium">{applications}人</span>
      </div>
      <div>
        <span className="text-gray-600">契約済み:</span>
        <span className="ml-1 font-medium">{contracted}人</span>
      </div>
      <div>
        <span className="text-gray-600">契約完了:</span>
        <span className="ml-1 font-medium">{completed}人</span>
      </div>
    </div>
  );
};

export default CampaignSummary;
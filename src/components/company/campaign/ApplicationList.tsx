import React, { useState } from 'react';
import { MessageSquare, UserCircle, Star, ExternalLink, ArrowUpDown } from 'lucide-react';
import type { CampaignApplication } from '../../../types/company/campaign';

interface ApplicationListProps {
  applications: CampaignApplication[];
  onViewProfile: (influencerId: string) => void;
  onSendMessage: (influencerId: string) => void;
  onUpdateStatus: (applicationId: string, status: 'accepted' | 'rejected' | 'completed') => void;
}

type SortOption = 'latest' | 'engagement' | 'followers';

const ApplicationList: React.FC<ApplicationListProps> = ({
  applications,
  onViewProfile,
  onSendMessage,
  onUpdateStatus
}) => {
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const getSortedApplications = () => {
    return [...applications].sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.appliedAt).getTime() - new Date(a.appliedAt).getTime();
        case 'engagement':
          return (b.engagement || 0) - (a.engagement || 0);
        case 'followers':
          return (b.followers || 0) - (a.followers || 0);
        default:
          return 0;
      }
    });
  };

  const sortedApplications = getSortedApplications();

  return (
    <div>
      {/* Sorting Controls */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="latest">新着順</option>
            <option value="engagement">高評価順</option>
            <option value="followers">フォロワーが多い順</option>
          </select>
        </div>
      </div>

      {/* Application List */}
      <div className="space-y-4">
        {sortedApplications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            該当する応募者がいません。
          </div>
        ) : (
          sortedApplications.map((application) => (
            <div
              key={application.id}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-200 transition"
            >
              {/* Rest of the application card content remains the same */}
              <div className="flex items-start gap-4">
                <img
                  src={application.profileImage}
                  alt={application.influencerName}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100';
                  }}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900">{application.influencerName}</h3>
                        <ApplicationStatusBadge status={application.status} />
                        {application.engagement && application.engagement > 3 && (
                          <span className="flex items-center gap-0.5 text-yellow-500 text-sm">
                            <Star className="w-4 h-4" />
                            高エンゲージメント
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        応募日: {application.appliedAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewProfile(application.influencerId)}
                        className="text-purple-600 hover:text-purple-500 p-2 rounded-full hover:bg-purple-50 transition"
                        title="プロフィールを見る"
                      >
                        <UserCircle className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onSendMessage(application.influencerId)}
                        className="text-purple-600 hover:text-purple-500 p-2 rounded-full hover:bg-purple-50 transition"
                        title="メッセージを送る"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </button>
                      <a
                        href={`https://instagram.com/${application.influencerName}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-600 hover:text-purple-500 p-2 rounded-full hover:bg-purple-50 transition"
                        title="SNSプロフィールを見る"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-500">フォロワー:</span>
                      <span className="ml-1 font-medium">{application.followers?.toLocaleString()}人</span>
                    </div>
                    {application.engagement && (
                      <div>
                        <span className="text-gray-500">エンゲージメント率:</span>
                        <span className="ml-1 font-medium">{application.engagement}%</span>
                      </div>
                    )}
                  </div>

                  <div className="text-gray-600 text-sm mb-4">
                    {application.message}
                  </div>

                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onUpdateStatus(application.id, 'accepted')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-500 transition"
                      >
                        契約する
                      </button>
                      <button
                        onClick={() => onUpdateStatus(application.id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-500 transition"
                      >
                        却下する
                      </button>
                    </div>
                  )}

                  {application.status === 'accepted' && (
                    <button
                      onClick={() => onUpdateStatus(application.id, 'completed')}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-500 transition"
                    >
                      完了にする
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const ApplicationStatusBadge: React.FC<{ status: CampaignApplication['status'] }> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return { text: '応募', className: 'bg-yellow-100 text-yellow-800' };
      case 'accepted':
        return { text: '契約済み', className: 'bg-green-100 text-green-800' };
      case 'completed':
        return { text: '完了', className: 'bg-blue-100 text-blue-800' };
      case 'rejected':
        return { text: '却下', className: 'bg-red-100 text-red-800' };
      default:
        return { text: status, className: 'bg-gray-100 text-gray-800' };
    }
  };

  const config = getStatusConfig();
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.text}
    </span>
  );
};

export default ApplicationList;
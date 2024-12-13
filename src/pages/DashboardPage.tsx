import React, { useState } from 'react';
import { Calendar, Star, TrendingUp, MessageSquare, FileText, AlertCircle } from 'lucide-react';

interface Campaign {
  id: number;
  title: string;
  company: string;
  deadline: string;
  status: string;
  budget?: string;
  platform?: string;
  deliverables?: string[];
  startDate?: string;
  endDate?: string;
  nextTask?: string;
  nextDeadline?: string;
  draftDeadline?: string;
}

interface ScheduleEvent {
  id: number;
  date: string;
  title: string;
  type: string;
  campaignId: number;
}

const DashboardPage = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data
  const activeCampaigns: Campaign[] = [
    {
      id: 1,
      title: "春の新作コスメPRキャンペーン",
      company: "Beauty Co.",
      deadline: "2024-04-30",
      status: "進行中",
      budget: "¥50,000",
      platform: "Instagram",
      deliverables: ["商品レビュー投稿", "ストーリーズ投稿"],
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      nextTask: "商品レビュー投稿",
      nextDeadline: "2024-04-15",
      draftDeadline: "2024-04-10"
    },
    {
      id: 2,
      title: "プロテインドリンク新商品PR",
      company: "Fitness Lab",
      deadline: "2024-04-15",
      status: "確認待ち",
      budget: "¥30,000",
      platform: "TikTok",
      deliverables: ["商品紹介動画", "トレーニング動画"],
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      draftDeadline: "2024-03-25"
    },
    {
      id: 3,
      title: "夏物ファッションアイテムPR",
      company: "Fashion Brand X",
      deadline: "2024-05-10",
      status: "進行中",
      budget: "¥80,000",
      platform: "Instagram",
      deliverables: ["コーディネート投稿", "着用レビュー"],
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      nextTask: "コーディネート投稿",
      nextDeadline: "2024-05-15",
      draftDeadline: "2024-05-10"
    },
    {
      id: 4,
      title: "オーガニック食品レビュー",
      company: "Organic Foods",
      deadline: "2024-05-15",
      status: "進行中",
      budget: "¥60,000",
      platform: "YouTube",
      deliverables: ["商品レビュー動画", "レシピ動画"],
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      nextTask: "レビュー動画投稿",
      nextDeadline: "2024-05-20",
      draftDeadline: "2024-05-15"
    },
    {
      id: 5,
      title: "新作スキンケア商品PR",
      company: "Skin Beauty",
      deadline: "2024-05-20",
      status: "確認待ち",
      budget: "¥45,000",
      platform: "Instagram",
      deliverables: ["使用レビュー投稿", "ビフォーアフター投稿"],
      startDate: "2024-05-15",
      endDate: "2024-06-15",
      draftDeadline: "2024-05-25"
    }
  ];

  const appliedCampaigns = [
    {
      id: 6,
      title: "夏物ファッションアイテムPR",
      company: "Fashion Brand X",
      appliedDate: "2024-04-01",
      status: "審査中"
    }
  ];

  const schedule: ScheduleEvent[] = [
    {
      id: 1,
      date: "2024-04-10",
      title: "Beauty Co. 商品レビュー投稿",
      type: "投稿",
      campaignId: 1
    },
    {
      id: 2,
      date: "2024-04-15",
      title: "Fitness Lab ミーティング",
      type: "ミーティング",
      campaignId: 2
    },
    {
      id: 3,
      date: "2024-04-20",
      title: "Fashion Brand X 撮影",
      type: "撮影",
      campaignId: 3
    },
    {
      id: 4,
      date: "2024-04-25",
      title: "Organic Foods レビュー動画",
      type: "動画投稿",
      campaignId: 4
    },
    {
      id: 5,
      date: "2024-04-30",
      title: "Skin Beauty 商品紹介",
      type: "投稿",
      campaignId: 5
    }
  ];

  const handleCampaignClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setIsDetailsModalOpen(true);
  };

  const handleScheduleClick = (campaignId: number) => {
    const campaign = activeCampaigns.find(c => c.id === campaignId);
    if (campaign) {
      setSelectedCampaign(campaign);
      setIsDetailsModalOpen(true);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Active Campaigns Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">対応中の案件</h2>
            <TrendingUp className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {activeCampaigns.length}
          </div>
          <p className="text-gray-600 text-sm">件の案件を実施中</p>
        </div>

        {/* Applied Campaigns Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">応募中の案件</h2>
            <Calendar className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {appliedCampaigns.length}
          </div>
          <p className="text-gray-600 text-sm">件の案件に応募中</p>
        </div>

        {/* Average Rating Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">平均評価</h2>
            <Star className="text-yellow-400 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-yellow-400 mb-2">4.8</div>
          <p className="text-gray-600 text-sm">過去30日間の評価</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Active Campaigns List */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-4">対応中の案件</h2>
          <div className="space-y-4">
            {activeCampaigns.map(campaign => (
              <div
                key={campaign.id}
                className="border-b pb-4 last:border-0 last:pb-0 hover:bg-gray-50 cursor-pointer transition p-4 rounded-lg"
                onClick={() => handleCampaignClick(campaign)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{campaign.title}</h3>
                    <p className="text-sm text-gray-600">{campaign.company}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    campaign.status === "進行中" 
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {campaign.status}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  締切: {campaign.deadline}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-4">今月のスケジュール</h2>
          <div className="space-y-4">
            {schedule.map((event) => (
              <div
                key={event.id}
                className="flex items-start space-x-4 hover:bg-gray-50 cursor-pointer transition p-4 rounded-lg"
                onClick={() => handleScheduleClick(event.campaignId)}
              >
                <Calendar className="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <div className="font-medium">{event.title}</div>
                  <div className="text-sm text-gray-600">
                    {event.date} - {event.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Campaign Details Modal */}
      {isDetailsModalOpen && selectedCampaign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedCampaign.title}</h2>
                  <p className="text-gray-600">{selectedCampaign.company}</p>
                </div>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <div className="text-sm text-gray-500 mb-1">キャンペーン期間</div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    {selectedCampaign.startDate} 〜 {selectedCampaign.endDate}
                  </div>
                </div>
                {selectedCampaign.budget && (
                  <div>
                    <div className="text-sm text-gray-500 mb-1">報酬</div>
                    <div className="text-gray-700">{selectedCampaign.budget}</div>
                  </div>
                )}
              </div>

              {selectedCampaign.deliverables && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">成果物</h3>
                  <ul className="space-y-2">
                    {selectedCampaign.deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-purple-600 rounded-full mr-2"></span>
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-4">
                <button className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500 transition flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  担当者にメッセージ
                </button>
                <button className="flex-1 border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  契約書を確認
                </button>
              </div>

              {selectedCampaign.status === 'ongoing' && selectedCampaign.nextDeadline && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-yellow-800">次回の締切が近づいています</div>
                    <div className="text-sm text-yellow-700">
                      {selectedCampaign.nextTask}: {selectedCampaign.nextDeadline}まで
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Crown, Star, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import CampaignCard from '../components/CampaignCard';
import { useAuthStore } from '../store/authStore';
import { useCampaignStore } from '../store/campaignStore';
import type { Campaign } from '../types/campaign';

const CampaignsPage = () => {
  const { isAuthenticated, user } = useAuthStore();
  const { campaigns, initialize, getVisibleCampaigns } = useCampaignStore();
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [platformFilter, setPlatformFilter] = useState<string[]>([]);
  const [showVipOnly, setShowVipOnly] = useState(false);
  const [showPaidOnly, setShowPaidOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);

  useEffect(() => {
    initialize();
  }, []);

  const toggleGenre = (genre: string) => {
    const newGenres = new Set(selectedGenres);
    if (newGenres.has(genre)) {
      newGenres.delete(genre);
    } else {
      newGenres.add(genre);
    }
    setSelectedGenres(newGenres);
  };

  const togglePlatform = (platform: string) => {
    setPlatformFilter(prev => 
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  const visibleCampaigns = getVisibleCampaigns(isAuthenticated);
  const filteredCampaigns = visibleCampaigns
    .filter(campaign => {
      const matchesGenre = selectedGenres.size === 0 || selectedGenres.has(campaign.genre);
      const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          campaign.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter.length === 0 || platformFilter.includes(campaign.platform);
      const matchesVip = !showVipOnly || campaign.isVip;
      const matchesPaid = !showPaidOnly || parseInt(campaign.budget.replace(/[^0-9]/g, '')) > 0;
      const matchesFree = !showFreeOnly || parseInt(campaign.budget.replace(/[^0-9]/g, '')) === 0;
      return matchesGenre && matchesSearch && matchesPlatform && matchesVip && matchesPaid && matchesFree;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'budget-high':
          return parseInt(b.budget.replace(/[^0-9]/g, '')) - parseInt(a.budget.replace(/[^0-9]/g, ''));
        case 'budget-low':
          return parseInt(a.budget.replace(/[^0-9]/g, '')) - parseInt(b.budget.replace(/[^0-9]/g, ''));
        default:
          return b.id - a.id;
      }
    });

  const isCompanyUser = user?.type === 'company';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-700 to-purple-900 text-white p-8 rounded-lg mb-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {isCompanyUser ? '市場の案件を確認する' : '限定案件を探す'}
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              {isCompanyUser 
                ? '他社の案件情報を確認し、市場動向を把握できます。'
                : 'VIPキャスティングだけの、厳選された高単価案件をご紹介します。'}
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>VIP限定案件: {campaigns.filter(c => c.isVip).length}件</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span>平均報酬: ¥85,000</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <span>新規案件: 今週10件追加</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="案件を検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
              フィルター
            </button>
          </div>
        </div>

        {/* Campaign Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map(campaign => (
            <CampaignCard 
              key={campaign.id} 
              campaign={campaign}
              hideApplyButton={isCompanyUser}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            条件に一致する案件が見つかりませんでした。
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignsPage;
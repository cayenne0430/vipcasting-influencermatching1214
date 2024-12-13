import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { CompanyCampaign } from '../../../types/company/campaign';
import type { Platform } from '../../../types/platform';
import { PLATFORMS, GENRES } from '../../../utils/constants';

interface CampaignEditModalProps {
  campaign: CompanyCampaign;
  onClose: () => void;
  onSave: (updatedCampaign: Partial<CompanyCampaign>) => void;
}

const CampaignEditModal: React.FC<CampaignEditModalProps> = ({
  campaign,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    title: campaign.title,
    platform: campaign.platform,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    budget: campaign.budget.replace('¥', ''),
    description: campaign.description || '',
    requirements: campaign.requirements || [],
    targetAge: {
      min: '18',
      max: '35'
    },
    targetGender: 'all',
    targetRegions: [] as string[],
    interests: [] as string[],
    lifestyle: '',
    hashTags: [] as string[],
    postCount: 1
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...campaign,
      title: formData.title,
      platform: formData.platform,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: `¥${formData.budget}`,
      description: formData.description,
      requirements: formData.requirements
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">案件を編集</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">基本情報</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    タイトル
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                    maxLength={100}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      プラットフォーム
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value as Platform })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      {PLATFORMS.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      報酬
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5">¥</span>
                      <input
                        type="number"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        required
                        min="5000"
                        max="1000000"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      開始日
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      終了日
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Description */}
            <section>
              <h3 className="text-lg font-semibold mb-4">案件内容</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  案件説明
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  rows={5}
                  required
                  maxLength={2000}
                />
              </div>
            </section>

            {/* Requirements */}
            <section>
              <h3 className="text-lg font-semibold mb-4">応募条件</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      対象年齢
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={formData.targetAge.min}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAge: { ...formData.targetAge, min: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        min="13"
                        max="100"
                      />
                      <span>〜</span>
                      <input
                        type="number"
                        value={formData.targetAge.max}
                        onChange={(e) => setFormData({
                          ...formData,
                          targetAge: { ...formData.targetAge, max: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        min="13"
                        max="100"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      性別
                    </label>
                    <select
                      value={formData.targetGender}
                      onChange={(e) => setFormData({ ...formData, targetGender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="all">指定なし</option>
                      <option value="male">男性</option>
                      <option value="female">女性</option>
                      <option value="other">その他</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ジャンル
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {GENRES.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => {
                          const newInterests = formData.interests.includes(genre)
                            ? formData.interests.filter(i => i !== genre)
                            : [...formData.interests, genre];
                          setFormData({ ...formData, interests: newInterests });
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.interests.includes(genre)
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-4 pt-6 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                キャンセル
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
              >
                保存
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CampaignEditModal;
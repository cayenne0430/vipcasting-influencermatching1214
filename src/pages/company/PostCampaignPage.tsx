import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { PLATFORMS, GENRES } from '../../utils/constants';
import type { Platform } from '../../types/platform';

interface CampaignFormData {
  title: string;
  platform: Platform;
  startDate: string;
  endDate: string;
  budget: string;
  description: string;
  requirements: string[];
  targetAge: {
    min: string;
    max: string;
  };
  targetGender: string;
  targetRegions: string[];
  interests: string[];
  lifestyle: string;
  hashTags: string[];
  postCount: number;
}

const PostCampaignPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    title: '',
    platform: 'Instagram',
    startDate: '',
    endDate: '',
    budget: '',
    description: '',
    requirements: [],
    targetAge: {
      min: '18',
      max: '35'
    },
    targetGender: 'all',
    targetRegions: [],
    interests: [],
    lifestyle: '',
    hashTags: [],
    postCount: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call to create campaign
    console.log('Form submitted:', formData);
    navigate('/company/campaigns');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">新規案件作成</h1>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">基本情報</h2>
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
                  placeholder="例：春の新作コスメPRキャンペーン"
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
                      placeholder="50000"
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

          {/* Campaign Details */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">案件内容</h2>
            <div className="space-y-4">
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
                  placeholder="商品・サービスの説明や、PRのポイントなどを記載してください。"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  投稿回数
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="number"
                  value={formData.postCount}
                  onChange={(e) => setFormData({ ...formData, postCount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  required
                  min="1"
                  max="10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ハッシュタグ
                </label>
                <input
                  type="text"
                  value={formData.hashTags.join(', ')}
                  onChange={(e) => setFormData({ ...formData, hashTags: e.target.value.split(',').map(tag => tag.trim()) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  placeholder="#example, #campaign"
                />
              </div>
            </div>
          </section>

          {/* Target Audience */}
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">ターゲット層</h2>
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ライフスタイル
                </label>
                <textarea
                  value={formData.lifestyle}
                  onChange={(e) => setFormData({ ...formData, lifestyle: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  rows={3}
                  maxLength={500}
                  placeholder="ターゲットとなるユーザーのライフスタイルについて記載してください。"
                />
              </div>
            </div>
          </section>

          {/* Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-yellow-800">掲載前の確認事項</div>
              <ul className="mt-2 text-sm text-yellow-700 space-y-1">
                <li>• 案件内容は掲載後も編集可能です</li>
                <li>• 掲載後のキャンセルには規約に基づくキャンセル料が発生する場合があります</li>
                <li>• 不適切な内容の案件は予告なく削除される場合があります</li>
              </ul>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/company/campaigns')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              キャンセル
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
            >
              掲載する
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCampaignPage;
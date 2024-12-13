import React from 'react';
import { Bell, MessageSquare, Users, Info } from 'lucide-react';
import { useNotificationStore } from '../../../store/notificationStore';

const NotificationSettings = () => {
  const { settings, updateSettings } = useNotificationStore();

  const handleFrequencyChange = (category: string, type: string, value: string) => {
    updateSettings(category, type, value);
  };

  const handleToggle = (category: string, type: string) => {
    const currentValue = settings[category][type].enabled;
    updateSettings(category, type, { enabled: !currentValue });
  };

  return (
    <div className="space-y-6">
      {/* 案件管理通知 */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">案件管理通知</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.campaign).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <div className="font-medium">
                  {key === 'newApplication' && '新規応募通知'}
                  {key === 'statusChange' && '案件ステータス変更通知'}
                  {key === 'reportSubmission' && 'レポート提出・完了通知'}
                  {key === 'applicationDeadline' && '応募締切り通知'}
                  {key === 'reportDeadline' && 'レポート未提出通知'}
                </div>
                <div className="text-sm text-gray-500">
                  {key === 'applicationDeadline' && '締切り3日前にお知らせ'}
                  {key === 'reportDeadline' && '期限3日前にお知らせ'}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={value.frequency}
                  onChange={(e) => handleFrequencyChange('campaign', key, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="immediate">即時</option>
                  <option value="daily">1日1回</option>
                  <option value="none">通知しない</option>
                </select>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value.enabled}
                    onChange={() => handleToggle('campaign', key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* コミュニケーション通知 */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <MessageSquare className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">コミュニケーション通知</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.communication).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="font-medium">
                {key === 'scoutReply' && 'スカウト返信通知'}
                {key === 'messageReceived' && 'メッセージ受信通知'}
                {key === 'unreadMessage' && '未読メッセージ通知'}
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={value.frequency}
                  onChange={(e) => handleFrequencyChange('communication', key, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="immediate">即時</option>
                  <option value="daily">1日1回</option>
                  <option value="none">通知しない</option>
                </select>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value.enabled}
                    onChange={() => handleToggle('communication', key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* インフルエンサー関連通知 */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">インフルエンサー関連通知</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.influencer).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="font-medium">
                {key === 'favoriteActivity' && 'お気に入りインフルエンサーの活動通知'}
                {key === 'newInfluencer' && '条件適合インフルエンサー登録通知'}
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={value.frequency}
                  onChange={(e) => handleFrequencyChange('influencer', key, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="immediate">即時</option>
                  <option value="daily">1日1回</option>
                  <option value="none">通知しない</option>
                </select>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value.enabled}
                    onChange={() => handleToggle('influencer', key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* システム通知 */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6 text-purple-600" />
          <h2 className="text-xl font-semibold">システム通知</h2>
        </div>

        <div className="space-y-4">
          {Object.entries(settings.system).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div className="font-medium">
                {key === 'maintenance' && 'メンテナンス情報'}
                {key === 'termsUpdate' && '規約変更'}
                {key === 'newFeature' && '新機能案内'}
                {key === 'important' && 'その他重要なお知らせ'}
              </div>
              <div className="flex items-center gap-4">
                <select
                  value={value.frequency}
                  onChange={(e) => handleFrequencyChange('system', key, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="immediate">即時</option>
                  <option value="daily">1日1回</option>
                  <option value="none">通知しない</option>
                </select>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    checked={value.enabled}
                    onChange={() => handleToggle('system', key)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NotificationSettings;
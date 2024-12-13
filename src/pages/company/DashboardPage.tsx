import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { Building2, Users, TrendingUp, MessageSquare } from 'lucide-react';

const CompanyDashboardPage = () => {
  const { user } = useAuthStore();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">企業ダッシュボード</h1>
      
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {/* Overview Cards */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">進行中の案件</h2>
            <Building2 className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">5</div>
          <p className="text-gray-600 text-sm">件の案件を実施中</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">応募者数</h2>
            <Users className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">23</div>
          <p className="text-gray-600 text-sm">人が応募中</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">メッセージ</h2>
            <MessageSquare className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">12</div>
          <p className="text-gray-600 text-sm">件の未読メッセージ</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">総リーチ数</h2>
            <TrendingUp className="text-purple-600 w-5 h-5" />
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">1.2M</div>
          <p className="text-gray-600 text-sm">フォロワーにリーチ</p>
        </div>
      </div>

      {/* Content will be added based on requirements */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">実装中...</h2>
        <p className="text-gray-600">
          このページは現在開発中です。以下の機能が順次追加される予定です：
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
          <li>インフルエンサー検索・閲覧機能</li>
          <li>オファー管理機能</li>
          <li>メッセージング機能</li>
          <li>案件管理機能</li>
          <li>アカウント設定</li>
        </ul>
      </div>
    </div>
  );
};

export default CompanyDashboardPage;
import React from 'react';
import { Instagram, Youtube, Twitter, Link } from 'lucide-react';
import TikTok from '../icons/TikTok';
import { AlertCircle } from 'lucide-react';

interface SnsInfoStepProps {
  formData: {
    platforms: {
      instagram?: { username: string; followers: number };
      youtube?: { username: string; followers: number };
      tiktok?: { username: string; followers: number };
      twitter?: { username: string; followers: number };
      other?: { username: string; followers: number };
    };
    categories: string[];
    description: string;
  };
  onChange: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const SnsInfoStep: React.FC<SnsInfoStepProps> = ({ formData, onChange, onNext, onBack }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  const updatePlatformData = (platform: string, field: string, value: string | number) => {
    const newPlatforms = {
      ...formData.platforms,
      [platform]: {
        ...formData.platforms[platform as keyof typeof formData.platforms],
        [field]: value
      }
    };
    onChange('platforms', newPlatforms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Instagram */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Instagram className="w-5 h-5" />
          Instagram
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.platforms.instagram?.username || ''}
            onChange={(e) => updatePlatformData('instagram', 'username', e.target.value)}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="number"
            value={formData.platforms.instagram?.followers || ''}
            onChange={(e) => updatePlatformData('instagram', 'followers', parseInt(e.target.value))}
            placeholder="フォロワー数"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* YouTube */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Youtube className="w-5 h-5" />
          YouTube
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.platforms.youtube?.username || ''}
            onChange={(e) => updatePlatformData('youtube', 'username', e.target.value)}
            placeholder="チャンネル名"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="number"
            value={formData.platforms.youtube?.followers || ''}
            onChange={(e) => updatePlatformData('youtube', 'followers', parseInt(e.target.value))}
            placeholder="登録者数"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* TikTok */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <TikTok className="w-5 h-5" />
          TikTok
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.platforms.tiktok?.username || ''}
            onChange={(e) => updatePlatformData('tiktok', 'username', e.target.value)}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="number"
            value={formData.platforms.tiktok?.followers || ''}
            onChange={(e) => updatePlatformData('tiktok', 'followers', parseInt(e.target.value))}
            placeholder="フォロワー数"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* X(旧Twitter) */}
      <div className="space-y-4">
        <h3 className="font-medium flex items-center gap-2">
          <Twitter className="w-5 h-5" />
          X(旧Twitter)
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={formData.platforms.twitter?.username || ''}
            onChange={(e) => updatePlatformData('twitter', 'username', e.target.value)}
            placeholder="@username"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="number"
            value={formData.platforms.twitter?.followers || ''}
            onChange={(e) => updatePlatformData('twitter', 'followers', parseInt(e.target.value))}
            placeholder="フォロワー数"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          戻る
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
        >
          次へ
        </button>
      </div>

      {/* Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="font-medium text-yellow-800">SNSアカウント登録について</div>
          <ul className="mt-2 text-sm text-yellow-700 space-y-1">
            <li>• SNSアカウントの登録は任意です</li>
            <li>• 登録することで、より多くの案件にマッチする可能性が高まります</li>
            <li>• 実際に運用しているアカウントを登録してください</li>
            <li>• フォロワー数は定期的に更新することをお勧めします</li>
            <li>• 虚偽の情報を登録した場合、アカウントが停止される可能性があります</li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default SnsInfoStep;
import type { CompanyCampaign, CampaignApplication } from '../../types/company/campaign';
import type { Platform } from '../../types/platform';
import { PLATFORMS } from '../constants';

const mockApplications: CampaignApplication[] = [
  {
    id: 'app1',
    influencerId: 'inf1',
    influencerName: 'Beauty Creator',
    status: 'accepted',
    appliedAt: '2024-03-15',
    message: '美容商品のレビュー経験が豊富です。',
    profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
    followers: 15000,
    engagement: 3.2
  },
  {
    id: 'app2',
    influencerId: 'inf2',
    influencerName: 'Lifestyle Blogger',
    status: 'pending',
    appliedAt: '2024-03-16',
    message: 'ライフスタイル関連の投稿を得意としています。',
    profileImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100',
    followers: 25000,
    engagement: 2.8
  },
  {
    id: 'app3',
    influencerId: 'inf3',
    influencerName: 'Food Expert',
    status: 'completed',
    appliedAt: '2024-03-17',
    message: 'グルメレポートを専門に活動しています。',
    profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    followers: 35000,
    engagement: 4.1
  }
];

export const generateMockCampaigns = (): CompanyCampaign[] => {
  return [
    {
      id: '1',
      title: '春の新作コスメPRキャンペーン',
      platform: 'Instagram' as Platform,
      status: 'active',
      startDate: '2024-04-01',
      endDate: '2024-04-30',
      budget: '¥50,000',
      applications: [
        { ...mockApplications[0] },
        { ...mockApplications[1] }
      ],
      totalApplications: 2,
      acceptedApplications: 1,
      completedApplications: 0,
      description: '春の新作コスメについて、実際に使用した感想とメイク方法を紹介していただきます。',
      requirements: [
        'フォロワー5,000人以上',
        '化粧品関連の投稿実績がある方',
        '20代～30代の女性',
        '日本在住の方'
      ],
      isPublic: true
    },
    {
      id: '2',
      title: 'フィットネスドリンク新商品PR',
      platform: 'TikTok' as Platform,
      status: 'active',
      startDate: '2024-05-01',
      endDate: '2024-05-31',
      budget: '¥80,000',
      applications: [
        { ...mockApplications[1], id: 'app4' },
        { ...mockApplications[2], id: 'app5' },
        { ...mockApplications[0], id: 'app6' }
      ],
      totalApplications: 3,
      acceptedApplications: 2,
      completedApplications: 1,
      description: 'フィットネスドリンクの新商品について、トレーニング中の使用シーンを含めた動画を制作していただきます。',
      requirements: [
        'フォロワー10,000人以上',
        'フィットネス関連の投稿実績がある方',
        '週3回以上トレーニングをしている方'
      ],
      isPublic: true
    },
    {
      id: '3',
      title: '新作スニーカーのプロモーション',
      platform: 'YouTube' as Platform,
      status: 'draft',
      startDate: '2024-06-01',
      endDate: '2024-06-30',
      budget: '¥120,000',
      applications: [],
      totalApplications: 0,
      acceptedApplications: 0,
      completedApplications: 0,
      description: '新作スニーカーのアンボックス動画とスタイリング提案をお願いします。',
      requirements: [
        'フォロワー20,000人以上',
        'ファッション関連のチャンネル運営者',
        'スニーカーコレクターの方歓迎'
      ],
      isPublic: false
    },
    {
      id: '4',
      title: '夏の新作アパレルコレクション',
      platform: 'Instagram' as Platform,
      status: 'completed',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      budget: '¥70,000',
      applications: [
        { ...mockApplications[0], id: 'app7', status: 'completed' },
        { ...mockApplications[1], id: 'app8', status: 'completed' },
        { ...mockApplications[2], id: 'app9', status: 'completed' }
      ],
      totalApplications: 3,
      acceptedApplications: 3,
      completedApplications: 3,
      description: '夏の新作アパレルを使用したコーディネート投稿をお願いします。',
      requirements: [
        'フォロワー15,000人以上',
        'ファッション関連の投稿実績がある方',
        '20代～30代の方'
      ],
      isPublic: true
    },
    {
      id: '5',
      title: '新商品の料理レシピ動画制作',
      platform: 'YouTube' as Platform,
      status: 'active',
      startDate: '2024-04-15',
      endDate: '2024-05-15',
      budget: '¥100,000',
      applications: [
        { ...mockApplications[2], id: 'app10' },
        { ...mockApplications[1], id: 'app11' }
      ],
      totalApplications: 2,
      acceptedApplications: 1,
      completedApplications: 0,
      description: '新商品を使用したオリジナルレシピの調理動画を制作していただきます。',
      requirements: [
        'フォロワー30,000人以上',
        '料理関連のチャンネル運営者',
        'オリジナルレシピの考案経験がある方'
      ],
      isPublic: true
    }
  ];
};
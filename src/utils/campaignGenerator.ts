import { Campaign } from '../types/campaign';
import { PLATFORMS, COMPANIES, GENRES, CAMPAIGN_IMAGES } from './constants';

export const generateCampaigns = (): Campaign[] => {
  const campaigns: Campaign[] = [];
  
  for (let i = 1; i <= 50; i++) {
    const genre = GENRES[Math.floor(Math.random() * GENRES.length)];
    const imageIndex = Math.floor(Math.random() * CAMPAIGN_IMAGES.length);
    
    campaigns.push({
      id: i,
      company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
      title: `キャンペーン${i}：${genre}関連PR`,
      budget: `¥${(Math.floor(Math.random() * 20) + 3) * 10000} - ¥${(Math.floor(Math.random() * 20) + 10) * 10000}`,
      platform: PLATFORMS[Math.floor(Math.random() * PLATFORMS.length)],
      followers: `${(Math.floor(Math.random() * 10) + 1)}000+`,
      deadline: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      image: CAMPAIGN_IMAGES[imageIndex],
      genre: genre,
      isVip: Math.random() > 0.7,
      requiresDraft: Math.random() > 0.5,
      draftDeadline: `2024-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      isPublic: Math.random() > 0.7 // 30%の確率で外部公開
    });
  }

  return campaigns;
};
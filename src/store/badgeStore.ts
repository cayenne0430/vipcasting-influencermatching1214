import { create } from 'zustand';
import type { Badge } from '../types/badge';

interface BadgeState {
  badges: Badge[];
  addBadge: (badge: Badge) => void;
  removeBadge: (badgeId: string) => void;
}

export const useBadgeStore = create<BadgeState>((set) => ({
  badges: [
    {
      id: 'verified',
      type: 'verification',
      name: '本人確認済',
      description: '身分証明書による本人確認が完了しています',
      icon: 'shield-check',
      color: 'bg-blue-100 text-blue-800',
      acquiredAt: '2024-01-15'
    },
    {
      id: 'top-creator',
      type: 'certification',
      name: 'トップクリエイター',
      description: '高品質なコンテンツを継続的に提供しているクリエイターに付与されます',
      icon: 'award',
      color: 'bg-purple-100 text-purple-800',
      acquiredAt: '2024-02-01'
    }
  ],

  addBadge: (badge) =>
    set((state) => ({
      badges: [...state.badges, badge]
    })),

  removeBadge: (badgeId) =>
    set((state) => ({
      badges: state.badges.filter((badge) => badge.id !== badgeId)
    }))
}));
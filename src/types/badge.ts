export interface Badge {
  id: string;
  type: 'verification' | 'certification';
  name: string;
  description: string;
  icon: string;
  color: string;
  acquiredAt: string;
}

export interface BadgeDisplay {
  badge: Badge;
  showTooltip?: boolean;
  size?: 'sm' | 'md' | 'lg';
}
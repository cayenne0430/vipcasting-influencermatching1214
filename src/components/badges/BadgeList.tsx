import React from 'react';
import type { Badge } from '../../types/badge';
import BadgeIcon from './BadgeIcon';

interface BadgeListProps {
  badges: Badge[];
  size?: 'sm' | 'md' | 'lg';
}

const BadgeList: React.FC<BadgeListProps> = ({ badges, size = 'md' }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <BadgeIcon
          key={badge.id}
          badge={badge}
          size={size}
        />
      ))}
    </div>
  );
};

export default BadgeList;
import React, { useState } from 'react';
import { Shield, ShieldCheck, Info } from 'lucide-react';
import type { Badge } from '../../types/badge';

interface BadgeIconProps {
  badge: Badge;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const BadgeIcon: React.FC<BadgeIconProps> = ({ 
  badge, 
  size = 'md',
  showTooltip = true 
}) => {
  const [showInfo, setShowInfo] = useState(false);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const containerClasses = {
    sm: 'h-5 px-1.5',
    md: 'h-6 px-2',
    lg: 'h-7 px-2.5'
  };

  const getBadgeIcon = () => {
    switch (badge.type) {
      case 'verification':
        return <ShieldCheck className={sizeClasses[size]} />;
      case 'certification':
        return <Shield className={sizeClasses[size]} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative inline-flex items-center group">
      <div
        className={`
          flex items-center gap-1 rounded-full
          ${containerClasses[size]}
          ${badge.color}
        `}
      >
        {getBadgeIcon()}
        <span className={`text-${size === 'sm' ? 'xs' : 'sm'} font-medium`}>
          {badge.name}
        </span>
      </div>

      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
          <div className="bg-gray-900 text-white text-sm rounded-lg py-2 px-3 shadow-lg max-w-xs">
            <div className="font-medium mb-1">{badge.name}</div>
            <div className="text-gray-300 text-xs">{badge.description}</div>
            <div className="text-gray-400 text-xs mt-1">
              取得日: {new Date(badge.acquiredAt).toLocaleDateString()}
            </div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
};

export default BadgeIcon;
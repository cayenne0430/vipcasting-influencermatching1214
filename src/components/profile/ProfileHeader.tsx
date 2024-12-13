import React from 'react';
import { Camera } from 'lucide-react';
import BadgeList from '../badges/BadgeList';
import { useBadgeStore } from '../../store/badgeStore';

interface ProfileHeaderProps {
  name: string;
  image: string;
  isEditing: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onEdit: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  image,
  isEditing,
  onImageChange,
  onSave,
  onEdit
}) => {
  const badges = useBadgeStore((state) => state.badges);

  return (
    <div className="relative h-48 bg-gradient-to-r from-purple-600 to-purple-900">
      <div className="absolute -bottom-16 left-8 flex items-end gap-4">
        <div className="relative">
          <img
            src={image}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-white object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-500 transition">
              <Camera className="w-5 h-5" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onImageChange}
              />
            </label>
          )}
        </div>
        <div className="mb-4">
          <BadgeList badges={badges} size="sm" />
        </div>
      </div>
      <div className="absolute top-4 right-4">
        {isEditing ? (
          <button
            onClick={onSave}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
          >
            保存
          </button>
        ) : (
          <button
            onClick={onEdit}
            className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
          >
            編集
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
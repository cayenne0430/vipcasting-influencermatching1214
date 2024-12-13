import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

const CreateCampaignButton = () => {
  return (
    <Link
      to="/company/post"
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
    >
      <Plus className="w-4 h-4" />
      案件を作成
    </Link>
  );
};

export default CreateCampaignButton;
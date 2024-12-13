import React, { useState } from 'react';
import { Camera, Building2, Mail, Phone, Globe, MapPin, AlertCircle } from 'lucide-react';

interface CompanyProfile {
  name: string;
  industry: string;
  ceoName: string;
  address: {
    postalCode: string;
    prefecture: string;
    city: string;
    street: string;
    building: string;
  };
  phone: string;
  email: string;
  website: string;
  logo: string;
  description: string;
  registrationDocument: string;
  contacts: {
    name: string;
    department: string;
    position: string;
    phone: string;
    email: string;
  }[];
}

const CompanyProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile>({
    name: '株式会社カイエン',
    industry: 'IT・通信',
    ceoName: '佐藤 翔一',
    address: {
      postalCode: '106-6290',
      prefecture: '東京都',
      city: '港区',
      street: '麻布台1-2-1',
      building: '麻布台ヒルズ'
    },
    phone: '03-1234-5678',
    email: 'info@cayenne.co.jp',
    website: 'https://www.cayenne.co.jp',
    logo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
    description: 'インフルエンサーマッチングプラットフォームを運営する企業です。',
    registrationDocument: '',
    contacts: [
      {
        name: '山田 太郎',
        department: '営業部',
        position: '部長',
        phone: '03-1234-5678',
        email: 'yamada@cayenne.co.jp'
      }
    ]
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          logo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // TODO: API call to save profile
    setIsEditing(false);
  };

  const handleAddContact = () => {
    setProfile(prev => ({
      ...prev,
      contacts: [
        ...prev.contacts,
        {
          name: '',
          department: '',
          position: '',
          phone: '',
          email: ''
        }
      ]
    }));
  };

  const handleRemoveContact = (index: number) => {
    setProfile(prev => ({
      ...prev,
      contacts: prev.contacts.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <div className="relative h-48 bg-gradient-to-r from-purple-600 to-purple-900">
            <div className="absolute -bottom-16 left-8">
              <div className="relative">
                <img
                  src={profile.logo}
                  alt="Company Logo"
                  className="w-32 h-32 rounded-lg border-4 border-white object-cover bg-white"
                />
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-500 transition">
                    <Camera className="w-5 h-5" />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="absolute top-4 right-4">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
                >
                  保存
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition"
                >
                  編集
                </button>
              )}
            </div>
          </div>

          {/* Profile Content */}
          <div className="pt-20 px-8 pb-8">
            {/* Basic Information */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-purple-600" />
                基本情報
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会社名
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  ) : (
                    <div className="text-gray-900">{profile.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    業種
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {isEditing ? (
                    <select
                      value={profile.industry}
                      onChange={(e) => setProfile(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    >
                      <option value="IT・通信">IT・通信</option>
                      <option value="小売">小売</option>
                      <option value="製造">製造</option>
                      <option value="サービス">サービス</option>
                      <option value="金融">金融</option>
                    </select>
                  ) : (
                    <div className="text-gray-900">{profile.industry}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    代表者名
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile.ceoName}
                      onChange={(e) => setProfile(prev => ({ ...prev, ceoName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  ) : (
                    <div className="text-gray-900">{profile.ceoName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                  ) : (
                    <div className="text-gray-900">{profile.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        required
                      />
                    </div>
                  ) : (
                    <div className="text-gray-900">{profile.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ウェブサイト
                  </label>
                  {isEditing ? (
                    <div className="relative">
                      <Globe className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-900">{profile.website}</div>
                  )}
                </div>
              </div>
            </section>

            {/* Address */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                所在地
              </h2>
              {isEditing ? (
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      郵便番号
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.address.postalCode}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        address: { ...prev.address, postalCode: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      都道府県
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.address.prefecture}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        address: { ...prev.address, prefecture: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      市区町村
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.address.city}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        address: { ...prev.address, city: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      番地
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.address.street}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        address: { ...prev.address, street: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      建物名・階数
                    </label>
                    <input
                      type="text"
                      value={profile.address.building}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        address: { ...prev.address, building: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              ) : (
                <div className="text-gray-900">
                  〒{profile.address.postalCode}<br />
                  {profile.address.prefecture}{profile.address.city}<br />
                  {profile.address.street}<br />
                  {profile.address.building}
                </div>
              )}
            </section>

            {/* Company Description */}
            <section className="mb-8">
              <h2 className="text-lg font-semibold mb-4">企業概要</h2>
              {isEditing ? (
                <textarea
                  value={profile.description}
                  onChange={(e) => setProfile(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  rows={4}
                />
              ) : (
                <div className="text-gray-900">{profile.description}</div>
              )}
            </section>

            {/* Contact Persons */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">担当者情報</h2>
                {isEditing && (
                  <button
                    onClick={handleAddContact}
                    className="text-purple-600 hover:text-purple-500"
                  >
                    + 担当者を追加
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {profile.contacts.map((contact, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    {isEditing ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            担当者名
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="text"
                            value={contact.name}
                            onChange={(e) => {
                              const newContacts = [...profile.contacts];
                              newContacts[index].name = e.target.value;
                              setProfile(prev => ({ ...prev, contacts: newContacts }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            部署名
                          </label>
                          <input
                            type="text"
                            value={contact.department}
                            onChange={(e) => {
                              const newContacts = [...profile.contacts];
                              newContacts[index].department = e.target.value;
                              setProfile(prev => ({ ...prev, contacts: newContacts }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            役職
                          </label>
                          <input
                            type="text"
                            value={contact.position}
                            onChange={(e) => {
                              const newContacts = [...profile.contacts];
                              newContacts[index].position = e.target.value;
                              setProfile(prev => ({ ...prev, contacts: newContacts }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            電話番号
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="tel"
                            value={contact.phone}
                            onChange={(e) => {
                              const newContacts = [...profile.contacts];
                              newContacts[index].phone = e.target.value;
                              setProfile(prev => ({ ...prev, contacts: newContacts }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            メールアドレス
                            <span className="text-red-500 ml-1">*</span>
                          </label>
                          <input
                            type="email"
                            value={contact.email}
                            onChange={(e) => {
                              const newContacts = [...profile.contacts];
                              newContacts[index].email = e.target.value;
                              setProfile(prev => ({ ...prev, contacts: newContacts }));
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                            required
                          />
                        </div>
                        {profile.contacts.length > 1 && (
                          <div className="md:col-span-2">
                            <button
                              onClick={() => handleRemoveContact(index)}
                              className="text-red-600 hover:text-red-500 text-sm"
                            >
                              この担当者を削除
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-sm text-gray-500">
                          {contact.department} {contact.position}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                          <div>{contact.phone}</div>
                          <div>{contact.email}</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfilePage;
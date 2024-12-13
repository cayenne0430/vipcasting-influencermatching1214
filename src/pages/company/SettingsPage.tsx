import React, { useState } from 'react';
import { Bell, Lock, CreditCard, User, Shield, AlertCircle, Building2, Calendar, CheckCircle } from 'lucide-react';
import NotificationSettings from '../../components/settings/NotificationSettings';
import PrivacySettings from '../../components/settings/PrivacySettings';

interface PaymentMethod {
  type: 'credit_card' | 'bank_transfer';
  details: {
    creditCard?: {
      brand: string;
      last4: string;
      expMonth: number;
      expYear: number;
    };
    bankAccount?: {
      bankName: string;
      branchName: string;
      accountType: string;
      accountNumber: string;
      accountHolder: string;
    };
  };
}

interface BillingInfo {
  companyName: string;
  departmentName: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
  contactName: string;
  email: string;
  phone: string;
}

const CompanySettingsPage = () => {
  const [activeSection, setActiveSection] = useState<'notifications' | 'privacy' | 'payment' | 'security'>('notifications');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // 通知設定の状態
  const [notificationSettings, setNotificationSettings] = useState({
    email: {
      newApplications: true,
      messages: true,
      statusUpdates: true,
      newsletter: false
    },
    push: {
      newApplications: true,
      messages: true,
      statusUpdates: false
    }
  });

  // プライバシー設定の状態
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEarnings: false,
    allowMessages: true
  });

  // 支払い方法の状態
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      type: 'credit_card',
      details: {
        creditCard: {
          brand: 'Visa',
          last4: '4242',
          expMonth: 12,
          expYear: 2025
        }
      }
    },
    {
      type: 'bank_transfer',
      details: {
        bankAccount: {
          bankName: 'みずほ銀行',
          branchName: '渋谷支店',
          accountType: '普通',
          accountNumber: '1234567',
          accountHolder: 'カ）カイエン'
        }
      }
    }
  ]);

  // 請求先情報の状態
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    companyName: '株式会社カイエン',
    departmentName: '経理部',
    postalCode: '106-6290',
    prefecture: '東京都',
    city: '港区',
    address: '麻布台1-2-1',
    building: '麻布台ヒルズ',
    contactName: '山田 太郎',
    email: 'billing@cayenne.co.jp',
    phone: '03-1234-5678'
  });

  // イベントハンドラー
  const handleNotificationChange = (type: 'email' | 'push', setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [setting]: !prev[type][setting as keyof typeof prev[typeof type]]
      }
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveBillingInfo = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">企業用設定</h1>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            設定を保存しました
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveSection('notifications')}
            className={`px-4 py-2 font-medium ${
              activeSection === 'notifications'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            通知設定
          </button>
          <button
            onClick={() => setActiveSection('privacy')}
            className={`px-4 py-2 font-medium ${
              activeSection === 'privacy'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            プライバシー
          </button>
          <button
            onClick={() => setActiveSection('payment')}
            className={`px-4 py-2 font-medium ${
              activeSection === 'payment'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            支払い設定
          </button>
          <button
            onClick={() => setActiveSection('security')}
            className={`px-4 py-2 font-medium ${
              activeSection === 'security'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            セキュリティ
          </button>
        </div>

        {/* Content Sections */}
        {activeSection === 'notifications' && (
          <NotificationSettings 
            settings={notificationSettings}
            onChange={handleNotificationChange}
          />
        )}

        {activeSection === 'privacy' && (
          <PrivacySettings 
            settings={privacySettings}
            onChange={handlePrivacyChange}
          />
        )}

        {activeSection === 'payment' && (
          <div className="space-y-6">
            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">支払い方法</h2>
              <div className="space-y-4">
                {/* Credit Cards */}
                <div className="space-y-4">
                  <h3 className="font-medium">クレジットカード</h3>
                  {paymentMethods
                    .filter(method => method.type === 'credit_card')
                    .map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <CreditCard className="w-8 h-8 text-gray-400" />
                          <div>
                            <div className="font-medium">
                              {method.details.creditCard?.brand} **** {method.details.creditCard?.last4}
                            </div>
                            <div className="text-sm text-gray-500">
                              有効期限: {method.details.creditCard?.expMonth}/{method.details.creditCard?.expYear}
                            </div>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-500">
                          削除
                        </button>
                      </div>
                    ))}
                  <button
                    onClick={() => setShowAddCardModal(true)}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400"
                  >
                    + カードを追加
                  </button>
                </div>

                {/* Bank Accounts */}
                <div className="space-y-4">
                  <h3 className="font-medium">銀行口座</h3>
                  {paymentMethods
                    .filter(method => method.type === 'bank_transfer')
                    .map((method, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <Building2 className="w-8 h-8 text-gray-400" />
                          <div>
                            <div className="font-medium">
                              {method.details.bankAccount?.bankName} {method.details.bankAccount?.branchName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {method.details.bankAccount?.accountType} {method.details.bankAccount?.accountNumber}
                            </div>
                            <div className="text-sm text-gray-500">
                              {method.details.bankAccount?.accountHolder}
                            </div>
                          </div>
                        </div>
                        <button className="text-red-600 hover:text-red-500">
                          削除
                        </button>
                      </div>
                    ))}
                  <button
                    onClick={() => setShowAddBankModal(true)}
                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400"
                  >
                    + 銀行口座を追加
                  </button>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">請求先情報</h2>
              <form onSubmit={(e) => { e.preventDefault(); handleSaveBillingInfo(); }} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Billing form fields */}
                  {/* ... (既存の請求先情報フォームフィールド) ... */}
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>

            {/* Payment Schedule */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">支払いスケジュール</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>毎月末締め翌月15日払い</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'security' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">セキュリティ設定</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">2段階認証</h3>
                <p className="text-gray-600 mb-4">
                  アカウントのセキュリティを強化するため、2段階認証の設定をお勧めします。
                </p>
                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500">
                  2段階認証を設定
                </button>
              </div>
              <div>
                <h3 className="font-medium mb-2">パスワード変更</h3>
                <p className="text-gray-600 mb-4">
                  定期的なパスワードの変更をお勧めします。
                </p>
                <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
                  パスワードを変更
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-blue-800">セキュリティ保護について</div>
            <div className="text-sm text-blue-700">
              支払い情報は暗号化されて安全に保管されます。
              クレジットカード情報は、PCI DSSに準拠した決済代行会社で管理されます。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanySettingsPage;
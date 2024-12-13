import React, { useState } from 'react';
import { CreditCard, Building2, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

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

const PaymentSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<'payment_methods' | 'billing_info' | 'payment_history'>('payment_methods');
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [showAddBankModal, setShowAddBankModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

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

  const handleSaveBillingInfo = () => {
    // TODO: API call to save billing info
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">支払い設定</h1>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-800">
            <CheckCircle className="w-5 h-5" />
            設定を保存しました
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b mb-6">
          <button
            onClick={() => setActiveTab('payment_methods')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'payment_methods'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            支払い方法
          </button>
          <button
            onClick={() => setActiveTab('billing_info')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'billing_info'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            請求先情報
          </button>
          <button
            onClick={() => setActiveTab('payment_history')}
            className={`px-4 py-2 font-medium ${
              activeTab === 'payment_history'
                ? 'text-purple-600 border-b-2 border-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            支払い履歴
          </button>
        </div>

        {/* Payment Methods */}
        {activeTab === 'payment_methods' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">クレジットカード</h2>
              <div className="space-y-4">
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
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">銀行口座</h2>
              <div className="space-y-4">
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

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">支払いスケジュール</h2>
              <div className="flex items-center gap-4 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>毎月末締め翌月15日払い</span>
              </div>
            </div>
          </div>
        )}

        {/* Billing Information */}
        {activeTab === 'billing_info' && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-6">請求先情報</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveBillingInfo(); }} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    会社名
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingInfo.companyName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, companyName: e.target.value })}
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
                    value={billingInfo.departmentName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, departmentName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    郵便番号
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingInfo.postalCode}
                    onChange={(e) => setBillingInfo({ ...billingInfo, postalCode: e.target.value })}
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
                    value={billingInfo.prefecture}
                    onChange={(e) => setBillingInfo({ ...billingInfo, prefecture: e.target.value })}
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
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
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
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
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
                    value={billingInfo.building}
                    onChange={(e) => setBillingInfo({ ...billingInfo, building: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    担当者名
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={billingInfo.contactName}
                    onChange={(e) => setBillingInfo({ ...billingInfo, contactName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => setBillingInfo({ ...billingInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
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
        )}

        {/* Payment History */}
        {activeTab === 'payment_history' && (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-semibold">支払い履歴</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">内容</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">金額</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ステータス</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2024-03-15</td>
                    <td className="px-6 py-4">2月分利用料金</td>
                    <td className="px-6 py-4">¥50,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        支払い済み
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">2024-02-15</td>
                    <td className="px-6 py-4">1月分利用料金</td>
                    <td className="px-6 py-4">¥45,000</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        支払い済み
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
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

export default PaymentSettingsPage;
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const CompanyRegistrationGuidePage = () => {
  const steps = [
    {
      title: '基本情報の入力',
      description: '会社名、担当者名など基本的な情報を入力します。',
      time: '約2分'
    },
    {
      title: '企業情報の入力',
      description: '事業内容、資本金、従業員数などの企業情報を入力します。',
      time: '約3分'
    },
    {
      title: '支払い情報の設定',
      description: '請求先情報、支払い方法を設定します。',
      time: '約2分'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">企業アカウント登録方法</h1>
        
        {/* Overview */}
        <div className="bg-purple-50 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">3ステップで簡単登録</h2>
          <div className="flex items-center gap-4 text-purple-600">
            <Clock className="w-5 h-5" />
            <span>所要時間：約7分</span>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-purple-600 font-semibold">{index + 1}</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-3">{step.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {step.time}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">登録後のメリット</h2>
          <ul className="space-y-4">
            {[
              'VIPインフルエンサーへの直接アプローチが可能',
              '専任のアカウントマネージャーによるサポート',
              '効果測定レポートの提供',
              '柔軟な予算設定と支払い管理'
            ].map((benefit, index) => (
              <li key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/company/register"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
          >
            企業アカウントを作成する
          </Link>
        </div>

        {/* Notes */}
        <div className="mt-8 bg-yellow-50 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800 mb-2">登録時の注意事項</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• 登録には法人であることの確認書類が必要です</li>
                <li>• 事業内容や商品によってはご利用いただけない場合があります</li>
                <li>• 登録情報に虚偽があった場合、アカウントが停止される可能性があります</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyRegistrationGuidePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Users, TrendingUp } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const HomePage = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 text-white pt-32 pb-20 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-purple-300 rounded-full animate-float"></div>
            <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-pink-300 rounded-full animate-float animation-delay-2000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-yellow-300 rounded-full animate-float animation-delay-4000"></div>
          </div>

          {/* Shine Effects */}
          <div className="absolute inset-0 animate-shine opacity-20"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative inline-block">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-6 animate-pulse-slow" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight relative">
              選ばれしトップインフルエンサーへ、<br />最高の舞台を。
            </h1>
            <p className="text-xl mb-8 text-purple-100">
              一流企業との出会いがあなたのキャリアを加速させます。<br />
              VIPキャスティングで、さらなる高みへ。
            </p>
            <div className="flex justify-center gap-4">
              {!isAuthenticated && (
                <Link
                  to="/register"
                  className="inline-flex items-center bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  会員登録はこちら(審査制)
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              )}
              <Link
                to="/campaigns"
                className="inline-flex items-center bg-purple-600 border border-purple-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                限定案件を見る
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the component remains exactly the same */}
      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">1,000+</div>
              <div className="text-gray-600">選ばれしインフルエンサー</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">一流企業との取引実績</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">200万円</div>
              <div className="text-gray-600">最高月間報酬実績</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-gray-600">インフルエンサー満足度</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">トップインフルエンサーだけの特権</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            VIPキャスティングは、あなたの価値を最大限に引き出すための特別なプラットフォームです。
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">限定案件のみ取扱</h3>
              <p className="text-gray-600">
                一般公募では出会えない、厳選された高単価案件のみを取り扱い。
                あなたの影響力に見合った、価値ある案件をご紹介します。
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">専属マネージャー</h3>
              <p className="text-gray-600">
                経験豊富な専属マネージャーが、案件の選定から契約まで徹底サポート。
                あなたは創作活動に集中できます。
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">キャリア成長</h3>
              <p className="text-gray-600">
                一流企業との取引実績があなたのポートフォリオを強化。
                ステップアップのチャンスを逃しません。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Only show when not authenticated */}
      {!isAuthenticated && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">あなたも選ばれし1000人へ</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              審査制登録で、特別な案件があなたを待っています。<br />
              まずは案件をチェックしてみませんか？
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-500 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                会員登録はこちら(審査制)
              </Link>
              <Link
                to="/campaigns"
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                限定案件を見る
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default HomePage;
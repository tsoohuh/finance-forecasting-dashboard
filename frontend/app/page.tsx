import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <nav className="flex justify-between items-center mb-20">
          <div className="text-white text-2xl font-bold">FinInsights</div>
          <Link 
            href="/dashboard"
            className="px-6 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all border border-white/20"
          >
            Launch Dashboard
          </Link>
        </nav>

        {/* Hero Section */}
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Financial Forecasting
            <span className="block bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
            Analyze your transaction history and predict future financial trends 
            with machine learning-powered insights.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Get Started →
            </Link>
            <button 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-all text-lg font-semibold border border-white/20"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-24 max-w-6xl mx-auto">
          <FeatureCard 
            icon="📊"
            title="Transaction Analytics"
            description="Visualize spending patterns with intuitive charts and tables"
          />
          <FeatureCard 
            icon="🤖"
            title="AI Predictions"
            description="Machine learning models forecast your financial future"
          />
          <FeatureCard 
            icon="⚡"
            title="Real-time Insights"
            description="Get instant forecasts based on your transaction history"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto text-center text-white">
          <div>
            <div className="text-4xl font-bold mb-2">24/7</div>
            <div className="text-blue-200">Available</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">6 Months</div>
            <div className="text-blue-200">Forecast Range</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">ML Powered</div>
            <div className="text-blue-200">Predictions</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-blue-100">{description}</p>
    </div>
  );
}
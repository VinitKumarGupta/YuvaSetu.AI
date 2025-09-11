import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6">
            <Search className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-xl text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg w-full justify-center"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/saved"
              className="bg-white text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all font-semibold"
            >
              Saved Internships
            </Link>
            <Link
              to="/learn"
              className="bg-white text-gray-700 px-6 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all font-semibold"
            >
              Learning Resources
            </Link>
          </div>
        </div>

        {/* Fun fact */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm">
          <p className="text-sm text-gray-500">
            🤖 <strong>Did you know?</strong> YuvaSetu.AI has helped over 50,000 students find the perfect internships!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
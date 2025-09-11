import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Lock } from 'lucide-react';
import { useI18n } from '../i18n/i18n';
import { sendOTP, verifyOTP, setUser } from '../lib/auth';

const Login: React.FC = () => {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Enter phone/email, 2: Enter OTP
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isEmail = phoneOrEmail.includes('@');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneOrEmail.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await sendOTP(phoneOrEmail);
      if (result.success) {
        setStep(2);
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setLoading(true);
    setError('');

    try {
      const result = await verifyOTP(phoneOrEmail, otp);
      if (result.success && result.user) {
        setUser(result.user);
        navigate('/');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('auth.login.title')}
            </h2>
            <p className="mt-2 text-gray-600">
              {t('auth.login.subtitle')}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.phone')} / {t('auth.email')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isEmail ? (
                      <Mail className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Phone className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type={isEmail ? 'email' : 'tel'}
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                    placeholder={isEmail ? "your@email.com" : "+91 98765 43210"}
                    required
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  We'll send you a 4-digit verification code
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !phoneOrEmail.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : t('auth.send')}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('auth.otp')}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  className="block w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg text-center tracking-widest"
                  placeholder="1234"
                  maxLength={4}
                  required
                />
                <p className="mt-2 text-sm text-gray-500">
                  Code sent to {phoneOrEmail}
                </p>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-2 text-blue-600 hover:text-blue-700 text-sm underline"
                >
                  Change {isEmail ? 'email' : 'phone number'}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 4}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : t('auth.verify')}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {t('auth.switch.signup')}{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Hint */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Mode:</strong> Use any 4-digit code to login (e.g., 1234)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
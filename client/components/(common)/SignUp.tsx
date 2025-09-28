"use client";

import { useState, useEffect } from 'react';
import { CircleCheck as CheckCircle, Shield, Wallet, ArrowRight, ArrowLeft, CircleAlert as AlertCircle } from 'lucide-react';

interface FormData {
  aadhaarNumber: string;
  walletAddress: string;
}

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    aadhaarNumber: '',
    walletAddress: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isAadhaarVerified, setIsAadhaarVerified] = useState(false);
  const [isBlockchainConnected, setIsBlockchainConnected] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const validateAadhaar = (aadhaarNumber: string): boolean => {
    const aadhaarRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
    return aadhaarRegex.test(aadhaarNumber.replace(/\s/g, ''));
  };

  const formatAadhaar = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    const truncated = numbers.substring(0, 12);
    return truncated.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3').trim();
  };

  const handleAadhaarSubmit = async () => {
    setErrors({});
    
    if (!formData.aadhaarNumber) {
      setErrors({ aadhaar: 'Aadhaar number is required' });
      return;
    }

    if (!validateAadhaar(formData.aadhaarNumber)) {
      setErrors({ aadhaar: 'Please enter a valid 12-digit Aadhaar number' });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for Aadhaar verification
    setTimeout(() => {
      setIsAadhaarVerified(true);
      setIsLoading(false);
      setCurrentStep(2);
    }, 2000);
  };

  const handleBlockchainAuth = async () => {
    setIsLoading(true);
    
    // Simulate blockchain connection
    setTimeout(() => {
      setIsBlockchainConnected(true);
      setFormData(prev => ({ ...prev, walletAddress: '0x742d35CC6532C4C3C6c...8A7b' }));
      setIsLoading(false);
      setCurrentStep(3);
    }, 3000);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
  return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Identity Verification</h2>
              <p className="text-gray-600">Enter your Aadhaar number for identity verification</p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="aadhaar" className="text-sm font-medium text-gray-700">
                  Aadhaar Number
                </label>
              <input
                  id="aadhaar"
                type="text"
                  placeholder="1234 5678 9012"
                  value={formData.aadhaarNumber}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange('aadhaarNumber', formatAadhaar(e.target.value))}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1 ${errors.aadhaar ? 'border-red-500' : ''}`}
                  maxLength={14}
                  suppressHydrationWarning
                />
                {errors.aadhaar && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.aadhaar}
                  </p>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <Shield className="h-4 w-4 text-blue-600 mt-0.5 mr-3" />
                  <div className="text-sm text-blue-800">
                    Your Aadhaar information is encrypted and secure. We comply with all data protection regulations.
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={handleAadhaarSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              suppressHydrationWarning
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  Verify Identity
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              )}
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              {isAadhaarVerified && (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900">Blockchain Authentication</h2>
              <p className="text-gray-600">Connect your wallet for secure blockchain authentication</p>
            </div>

            {isAadhaarVerified && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-3" />
                  <div className="text-sm text-green-800">
                    ✅ Aadhaar verification successful! Proceeding to blockchain authentication.
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
                <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Connect Wallet</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect your Web3 wallet to enable blockchain-based authentication
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="w-6 h-6 bg-orange-500 rounded mr-3"></div>
                    MetaMask
                  </button>
                  <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="w-6 h-6 bg-blue-600 rounded mr-3"></div>
                    WalletConnect
                  </button>
                  <button className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    <div className="w-6 h-6 bg-purple-600 rounded mr-3"></div>
                    Coinbase Wallet
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="flex-1 flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              <button 
                onClick={handleBlockchainAuth}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Connect Wallet
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                )}
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Registration Complete!</h2>
              <p className="text-gray-600">Your account has been successfully created</p>
            </div>

            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-3" />
                  <div className="text-sm text-green-800">
                    🎉 Welcome! Your identity is verified and wallet is connected.
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Identity Status:</span>
                  <span className="text-sm font-medium text-green-600">✅ Verified</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Wallet Status:</span>
                  <span className="text-sm font-medium text-green-600">✅ Connected</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-sm text-gray-600">Wallet Address:</span>
                  <span className="text-sm font-mono text-gray-800 bg-white px-2 py-1 rounded">
                    {formData.walletAddress}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium" 
              onClick={() => window.location.href = '/'}
            >
              Continue to Dashboard
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">Secure registration with blockchain technology</p>
          </div>
          <div className="bg-white shadow-xl rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Secure registration with blockchain technology</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg">
          <div className="text-center pb-6 pt-6 px-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentStep === 1 && 'Identity Verification'}
              {currentStep === 2 && 'Blockchain Authentication'}
              {currentStep === 3 && 'Registration Complete'}
            </h3>
            <p className="text-gray-600 mt-2">
              {currentStep === 1 && 'Verify your identity with Aadhaar'}
              {currentStep === 2 && 'Connect your Web3 wallet'}
              {currentStep === 3 && 'You\'re all set to get started'}
            </p>
          </div>
          <div className="px-6 pb-6">
            {renderStep()}
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            Already have an account?{' '}
            <a href="signin" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
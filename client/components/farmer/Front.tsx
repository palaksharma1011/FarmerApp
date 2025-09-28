"use client";
import React, { useState } from 'react';
import { Mic, Shield, IndianRupee, Users, Camera, Phone, MapPin, TrendingUp, CheckCircle, ArrowRight, Menu, X, Star, Clock, Globe, LogIn, UserPlus } from 'lucide-react';
import Link from "next/link";


const FarmerLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [authData, setAuthData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const features = [
    {
      icon: Mic,
      title: 'आवाज़ से बेचें',
      subtitle: 'Voice Selling',
      description: 'बस बोलकर अपना सामान बेचें। लिखने की जरूरत नहीं। AI आपकी मदद करेगा।',
      englishDesc: 'Just speak to sell your products. No typing needed. AI will help you.',
      route: '/sell-product'
    },
    {
      icon: IndianRupee,
      title: 'सीधे पैसा',
      subtitle: 'Direct Payment',
      description: 'बिचौलिया नहीं। सीधे खरीदार से पैसा। ब्लॉकचेन से सुरक्षित।',
      englishDesc: 'No middleman. Direct payment from buyer. Secure with blockchain.',
      route: '/payments'
    },
    {
      icon: Shield,
      title: 'पूरी सुरक्षा',
      subtitle: 'Complete Security',
      description: 'आपका डेटा और पैसा दोनों सुरक्षित। धोखाधड़ी का डर नहीं।',
      englishDesc: 'Your data and money both secure. No fear of fraud.',
      route: '/security'
    },
    {
      icon: Users,
      title: 'बड़ा बाज़ार',
      subtitle: 'Large Market',
      description: 'हजारों खरीदार। पूरे देश में अपना सामान बेचें।',
      englishDesc: 'Thousands of buyers. Sell across the country.',
      route: '/marketplace'
    },
    {
      icon: Camera,
      title: 'फोटो अपलोड',
      subtitle: 'Photo Upload',
      description: 'अपने सामान की फोटो खींचें। खरीदार को दिखाएं।',
      englishDesc: 'Take photos of your products. Show to buyers.',
      route: '/photo-upload'
    },
    {
      icon: TrendingUp,
      title: 'बेहतर दाम',
      subtitle: 'Better Prices',
      description: 'मंडी से ज्यादा दाम मिलता है। सीधा खरीदार से जुड़ें।',
      englishDesc: 'Get better prices than mandi. Connect directly with buyers.',
      route: '/pricing'
    }
  ];

  const testimonials = [
    {
      name: 'राजेश कुमार',
      location: 'पंजाब',
      image: '👨‍🌾',
      rating: 5,
      text: 'बहुत आसान है। बोलकर ही सामान बेच दिया। मंडी से 20% ज्यादा दाम मिला।',
      englishText: 'Very easy. Sold products just by speaking. Got 20% more than mandi price.'
    },
    {
      name: 'सुरेश पटेल',
      location: 'गुजरात', 
      image: '🧑‍🌾',
      rating: 5,
      text: 'पहले बिचौलिया ज्यादा पैसा लेता था। अब सीधा खरीदार से मिलता हूँ।',
      englishText: 'Earlier middleman took too much money. Now I connect directly with buyers.'
    },
    {
      name: 'अमित सिंह',
      location: 'उत्तर प्रदेश',
      image: '👨‍🌾',
      rating: 5,
      text: 'AI बहुत अच्छी है। हिंदी समझती है। मेरी सारी जानकारी सही लिख देती है।',
      englishText: 'AI is very good. Understands Hindi. Records all my information correctly.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'रजिस्टर करें',
      subtitle: 'Register',
      description: 'अपना नाम और फोन नंबर दें'
    },
    {
      step: '2', 
      title: 'सामान बताएं',
      subtitle: 'Tell About Product',
      description: 'AI से बात करके अपना सामान बताएं'
    },
    {
      step: '3',
      title: 'फोटो लें',
      subtitle: 'Take Photos',
      description: 'अपने सामान की फोटो खींचें'
    },
    {
      step: '4',
      title: 'बेचें',
      subtitle: 'Sell',
      description: 'खरीदार मिलने का इंतजार करें'
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: 'कोई रजिस्ट्रेशन फीस नहीं', english: 'No registration fee' },
    { icon: CheckCircle, text: 'मुफ्त में AI सहायता', english: 'Free AI assistance' },
    { icon: CheckCircle, text: '24/7 कस्टमर सपोर्ट', english: '24/7 customer support' },
    { icon: CheckCircle, text: 'सुरक्षित पेमेंट', english: 'Secure payment' },
    { icon: CheckCircle, text: 'पूरे भारत में पहुंच', english: 'Pan India reach' },
    { icon: CheckCircle, text: 'बिना कमीशन', english: 'No commission' }
  ];

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      if (authData.password !== authData.confirmPassword) {
        alert('पासवर्ड मैच नहीं कर रहे / Passwords do not match');
        return;
      }
      console.log('Sign Up:', authData);
      alert('सफलतापूर्वक रजिस्टर हुए / Successfully registered!');
    } else {
      console.log('Sign In:', { phone: authData.phone, password: authData.password });
      alert('सफलतापूर्वक लॉगिन हुए / Successfully logged in!');
    }
    setShowAuthModal(false);
    setAuthData({ name: '', phone: '', password: '', confirmPassword: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthData({
      ...authData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">farmबाज़ार</h1>
                <p className="text-sm text-gray-600">farmबाज़ार</p>
              </div>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-700 hover:text-green-600 font-medium">How it Works</a>
              <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium">Success Stories</a>
              <a href="#support" className="text-gray-700 hover:text-green-600 font-medium">Support</a>
              
              {/* Auth Buttons */}
              <div className="flex items-center gap-3">
                <Link href="/farmer/signin" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link href="/farmer/signup" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-green-600 font-medium">Features</a>
                <a href="#how-it-works" className="text-gray-700 hover:text-green-600 font-medium">How it Works</a>
                <a href="#testimonials" className="text-gray-700 hover:text-green-600 font-medium">Success Stories</a>
                <a href="#support" className="text-gray-700 hover:text-green-600 font-medium">Support</a>
                
                {/* Mobile Auth Buttons */}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <Link
                    href="/farmer/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-medium px-4 py-2 rounded-lg hover:bg-green-50 transition-colors w-fit"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/farmer/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors w-fit"
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            बोलकर बेचें
            <br />
            <span className="text-green-600">ज्यादा कमाएं</span>
          </h2>
          <p className="text-2xl text-gray-600 mb-4">
            Speak to Sell • Earn More
          </p>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            भारत का पहला आवाज़ आधारित farmबाज़ार। AI की मदद से अपना सामान बेचें।
            <br />
            India&apos;s first voice-based farmबाज़ार. Sell your products with AI assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href='/farmer/selling'>
            <button className="bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-xl hover:bg-green-600 transition-all duration-200 hover:scale-105">
              अभी शुरू करें • Start Now
            </button>
            </Link>
            <button className="bg-white text-gray-700 text-xl font-semibold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 border-2 border-gray-200">
              Demo देखें • Watch Demo
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">12,000+</div>
              <div className="text-gray-600">किसान • Farmers</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">45,000+</div>
              <div className="text-gray-600">उत्पाद • Products</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">₹14 करोड़</div>
              <div className="text-gray-600">कुल बिक्री • Total Sales</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              आपके लिए खास फीचर्स
            </h3>
            <p className="text-xl text-gray-600">
              Special Features for You
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                  <feature.icon className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-lg text-gray-500 mb-4">{feature.subtitle}</p>
                <p className="text-gray-700 mb-3">{feature.description}</p>
                <p className="text-sm text-gray-500 mb-4">{feature.englishDesc}</p>
                <div className="flex items-center text-green-600 font-semibold group-hover:text-green-700">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              कैसे काम करता है?
            </h3>
            <p className="text-xl text-gray-600">
              How Does It Work?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                <p className="text-gray-600 mb-2">{step.subtitle}</p>
                <p className="text-gray-700">{step.description}</p>
                {index < steps.length - 1 && (
                  <ArrowRight className="w-8 h-8 text-gray-400 mx-auto mt-6 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              आपको क्या मिलेगा?
            </h3>
            <p className="text-xl text-gray-600">
              What Will You Get?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 bg-green-50 rounded-2xl p-6">
                <benefit.icon className="w-8 h-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-800">{benefit.text}</p>
                  <p className="text-sm text-gray-600">{benefit.english}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              किसान भाइयों के अनुभव
            </h3>
            <p className="text-xl text-gray-600">
              Farmer Success Stories
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].image}</div>
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-2xl text-gray-700 mb-6 italic">
                &ldquo;{testimonials[currentTestimonial].text}&rdquo;
              </blockquote>
              <p className="text-lg text-gray-600 mb-6">
                &ldquo;{testimonials[currentTestimonial].englishText}&rdquo;
              </p>
              <div>
                <p className="text-xl font-bold text-gray-800">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-500 to-blue-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">
            आज ही शुरू करें!
          </h3>
          <p className="text-2xl mb-4">Start Today!</p>
          <p className="text-xl mb-12 opacity-90">
            हजारों किसान भाई पहले से ही कमा रहे हैं। आप भी जुड़िए।
            <br />
            Thousands of farmers are already earning. Join them today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white text-green-600 text-xl font-bold py-4 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105">
              मुफ्त में शुरू करें • Start Free
            </button>
            <button className="bg-transparent border-2 border-white text-white text-xl font-semibold py-4 px-8 rounded-2xl hover:bg-white hover:text-green-600 transition-all duration-200">
              मदद चाहिए? • Need Help?
            </button>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-800 mb-4">
              हमसे जुड़ें
            </h3>
            <p className="text-xl text-gray-600">
              Connect With Us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center bg-blue-50 rounded-2xl p-8">
              <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">फोन सपोर्ट</h4>
              <p className="text-gray-600 mb-4">Phone Support</p>
              <p className="text-2xl font-bold text-blue-600">1800-XXX-XXXX</p>
              <p className="text-sm text-gray-500">24/7 Available</p>
            </div>

            <div className="text-center bg-green-50 rounded-2xl p-8">
              <Globe className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">ऑनलाइन हेल्प</h4>
              <p className="text-gray-600 mb-4">Online Help</p>
              <p className="text-lg font-semibold text-green-600">help.farmबाज़ार.com</p>
              <p className="text-sm text-gray-500">Video Tutorials</p>
            </div>

            <div className="text-center bg-purple-50 rounded-2xl p-8">
              <Clock className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">ट्रेनिंग</h4>
              <p className="text-gray-600 mb-4">Training</p>
              <p className="text-lg font-semibold text-purple-600">Free Classes</p>
              <p className="text-sm text-gray-500">Learn to Use</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🌾</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold">farmबाज़ार</h4>
                  <p className="text-sm text-gray-400">farmबाज़ार</p>
                </div>
              </div>
              <p className="text-gray-400">
                भारत का पहला आवाज़ आधारित farmबाज़ार
              </p>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/sell" className="hover:text-white">Sell Product</a></li>
                <li><a href="/marketplace" className="hover:text-white">Marketplace</a></li>
                <li><a href="/payments" className="hover:text-white">Payments</a></li>
                <li><a href="/security" className="hover:text-white">Security</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white">Help Center</a></li>
                <li><a href="/training" className="hover:text-white">Training</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-lg font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/blockchain" className="hover:text-white">Blockchain Info</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 farmबाज़ार. Made with ❤️ for Indian Farmers.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {isSignUp ? 'रजिस्टर करें / Sign Up' : 'लॉगिन करें / Sign In'}
              </h2>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthData({ name: '', phone: '', password: '', confirmPassword: '' });
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    नाम / Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={authData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="अपना नाम दर्ज करें / Enter your name"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  मोबाइल नंबर / Mobile Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={authData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="9876543210"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  पासवर्ड / Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={authData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="पासवर्ड दर्ज करें / Enter password"
                />
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड दोबारा / Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={authData.confirmPassword}
                    onChange={handleInputChange}
                    required={isSignUp}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="पासवर्ड दोबारा दर्ज करें / Confirm password"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                {isSignUp ? 'रजिस्टर करें / Sign Up' : 'लॉगिन करें / Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isSignUp ? 'पहले से अकाउंट है? / Already have an account?' : 'नया अकाउंट बनाएं? / Need a new account?'}
              </p>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setAuthData({ name: '', phone: '', password: '', confirmPassword: '' });
                }}
                className="text-green-600 hover:text-green-700 font-semibold mt-2"
              >
                {isSignUp ? 'लॉगिन करें / Sign In' : 'रजिस्टर करें / Sign Up'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerLandingPage;
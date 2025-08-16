import React from 'react';
import { Heart, Target, ArrowRight, Star, Users, Shield } from 'lucide-react';

const LandingPage = ({ onNavigateToApp }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-8 w-8 text-indigo-600" />
            <span className="text-2xl font-bold text-indigo-800">IntentionalDating</span>
          </div>
          {/* <nav className="hidden md:flex gap-6 text-indigo-700">
            <button className="hover:text-indigo-900 transition-colors">Features</button>
            <button className="hover:text-indigo-900 transition-colors">How It Works</button>
            <button className="hover:text-indigo-900 transition-colors">Contact</button>
          </nav> */}
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative">
        {/* Floating elements for visual interest */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 lg:py-24">
          {/* Main Heading */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-gray-800 leading-tight mb-8">
              Find Your
              <span className="block bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Perfect Match
              </span>
            </h1>
            {/* <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Use science-backed compatibility scoring to discover meaningful connections. 
              Rate traits that matter most to you and find your ideal partner.
            </p> */}
          </div>

          {/* Main Action Cards */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto mb-20 md:mb-32">
            {/* Create Ideal Partner Card */}
            <div 
              onClick={() => onNavigateToApp('ideal')}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-blue-200/50 hover:bg-white hover:border-blue-300/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Create Your Ideal Partner</h2>
                {/* <p className="text-gray-600 mb-6 leading-relaxed">
                  Define the qualities you value most in a partner. Set your preferences and discover what matters to you in a relationship.
                </p> */}
                
                {/* Enhanced CTA Button */}
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg group-hover:shadow-xl group-hover:from-blue-600 group-hover:to-indigo-600 transition-all duration-300 text-center">
                  <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                    <span className="text-lg">Get Started</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Rate Your Crush Card */}
            <div 
              onClick={() => onNavigateToApp('crush')}
              className="group cursor-pointer transform hover:scale-105 transition-all duration-300 active:scale-95"
            >
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-emerald-200/50 hover:bg-white hover:border-emerald-300/60 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Rate Your Crush</h2>
                {/* <p className="text-gray-600 mb-6 leading-relaxed">
                  Already have someone in mind? Rate their qualities against your preferences and see your compatibility score.
                </p> */}
                
                {/* Enhanced CTA Button */}
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg group-hover:shadow-xl group-hover:from-emerald-600 group-hover:to-cyan-600 transition-all duration-300 text-center">
                  <div className="flex items-center justify-center gap-3 group-hover:gap-4 transition-all duration-300">
                    <span className="text-lg">Rate Now</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>



          {/* CTA Section */}
          <div className="text-center px-4">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
              Ready to live intentionally?
            </h2>
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start your journey to meaningful dating today. It's takes just minutes, highly customizable, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button 
                onClick={() => onNavigateToApp('ideal')}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Create Ideal Partner
              </button> */}
              {/* <button 
                onClick={() => onNavigateToApp('crush')}
                className="px-8 py-4 bg-white/60 text-gray-800 font-semibold rounded-xl border border-gray-300/50 hover:bg-white/80 hover:border-gray-400/60 transform hover:scale-105 transition-all duration-300 backdrop-blur-lg shadow-lg"
              >
                Rate Your Crush
              </button> */}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="relative z-10 bg-white/40 backdrop-blur-lg mt-16 md:mt-24 border-t border-gray-200/50">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center">
            <div className="mb-8 md:mb-12">
              <div className="flex items-center justify-center gap-2 mb-6">
                <Heart className="h-8 w-8 text-indigo-600" />
                <span className="text-2xl font-bold text-gray-800">IntentionalDating</span>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                Helping people make informed decisions about relationships through fool-proof assessments.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-12 mb-8 md:mb-12">
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:dkworldink@gmail.com" className="text-gray-600 hover:text-gray-800 transition-colors text-base md:text-lg">
                  dkworldink@gmail.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <svg className="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+1234567890" className="text-gray-600 hover:text-gray-800 transition-colors text-base md:text-lg">
                  +1 (234) 567-intentional-dating
                </a>
              </div>
            </div>
            
            <div className="text-gray-500 border-t border-gray-200/50 pt-6 md:pt-8">
              <p>&copy; 2025 intentional-dating.com All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
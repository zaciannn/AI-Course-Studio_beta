import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white text-gray-900 py-20 px-6 lg:py-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
          AI Course Studio: <br />
          <span className="text-gray-900">Save your time for learning</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
Our mission is to eliminate the inefficiency of manual resource gathering by providing students and educators with instantly generated, structured learning paths. By curating scattered online content into cohesive curricula, we empower users to bypass the search struggle and focus entirely on academic mastery.        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            type="button"
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            <a href='/login'>Get Started Free</a>
            
          </button>
          <button 
            type="button"
            className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-all"
          >
            Learn More
          </button>
        </div>


      </div>
    </section>
  );
};

export default Hero;
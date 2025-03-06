'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiPlay } from 'react-icons/fi';
import { useState } from 'react';

const HeroSection = () => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-white to-green-50 dark:from-slate-900 dark:to-emerald-900/30" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col order-2 md:order-1"
          >
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-emerald-600 font-semibold text-lg mb-2"
            >
              ייצור לידים איכותיים ואותנטיים מפייסבוק
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight"
            >
              מצא <span className="gradient-text">לידים אורגניים</span> מפייסבוק עם <span className="gradient-text">BuzzCraft</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg"
            >
              BuzzCraft מייצרת לידים איכותיים מפייסבוק באופן אוטומטי, אותנטי ורציף - בעלות נמוכה משמעותית מפרסום ממומן. הטכנולוגיה שלנו יוצרת פוסטים אותנטיים ומפיצה אותם בקבוצות פייסבוק רלוונטיות, בדיוק כמו שאדם אמיתי היה עושה.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/signup" className="px-6 py-3 rounded-md bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-medium text-center shadow-lg shadow-emerald-600/20">
                התחל ניסיון בחינם
              </Link>
              <button 
                onClick={() => setShowVideo(true)}
                className="px-6 py-3 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white font-medium text-center flex items-center justify-center gap-2"
              >
                <FiPlay className="h-4 w-4" />
                צפה באיך זה עובד
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-8 flex items-center"
            >
              <div className="flex -space-x-2 flex-row-reverse">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-900 flex items-center justify-center text-xs font-medium" style={{ zIndex: 4 - i }}>
                    {["אב", "יכ", "מת", "פל"][i]}
                  </div>
                ))}
              </div>
              <div className="mr-4 text-sm text-gray-600 dark:text-gray-400">
                <span className="font-bold text-gray-900 dark:text-white">+500</span> עסקים בישראל כבר סומכים על BuzzCraft
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-blue-100/50 dark:from-emerald-900/20 dark:to-blue-900/20"></div>
              <div className="grid grid-cols-2 h-full">
                <div className="relative border-l border-gray-200 dark:border-gray-700">
                  <Image
                    src="/images/facebook-posts-preview.png"
                    alt="פוסטים אותנטיים בפייסבוק"
                    width={600}
                    height={800}
                    className="relative object-cover h-full"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/images/dashboard-preview.png"
                    alt="לוח בקרת לידים של BuzzCraft"
                    width={600}
                    height={800}
                    className="relative object-cover h-full"
                  />
                </div>
              </div>
              
              <div className="absolute top-2 right-2 left-2 flex items-center gap-1.5 px-3 py-1.5 bg-gray-800/90 backdrop-blur-sm rounded-lg">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-white/90 font-medium mr-2">BuzzCraft - מחולל לידים מפייסבוק</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-emerald-600 text-white p-4 rounded-lg shadow-lg">
              <div className="text-2xl md:text-3xl font-bold">30,000+</div>
              <div className="text-sm opacity-90">לידים מיוצרים מדי חודש</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Background Decoration */}
      <div className="hidden md:block absolute top-1/2 left-0 w-64 h-64 -translate-y-1/2 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl"></div>
      <div className="hidden md:block absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-blue-400/10 blur-3xl"></div>
      
      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setShowVideo(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[80vh] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
              <h3 className="font-semibold">איך BuzzCraft עובד</h3>
              <button 
                onClick={() => setShowVideo(false)}
                className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="aspect-video bg-black">
              {/* Replace with actual video embed */}
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>כאן יופיע הסרטון שלך</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

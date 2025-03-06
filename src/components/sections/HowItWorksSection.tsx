'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSettings, FiUsers, FiMessageCircle, FiBarChart2 } from 'react-icons/fi';
import Image from 'next/image';

const steps = [
  {
    icon: <FiSettings className="w-6 h-6" />,
    title: 'התאמת הקמפיין שלך',
    description: "הגדר את פרופיל העסק שלך ואת קהל היעד: מהם התחומים, הצרכים והבעיות שהמוצר או השירות שלך פותר, ומהן הקבוצות הרלוונטיות בפייסבוק.",
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-300',
    image: '/images/steps/step1-criteria.svg'
  },
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: 'יצירה והפצה אוטומטית של פוסטים אותנטיים',
    description: "המערכת שלנו מייצרת מאות וריאציות של פוסטים אותנטיים ומפיצה אותם ב-10,000+ קבוצות פייסבוק ממוקדות, בדיוק כמו אדם אמיתי היה עושה.",
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/60 dark:text-teal-300',
    image: '/images/steps/step2-ai.svg'
  },
  {
    icon: <FiMessageCircle className="w-6 h-6" />,
    title: 'איסוף וטיפוח לידים אוטומטי',
    description: "בוט המסנג'ר החכם שלנו מנהל את השיחות הראשוניות עם מגיבים לפוסטים, אוסף את פרטי הקשר ומידע מיון ראשוני, ומזין את הלידים ישירות למערכת ה-CRM המובנית.",
    color: 'bg-green-100 text-green-600 dark:bg-green-900/60 dark:text-green-300',
    image: '/images/steps/step3-contact.svg'
  },
  {
    icon: <FiBarChart2 className="w-6 h-6" />,
    title: 'המשך טיפוח ומדידת תוצאות',
    description: "צפה בפרטי כל ליד, המשך לטפח אותו ולהוביל למכירה, עקוב אחר הביצועים באמצעות הדוחות האנליטיים, ועדכן את האסטרטגיה לפי הצורך.",
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/60 dark:text-amber-300',
    image: '/images/steps/step4-track.svg'
  }
];

const HowItWorksSection = () => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <section id="how-it-works" className="py-20 bg-slate-50 dark:bg-slate-800" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              איך <span className="gradient-text">BuzzCraft</span> עובד
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              הפלטפורמה שלנו הופכת את תהליך מציאת וגיוס לידים אורגניים מפייסבוק לאוטומטי לחלוטין
            </p>
            
            {/* Header Illustration */}
            <div className="relative w-full max-w-2xl mx-auto h-36 md:h-48 my-8">
              <Image
                src="/images/steps/how-it-works-header.svg"
                alt="תהליך העבודה של BuzzCraft"
                fill
                style={{ objectFit: 'contain' }}
                className="mx-auto"
                unoptimized
              />
            </div>
            
            {/* Watch Demo Button */}
            <div className="mt-8">
              <button
                onClick={() => setShowVideo(true)}
                className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                צפה בהדגמה
              </button>
            </div>
          </motion.div>
        </div>

        {/* Steps */}
        <div className="space-y-32">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div className="absolute right-[39px] md:right-1/2 top-20 bottom-[-120px] w-0.5 bg-gradient-to-b from-emerald-400 to-green-400 dark:from-emerald-500 dark:to-green-500"></div>
              )}
              
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`flex flex-col justify-center ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
                    <div className={`w-20 h-20 rounded-full ${step.color} flex items-center justify-center mr-4 shadow-md z-10`}>
                      <span className="text-2xl font-bold">{index + 1}</span>
                    </div>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400 mr-24 text-right">{step.description}</p>
                </div>
                
                {/* Image */}
                <div className={`relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 group hover:shadow-2xl transition-shadow duration-300 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/80 to-transparent z-10 dark:from-gray-900/80"></div>
                  <Image 
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'contain' }}
                    className="p-4 transition-transform duration-300 group-hover:scale-105"
                    unoptimized
                  />
                  <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-full ${step.color} flex items-center justify-center shadow-lg z-20`}>
                    {step.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Call-to-Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-20" 
        >
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 p-8 rounded-2xl shadow-lg max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white">
              מוכן למצוא לידים אורגניים איכותיים?
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              התחל לייצר לידים אורגניים מפייסבוק באופן אוטומטי ורציף עם BuzzCraft - הפלטפורמה המובילה לייצור לידים אורגניים
            </p>
            <a 
              href="/signup" 
              className="inline-flex items-center px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              התחל בחינם
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </motion.div>
        
        {/* Video Modal */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: showVideo ? 1 : 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 ${showVideo ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: showVideo ? 1 : 0.9 }}
            className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden"
          >
            <div className="aspect-video w-full">
              {showVideo && (
                <iframe 
                  width="100%" 
                  height="100%" 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                  title="הדגמת BuzzCraft" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              )}
            </div>
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;

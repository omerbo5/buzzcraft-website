'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  FiClock, 
  FiPieChart, 
  FiZap, 
  FiTarget, 
  FiUserCheck 
} from 'react-icons/fi';
import Image from 'next/image';

const solutions = [
  {
    icon: <FiZap className="w-7 h-7" />,
    title: 'אוטומציה חכמה',
    description: 'חסוך עד 90% מהזמן שלך עם מערכת אוטומטית המזהה, מנתחת ומפרסמת בקבוצות פייסבוק רלוונטיות, בדיוק בזמנים האופטימליים',
    benefit: 'משוחרר מהעבודה הידנית - חיסכון של 15-20 שעות עבודה שבועיות',
    imagePath: '/images/solutions/automation.svg',
    color: 'from-teal-500 to-emerald-500'
  },
  {
    icon: <FiUserCheck className="w-7 h-7" />,
    title: 'לידים אותנטיים',
    description: 'הטכנולוגיה שלנו מנתחת את השפה והסגנון של הקהל בכל קבוצה, ויוצרת פוסטים שמרגישים כמו תוכן אותנטי שנכתב על ידי בן אדם אמיתי',
    benefit: 'שיעור תגובה גבוה ב-78% בהשוואה ללידים ממודעות ממומנות ופניות יזומות',
    imagePath: '/images/solutions/authentic.svg',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: <FiPieChart className="w-7 h-7" />,
    title: 'אנליטיקה מתקדמת',
    description: 'קבל נתונים מפורטים על הביצועים של כל פוסט, קבוצה, וסגנון תוכן, ולמד איזה גישות מביאות את התוצאות הטובות ביותר לעסק שלך',
    benefit: 'שיפור מתמיד של 30-40% בביצועים לאורך זמן עם אופטימיזציה מבוססת נתונים',
    imagePath: '/images/solutions/analytics.svg',
    color: 'from-cyan-500 to-teal-500'
  },
  {
    icon: <FiTarget className="w-7 h-7" />,
    title: 'פילוח קהל מדויק',
    description: 'הגדר במדויק את פרופיל הלקוחות האידיאליים שלך, ואפשר למערכת לזהות ולהגיע אליהם דרך הקבוצות הרלוונטיות ביותר בפייסבוק',
    benefit: 'הגעה ללקוחות פוטנציאליים איכותיים פי 2 יותר מפרסום רגיל וקמפיינים ממומנים',
    imagePath: '/images/solutions/targeting.svg',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: <FiClock className="w-7 h-7" />,
    title: 'חיסכון בעלויות',
    description: 'השג לידים אורגניים איכותיים במחיר נמוך משמעותית ממודעות ממומנות, עם יחס המרה גבוה יותר ואמון רב יותר מצד הלקוחות',
    benefit: 'חיסכון של 60-80% בעלות השגת ליד בהשוואה לפרסום ממומן בפייסבוק ובגוגל',
    imagePath: '/images/solutions/cost-saving.svg',
    color: 'from-green-500 to-emerald-500'
  }
];

const KeySolutionsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-green-50 to-slate-50 dark:from-emerald-900/30 dark:to-slate-900/50" dir="rtl">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-gradient-to-r from-emerald-300/20 to-green-300/20 blur-3xl"></div>
        <div className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-gradient-to-r from-teal-300/10 to-cyan-300/10 blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:bg-[url('/images/grid-dark.svg')]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
            הפתרונות המרכזיים שלנו
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            BuzzCraft מספקת סט כלים מתקדמים שהופכים את ייצור הלידים האורגניים מפייסבוק לאוטומטי, פשוט ואפקטיבי
          </p>
        </motion.div>

        {/* Featured Solution - Hero Style */}
        <div className="mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', delay: 0.1 }}
            className="rounded-2xl overflow-hidden backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 p-8 md:p-10 border border-white/20 dark:border-slate-700/30 shadow-glass"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100/50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium text-sm mb-6">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  טכנולוגיה ייחודית
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
                  הפלטפורמה היחידה לייצור לידים <br />
                  <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">אורגניים שנראים כמו פניות טבעיות לגמרי</span>
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  הטכנולוגיה הייחודית שלנו משלבת בינה מלאכותית מתקדמת עם תבניות תקשורת אנושיות כדי ליצור ולהפיץ תוכן אותנטי בקבוצות פייסבוק מתאימות. המערכת מנהלת באופן אוטומטי את השיחות הראשוניות עם מתעניינים ואוספת לידים איכותיים ללא צורך בהתערבות ידנית שוטפת
                </p>
                
                <ul className="space-y-3 mb-6">
                  {['ייצור לידים איכותיים 24/7 ללא מאמץ יומיומי', 'בניית אמון דרך תקשורת אנושית ואותנטית', 'הורדת עלויות רכישת לקוחות ב-80%'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-emerald-600 to-green-500 p-0.5 rounded-full text-white mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/30 to-blue-100/30 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-xl"></div>
                <motion.div 
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative rounded-xl overflow-hidden shadow-xl border border-white/30 dark:border-slate-700/50 aspect-[4/3]"
                >
                  <Image
                    src="/images/dashboard-preview.png" 
                    alt="מערכת BuzzCraft" 
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: 'cover' }}
                    className="transition-transform"
                  />
                </motion.div>
                
                <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 bg-gradient-to-r from-emerald-600 to-green-500 text-white p-4 rounded-lg shadow-lg">
                  <div className="text-2xl md:text-3xl font-bold">8.5x</div>
                  <div className="text-sm opacity-90">ROI ממוצע</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Solutions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                transition: { type: 'spring', stiffness: 400, damping: 20 }
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="flex flex-col rounded-xl overflow-hidden backdrop-blur-sm bg-white/40 dark:bg-slate-900/40 border border-white/20 dark:border-slate-700/30 shadow-glass group"
            >
              <div className={`p-1 bg-gradient-to-r ${solution.color}`}>
                <div className="flex items-start p-6 pt-7 bg-white dark:bg-slate-900 rounded-t-lg">
                  <div className={`flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-xl ml-4 bg-gradient-to-br ${solution.color} text-white shadow-md`}>
                    {solution.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{solution.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">{solution.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex-grow bg-gray-50/80 dark:bg-slate-800/50">
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-2"></div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">התועלת העיקרית:</p>
                </div>
                <p className="text-slate-700 dark:text-slate-300 font-medium">{solution.benefit}</p>
                
                <motion.div 
                  className="mt-4 relative h-20 overflow-hidden rounded-lg"
                  animate={{ 
                    height: activeIndex === index ? 120 : 80 
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {solution.icon && React.cloneElement(solution.icon, {
                      className: "w-16 h-16 text-gray-400 dark:text-gray-600 opacity-80"
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeySolutionsSection;

'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiDatabase, FiMessageCircle, FiTrendingUp, FiArrowLeft, FiPlayCircle } from 'react-icons/fi';
import { useScroll, useTransform } from 'framer-motion';

const features = [
  {
    icon: <FiUsers className="w-8 h-8" />,
    title: 'יצירת לידים אורגניים מפייסבוק',
    description: 'הטכנולוגיה שלנו יוצרת תוכן טבעי ואותנטי ומפיצה אותו באלפי קבוצות פייסבוק ממוקדות, שם נמצאים בדיוק הלקוחות הפוטנציאליים המחפשים את השירותים והמוצרים שלך.',
    color: 'from-emerald-500 via-teal-400 to-green-500'
  },
  {
    icon: <FiCpu className="w-8 h-8" />,
    title: 'מנוע AI מתקדם להפצה חכמה',
    description: 'המערכת מזהה את הקבוצות הרלוונטיות ביותר לעסק שלך, מייצרת תוכן מותאם אישית לכל קבוצה, ומתזמנת פרסומים באופן אופטימלי להשגת מקסימום תגובות ולידים פוטנציאליים.',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: <FiDatabase className="w-8 h-8" />,
    title: 'מערכת CRM ייעודית ללידים מפייסבוק',
    description: 'נהל ביעילות את כל הלידים האורגניים שלך במערכת ה-CRM המותאמת במיוחד לתהליך טיפוח לידים מפייסבוק, עם תיוג אוטומטי, ניהול מעקב, והתראות על לידים חמים.',
    color: 'from-green-500 to-lime-500'
  },
  {
    icon: <FiMessageCircle className="w-8 h-8" />,
    title: 'בוט שיחות AI לסינון ראשוני',
    description: 'בוט המסנג׳ר החכם שלנו מזהה לידים איכותיים, מקיים שיחות ראשוניות טבעיות, אוסף פרטים חיוניים, ומתעדף לידים לטיפול מיידי במערכת ה-CRM.',
    color: 'from-lime-500 to-emerald-500'
  },
  {
    icon: <FiTrendingUp className="w-8 h-8" />,
    title: 'אנליטיקה מבוססת תוצאות',
    description: 'קבל תובנות מעמיקות בזמן אמת על איכות הלידים, שיעורי המעורבות, יחסי המרה, ועלות לליד - עם יכולת להשוות לתוצאות מקמפיינים ממומנים.',
    color: 'from-amber-500 to-orange-500'
  }
];

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden py-32 bg-gradient-to-b from-slate-900 to-blue-900 dark:from-slate-950 dark:to-slate-900" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            <span className="font-heebo block">
              ניהול לידים <span className="text-slate-200">בעולם אמיתי</span>
            </span>
            <span className="text-3xl md:text-4xl text-slate-200 font-medium mt-4 block">
              מערכת שיוצרת <span className="text-slate-200">שיחות אמיתיות וערך</span> בשוק דיגיטלי רווי בפרסומות
            </span>
          </h2>
        </motion.div>

        {/* Interactive Value Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { title: 'לידים אורגניים', value: '5,200+', desc: 'לידים איכותיים מדי חודש' },
            { title: 'שיעור המרה', value: '92%', desc: 'מלידים לשיחות אמיתיות' },
            { title: 'חיסכון בזמן', value: '40+ שעות', desc: 'של עבודה ידנית בחודש' },
            { title: 'שביעות רצון', value: '4.9/5', desc: 'על פי 327 לקוחות' }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/5 p-6 rounded-2xl backdrop-blur-sm border border-slate-700/30 hover:border-emerald-400/30 transition-colors"
              whileHover={{ y: -5 }}
            >
              <div className="text-emerald-400 text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-xl text-slate-200 font-medium mb-1">{stat.title}</div>
              <div className="text-slate-400">{stat.desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            {features.slice(0,2).map((feature, i) => (
              <motion.div
                key={i}
                className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="space-y-12">
            {features.slice(2).map((feature, i) => (
              <motion.div
                key={i}
                className="group bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color}`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-emerald-500 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            התחל להפיק לידים - ללא התחייבות
          </motion.button>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};

export default FeaturesSection;

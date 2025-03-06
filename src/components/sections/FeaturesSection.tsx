'use client';

import { motion } from 'framer-motion';
import { FiUsers, FiCpu, FiDatabase, FiMessageCircle, FiTrendingUp } from 'react-icons/fi';

const features = [
  {
    icon: <FiUsers className="w-6 h-6" />,
    title: 'יצירת לידים אורגניים מפייסבוק',
    description: 'המערכת שלנו מייצרת תוכן אותנטי ומפיצה אותו באלפי קבוצות פייסבוק רלוונטיות, מושכת בדיוק את הלקוחות שמחפשים את השירותים שלך.',
    color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400'
  },
  {
    icon: <FiCpu className="w-6 h-6" />,
    title: 'הנעה אוטומטית חכמה',
    description: 'הבינה המלאכותית שלנו יוצרת וממטבת באופן רציף תוכן אותנטי שמתאים לקבוצות היעד, עוקבת אחר הביצועים ומשפרת אסטרטגיות לתוצאות מיטביות.',
    color: 'bg-teal-100 text-teal-600 dark:bg-teal-900/50 dark:text-teal-400'
  },
  {
    icon: <FiDatabase className="w-6 h-6" />,
    title: 'מערכת CRM מובנית',
    description: 'ארגן, תייג ונהל את הלידים האורגניים שלך עם מערכת ה-CRM המובנית שלנו, שתוכננה במיוחד עבור טיפוח לידים מפייסבוק.',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400'
  },
  {
    icon: <FiMessageCircle className="w-6 h-6" />,
    title: 'בוט שיחות אוטומטי',
    description: 'בוט המסנג׳ר החכם שלנו מטפל בשיחות הראשוניות, אוסף פרטים חיוניים, ומזין אותם ישירות למערכת ה-CRM לטיפוח מיידי.',
    color: 'bg-lime-100 text-lime-600 dark:bg-lime-900/50 dark:text-lime-400'
  },
  {
    icon: <FiTrendingUp className="w-6 h-6" />,
    title: 'אנליטיקות וביצועים',
    description: 'עקוב אחר ההצלחה שלך עם נתונים מפורטים על איכות הלידים, שיעורי מעורבות, ומדדי המרה בזמן אמת.',
    color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400'
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white dark:bg-slate-900" dir="rtl">
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
              תכונות חזקות של <span className="gradient-text">BuzzCraft</span> לייצור לידים אורגניים מפייסבוק
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              הפלטפורמה שלנו משלבת בינה מלאכותית מתקדמת עם כלים חכמים כדי ליצור ולטפח לידים איכותיים באופן אורגני מקבוצות פייסבוק.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card hover:translate-y-[-5px] text-right"
            >
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Additional Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 md:p-12 shadow-sm border border-emerald-100 dark:border-slate-600"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="text-right">
              <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                לידים אורגניים איכותיים יותר
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                הטכנולוגיה שלנו מייצרת פוסטים שנראים טבעיים לחלוטין ומפיצה אותם באלפי קבוצות פייסבוק רלוונטיות. 
                בניגוד לפרסום ממומן, הגישה האורגנית שלנו מייצרת שיחות אותנטיות, 
                משפרת את אמון הלקוחות, ומניבה לידים איכותיים יותר בעלות נמוכה יותר.
              </p>
              <ul className="space-y-3">
                {[
                  'יצירת פוסטים אותנטיים המותאמים לכל קבוצה',
                  'כיסוי אוטומטי של אלפי קבוצות רלוונטיות',
                  'מערכת חכמה לניהול שיחות ראשוניות',
                  'עלות נמוכה יותר לליד בהשוואה לפרסום ממומן'
                ].map((item, i) => (
                  <li key={i} className="flex items-start justify-end">
                    <span className="text-slate-700 dark:text-slate-300">{item}</span>
                    <span className="flex-shrink-0 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center text-white mr-3 order-first">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative h-64 md:h-80 lg:h-full min-h-[300px] rounded-lg overflow-hidden shadow-md">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-green-500/20 dark:from-emerald-500/40 dark:to-green-500/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm p-6 rounded-lg shadow-lg max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="font-semibold text-slate-900 dark:text-white">השוואת ביצועים</h4>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">94%</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">שיעור פתיחת הודעות</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">87%</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">שיעור מעורבות</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">76%</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">יחס עלות-תועלת</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;

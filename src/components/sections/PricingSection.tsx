'use client';

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const pricingPlans = [
  {
    name: 'בסיסי',
    price: 1990,
    description: 'לעסקים קטנים שמחפשים פתרון יעיל לייצור לידים אורגניים',
    features: [
      'עד 300 פוסטים אותנטיים בחודש',
      'הפצה ל-50 קבוצות רלוונטיות',
      'איסוף לידים בסיסי דרך מסנג\'ר',
      'לוח בקרה CRM פשוט',
      'תמיכה באימייל',
      'ללא חוזים - ביטול בכל עת',
      '14 יום אחריות להחזר כספי',
      'דוחות ביצועים שבועיים'
    ],
    highlighted: false,
    buttonText: 'התחל ניסיון חינם',
    buttonLink: '/signup?plan=basic'
  },
  {
    name: 'מקצועי',
    price: 3990,
    description: 'אידיאלי לעסקים צומחים המחפשים יותר לידים ויכולות מתקדמות',
    features: [
      'עד 600 פוסטים אותנטיים בחודש',
      'הפצה ל-200 קבוצות רלוונטיות',
      'איסוף לידים מתקדם עם סינון איכות',
      'CRM מלא עם אנליטיקה',
      'תמיכת צ\'אט ואימייל בעדיפות גבוהה',
      'ללא חוזים - ביטול בכל עת',
      '14 יום אחריות להחזר כספי',
      'דוחות ביצועים שבועיים',
      'אופטימיזציית אסטרטגיה קבועה'
    ],
    highlighted: true,
    buttonText: 'התחל ניסיון חינם',
    buttonLink: '/signup?plan=professional'
  },
  {
    name: 'ארגוני',
    price: 7990,
    description: 'לעסקים מבוססים עם דרישות לידים בנפח גבוה ושירות פרימיום',
    features: [
      'פוסטים אותנטיים ללא הגבלה',
      'הפצה לקבוצות רלוונטיות ללא הגבלה',
      'איסוף וטיפוח לידים פרימיום',
      'CRM מתקדם עם יכולות אינטגרציה',
      'מנהל חשבון ייעודי',
      'דיווחים מותאמים אישית',
      'ללא חוזים - ביטול בכל עת',
      '14 יום אחריות להחזר כספי',
      'אופטימיזציית אסטרטגיה שבועית'
    ],
    highlighted: false,
    buttonText: 'צור קשר עם המכירות',
    buttonLink: '/contact'
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-50 dark:bg-slate-800" dir="rtl">
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
              <span className="gradient-text">תוכניות מחירים</span> פשוטות ושקופות
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-16">
              BuzzCraft מציעה חבילות פשוטות וגמישות ללא הפתעות או עלויות נסתרות
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden ${
                plan.highlighted 
                  ? 'shadow-xl border-2 border-emerald-500 dark:border-emerald-400' 
                  : 'shadow-md border border-gray-200 dark:border-slate-700'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 left-0 bg-emerald-500 text-white text-center text-sm font-medium py-1">
                  הפופולרי ביותר
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''} bg-white dark:bg-slate-900`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">₪{plan.price}</span>
                  <span className="text-slate-600 dark:text-slate-400">/חודש</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm">
                  {plan.description}
                </p>
                <Link 
                  href={plan.buttonLink}
                  className={`block text-center py-2.5 px-4 rounded-md font-medium transition-colors ${
                    plan.highlighted 
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-white' 
                      : 'bg-white dark:bg-slate-800 border border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
              <div className="p-8 bg-gray-50 dark:bg-slate-800/70">
                <p className="font-medium text-slate-900 dark:text-white mb-4">מה כלול:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start justify-end">
                      <span className="text-slate-600 dark:text-slate-300 text-sm text-right">{feature}</span>
                      <FiCheck className="w-5 h-5 text-emerald-500 ml-2 flex-shrink-0 mt-0.5" />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-slate-600 dark:text-slate-400">
            יש לך שאלות לגבי התמחור שלנו? בדוק את{' '}
            <Link href="#faq" className="text-emerald-500 hover:underline">
              מדור השאלות הנפוצות
            </Link>{' '}
            או{' '}
            <Link href="/contact" className="text-emerald-500 hover:underline">
              צור קשר עם צוות המכירות שלנו
            </Link>
            .
          </p>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 rounded-xl p-8 md:p-12 bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-700"
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">השוואה: BuzzCraft מול שיווק פייסבוק מסורתי</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <th className="py-4 px-4 text-right">תכונה</th>
                    <th className="py-4 px-4 text-center font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400">BuzzCraft</th>
                    <th className="py-4 px-4 text-center font-medium bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400">פרסום פייסבוק מסורתי</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">עלות חודשית</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">מחיר מנוי קבוע וידוע מראש</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">לא צפויה, עולה באופן מתמיד</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">יצירת תוכן</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">אוטומטית, מאות וריאציות</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">ידנית, וריאציות מוגבלות</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">מיקוד קהל</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">10,000+ קבוצות ממוקדות</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">תלוי באלגוריתם וממוקד קהלים</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">רמת אמון</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">גבוהה (המלצות אותנטיות)</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">נמוכה (מודעות גלויות)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">ניהול נדרש</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">מינימלי (15 דק'/שבוע)</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">נרחב (10+ שעות/שבוע)</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">איסוף לידים</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">אוטומטי דרך מסנג'ר</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">נדרש מעקב ידני</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-slate-700">
                    <td className="py-4 px-4 text-right font-medium text-slate-900 dark:text-white">זמן לתוצאות</td>
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">3-5 ימים בממוצע</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">+14 ימים בממוצע</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link 
                href="#cta"
                className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-md font-medium transition-colors shadow-lg shadow-emerald-500/20"
              >
                בחר בשיווק חכם יותר
              </Link>
            </div>
          </div>
        </motion.div>
        <p className="mt-12 text-center max-w-xl mx-auto text-slate-600 dark:text-slate-400">
          צריך פתרון שמותאם במיוחד לעסק שלך? <a href="/contact" className="text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium">צור קשר עם הנציגים של BuzzCraft</a> לתוכנית בהתאמה אישית.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;

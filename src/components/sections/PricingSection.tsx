'use client';

import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Link from 'next/link';

const pricingPlans = [
  {
    name: 'בסיסי',
    price: 1990,
    description: 'פתרון אידיאלי לעסקים קטנים המעוניינים בייצור לידים אורגניים איכותיים במאמץ מינימלי',
    features: [
      'עד 300 פוסטים אותנטיים בחודש',
      'הפצה בעד 50 קבוצות פייסבוק ממוקדות',
      'איסוף לידים חכם עם בוט מסנג\'ר',
      'לוח בקרה CRM לניהול לידים',
      'תמיכה טכנית במייל תוך יום עסקים',
      'גמישות מלאה - ביטול בכל עת',
      '14 יום אחריות להחזר כספי מלא',
      'דוחות ביצועים שבועיים מפורטים'
    ],
    highlighted: false,
    buttonText: 'התחל ניסיון חינם',
    buttonLink: '/signup?plan=basic'
  },
  {
    name: 'מקצועי',
    price: 3990,
    description: 'לעסקים צומחים המחפשים כמות גדולה יותר של לידים ויכולות מתקדמות לניהול והמרה',
    features: [
      'עד 600 פוסטים אותנטיים בחודש',
      'הפצה בעד 200 קבוצות פייסבוק ממוקדות',
      'איסוף לידים מתקדם עם סינון איכות אוטומטי',
      'CRM מלא עם תיוג אוטומטי והתראות',
      'תמיכה מהירה בצ\'אט ובמייל תוך שעות',
      'גמישות מלאה - ביטול בכל עת',
      '14 יום אחריות להחזר כספי מלא',
      'דוחות ביצועים מפורטים בזמן אמת',
      'אופטימיזציית אסטרטגיה שבועית מבוססת נתונים'
    ],
    highlighted: true,
    buttonText: 'התחל ניסיון חינם',
    buttonLink: '/signup?plan=professional'
  },
  {
    name: 'עסקי פרימיום',
    price: 7990,
    description: 'לחברות ועסקים מבוססים הזקוקים לכמות גדולה של לידים איכותיים ושירות מקיף ברמה עסקית',
    features: [
      'פוסטים אותנטיים ללא הגבלה',
      'הפצה בקבוצות פייסבוק רלוונטיות ללא הגבלה',
      'מערכת AI מתקדמת לזיהוי וטיפוח לידים מובילים',
      'CRM מתקדם עם אינטגרציה למערכות קיימות',
      'מנהל לקוח ייעודי וליווי אסטרטגי',
      'דיווחים מותאמים אישית לצרכי העסק',
      'גמישות מלאה - ביטול בכל עת',
      '14 יום אחריות להחזר כספי מלא',
      'אופטימיזציית אסטרטגיה שבועית מבוססת תוצאות'
    ],
    highlighted: false,
    buttonText: 'צור קשר עם המכירות',
    buttonLink: '/contact'
  }
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 bg-slate-50/50 dark:bg-slate-900 relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-[url('/images/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] dark:bg-[url('/images/grid-dark.svg')]"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              <span className="gradient-text">מחירים</span> שקופים עם תוצאות מוכחות
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-16">
              אנחנו מציעים חבילות פשוטות וגמישות עם החזר השקעה מוכח, ללא התחייבות ארוכת טווח או עלויות נסתרות
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
              transition={{ type: 'spring', delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 border-2 border-white/20 hover:border-emerald-500/30 transition-all ${
                plan.highlighted 
                  ? 'shadow-xl [background:linear-gradient(theme(colors.slate.50/50),theme(colors.slate.50/50)),linear-gradient(theme(colors.emerald.500),theme(colors.green.500))] dark:[background:linear-gradient(theme(colors.slate.900/30),theme(colors.slate.900/30)),linear-gradient(theme(colors.emerald.600),theme(colors.green.600))]' 
                  : 'shadow-md'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 right-0 left-0 bg-emerald-500 text-white text-center text-sm font-medium py-1">
                  הפופולרי ביותר
                </div>
              )}
              <div className={`p-8 ${plan.highlighted ? 'pt-10' : ''} bg-white/50 dark:bg-slate-900/50`}>
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
                  className={`block text-center py-2.5 px-4 rounded-md font-medium transition-all ${
                    plan.highlighted 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl' 
                      : 'bg-white/50 dark:bg-slate-800/50 border border-emerald-500/30 text-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-slate-700/50 hover:border-emerald-500/50'
                  }`}
                >
                  {plan.buttonText}
                </Link>
              </div>
              <div className="p-8 bg-gray-50/50 dark:bg-slate-800/50">
                <p className="font-medium text-slate-900 dark:text-white mb-4">מה כלול:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-slate-600 dark:text-slate-300 text-sm flex-1 text-right">{feature}</span>
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        className="text-emerald-500"
                      >
                        <FiCheck className="w-6 h-6 p-1 rounded-full bg-emerald-100/50 dark:bg-emerald-900/20" />
                      </motion.div>
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
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="mt-20 rounded-xl p-8 md:p-12 bg-white/50 dark:bg-slate-900/50 shadow-lg border border-gray-200 dark:border-slate-700"
        >
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">השוואת עלות-תועלת: BuzzCraft מול שיווק פייסבוק מסורתי</h3>
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
                    <td className="py-4 px-4 text-center bg-emerald-50 dark:bg-emerald-900/20">תעריף קבוע וידוע מראש ללא הפתעות</td>
                    <td className="py-4 px-4 text-center bg-gray-50 dark:bg-gray-800/50">משתנה ולא צפויה, עם עלייה מתמדת בעלות לקליק</td>
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

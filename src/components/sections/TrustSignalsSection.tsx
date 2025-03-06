'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiShield, FiLock, FiCheckCircle } from 'react-icons/fi';

const TrustSignalsSection = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-800" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Security and Compliance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4">
                <FiShield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">מאובטח ותואם</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                כל המידע מוצפן ומאוחסן באופן מאובטח. אנו עומדים בדרישות GDPR, CCPA ותקנות פרטיות אחרות.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center mb-4">
                <FiCheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">תואם API</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                אנו משתמשים ב-API הרשמי של Reddit ומכבדים את כל מגבלות הקצב ודרישות תנאי השירות.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center mb-4">
                <FiLock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">פרטיות מידע</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                המידע שלך שייך לך. איננו מוכרים את המידע שלך ושומרים על בקרות פרטיות קפדניות.
              </p>
            </div>
          </div>
          
          {/* Integration Partners */}
          <div className="text-center mb-8">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
              משתלב בצורה חלקה עם
            </h3>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* CRM Integrations */}
              {['Salesforce', 'HubSpot', 'Pipedrive', 'Zoho CRM', 'Monday.com'].map((partner, index) => (
                <div key={index} className="h-8 flex items-center opacity-70 hover:opacity-100 transition-opacity">
                  <span className="text-lg font-bold text-slate-700 dark:text-slate-300">{partner}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Certifications */}
          <div className="text-center">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-6">
              תעודות ותאימות
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {['תואם GDPR', 'תואם CCPA', 'SOC 2', 'מאובטח SSL'].map((cert, index) => (
                <div key={index} className="px-4 py-2 bg-white dark:bg-slate-700 rounded-md shadow-sm border border-gray-100 dark:border-slate-600 text-sm text-slate-700 dark:text-slate-300">
                  {cert}
                </div>
              ))}
            </div>
          </div>
          
          {/* Data Promise */}
          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              ב-BuzzCraft, אנו מחויבים לשמירה על הסטנדרטים הגבוהים ביותר של אבטחת מידע ופרטיות. 
              אנו משתמשים בהצפנה ברמה צבאית כדי להגן על הנתונים שלך ולעולם לא נמכור את המידע האישי שלך לצדדים שלישיים.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900" dir="rtl">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            התחל לייצר לידים איכותיים היום
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            הצטרף למאות עסקים המוצאים את הלקוחות האידיאליים שלהם ב-Reddit. התחל את תקופת הניסיון החינמית שלך ל-14 יום וראה את התוצאות בעצמך.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/signup" className="btn-primary text-center px-8 py-3 text-lg">
              התחל ניסיון חינם
            </Link>
            <Link href="/demo" className="btn-secondary text-center px-8 py-3 text-lg">
              בקש הדגמה
            </Link>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500 flex flex-wrap justify-center gap-x-6">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              לא נדרש כרטיס אשראי
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ניסיון חינם ל-14 יום
            </span>
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              ביטול בכל עת
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const brands = [
  {
    name: 'טקכורפ',
    logo: '/images/logos/techcorp.svg',
  },
  {
    name: 'אינובייט בע״מ',
    logo: '/images/logos/innovate.svg',
  },
  {
    name: 'פיוצ׳רטק',
    logo: '/images/logos/futuretech.svg',
  },
  {
    name: 'דאטהסיס',
    logo: '/images/logos/datasys.svg',
  },
  {
    name: 'מטאוורס',
    logo: '/images/logos/metaverse.svg',
  },
];

const SocialProofSection = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900/50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            בשימוש חברות חדשניות ברחבי העולם
          </p>
        </motion.div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center justify-center h-10 md:h-12"
            >
              <div className="h-5 md:h-6 text-gray-400 dark:text-gray-500 font-bold">
                {brand.name}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 flex-row-reverse space-x-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>תואם GDPR</span>
            <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span>תואם SOC 2</span>
            <span className="mx-2 text-gray-300 dark:text-gray-700">•</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-blue-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>זמינות של 99.9% SLA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProofSection;

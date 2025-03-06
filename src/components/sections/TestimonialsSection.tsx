'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    content: "BuzzCraft שינה את הדרך שבה אנו מוצאים לידים מתאימים. תוך מספר שבועות בלבד, זיהינו מעל 40 לקוחות פוטנציאליים בעלי כוונות גבוהות שהיינו מפספסים לחלוטין בדרך אחרת.",
    author: {
      name: "שרה כהן",
      title: "מנהלת שיווק ב-TechForward",
      avatar: "/images/avatars/avatar-1.jpg"
    },
    rating: 5
  },
  {
    id: 2,
    content: "איכות הלידים שאנו מקבלים מ-BuzzCraft היא יוצאת דופן. אלה אנשים שמחפשים באופן פעיל פתרונות כמו שלנו. שיעורי ההמרה שלנו עלו ב-215% מאז שהתחלנו להשתמש בכלי הזה.",
    author: {
      name: "מיכאל לוי",
      title: "מוביל צמיחה ב-ScaleUp Solutions",
      avatar: "/images/avatars/avatar-2.jpg"
    },
    rating: 5
  },
  {
    id: 3,
    content: "כעסק קטן, כל שקל שיווקי חשוב. BuzzCraft נתן לנו את התשואה הטובה ביותר מכל כלי ייצור לידים שניסינו. זה כמו לקבל איש מכירות נוסף שעובד 24/7.",
    author: {
      name: "דוד ישראלי",
      title: "מייסד של Craft Digital",
      avatar: "/images/avatars/avatar-3.jpg"
    },
    rating: 5
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800" dir="rtl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            מה <span className="gradient-text">הלקוחות</span> שלנו אומרים
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            הצטרף למאות חברות המשתמשות ב-BuzzCraft כדי למצוא ולהמיר לידים איכותיים ב-Reddit
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 relative ${
                index === 1 ? 'md:-mt-4' : ''
              }`}
            >
              <div className="absolute -top-3 right-6 px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
                {Array(testimonial.rating).fill(0).map((_, i) => (
                  <span key={i} className="inline-block">★</span>
                ))}
              </div>
              
              <div className="h-40 flex items-start">
                <p className="text-gray-700 dark:text-gray-300 text-lg italic text-right">"{testimonial.content}"</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                    {testimonial.author.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div className="mr-4">
                  <h4 className="font-medium text-gray-900 dark:text-white">{testimonial.author.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.author.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <div className="text-right">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">תוצאות מובטחות</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  אנו מבטיחים שתמצא לידים חדשים בשבוע הראשון שלך או שנחזיר לך את כספך.
                </p>
              </div>
              <div className="text-blue-600 dark:text-blue-400 mr-4 ml-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

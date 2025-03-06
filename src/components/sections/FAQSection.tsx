'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const faqs = [
  {
    question: 'האם BuzzCraft עומד בתנאי השירות של פייסבוק?',
    answer: 'כן, BuzzCraft פועל לפי כל תנאי השירות של פייסבוק. אנו מפרסמים פוסטים אותנטיים בקבוצות רלוונטיות בצורה ידנית ואנושית, בדיוק כפי שאדם רגיל היה עושה, ולא משתמשים בכלים אוטומטיים אסורים או בהפצה המונית.'
  },
  {
    question: 'האם הלידים שמתקבלים הם איכותיים?',
    answer: 'בהחלט! הלידים שמתקבלים דרך BuzzCraft נחשבים לאיכותיים במיוחד משתי סיבות מרכזיות: האחת, הם אורגניים לגמרי ולא נובעים ממודעות פרסומיות (שרבים כבר מפתחים עיוורון אליהן). השנייה, הם מגיעים מקבוצות ממוקדות שבהן אנשים מחפשים באופן אקטיבי פתרונות לבעיות שלהם, מה שהופך אותם ללקוחות פוטנציאליים עם כוונת רכישה גבוהה יותר.'
  },
  {
    question: 'האם אני יכול לייצא את הלידים למערכות CRM אחרות?',
    answer: 'בהחלט! BuzzCraft מציע ייצוא קבצי CSV בכל התכניות, והתכניות המקצועיות והארגוניות כוללות אינטגרציות ישירות עם מערכות CRM פופולריות כמו Salesforce, HubSpot, ו-Pipedrive.'
  },
  {
    question: 'האם אתם מציעים תקופת ניסיון?',
    answer: 'כן, כל התכניות שלנו כוללות תקופת ניסיון חינמית של 7 ימים עם גישה מלאה לכל התכונות. לא נדרש כרטיס אשראי כדי להתחיל, ואתה יכול לבטל בכל עת. בנוסף, אנו מציעים אחריות להחזר כספי של 14 יום אם אינך מרוצה מהשירות.'
  },
  {
    question: 'כמה לידים אני יכול לצפות לקבל?',
    answer: 'כמות הלידים תלויה בתוכנית שבחרת, בתעשייה שלך, ובפוטנציאל השוק שלך בפייסבוק. בתוכנית הבסיסית, לקוחות מקבלים בממוצע 100-300 לידים בחודש. בתוכנית המקצועית, הממוצע נע בין 300-600 לידים בחודש. חשוב לציין שהמספרים עשויים להשתנות בהתאם לתחום העיסוק ולרמת התחרותיות בשוק.'
  },
  {
    question: 'כמה זמן לוקח להתחיל לראות תוצאות?',
    answer: 'הלקוחות שלנו מתחילים לראות לידים ראשונים בתוך 3-5 ימים מרגע השקת הקמפיין. הבדל משמעותי לעומת פרסום מסורתי בפייסבוק, שם לוקח בדרך כלל 14+ ימים לאופטימיזציה ראשונית של קמפיינים פרסומיים.'
  },
  {
    question: 'האם אני צריך להשקיע זמן רב בניהול הפלטפורמה?',
    answer: 'ממש לא, זו בדיוק המטרה של BuzzCraft - לחסוך לך זמן וכאב ראש. אחת מהיתרונות המרכזיים של הפלטפורמה היא חיסכון בזמן ניהול. בעוד שניהול קמפיין פרסומי מסורתי בפייסבוק דורש לפחות 10 שעות שבועיות, עם BuzzCraft תוכל להסתפק ב-15 דקות בשבוע לבדיקת דוחות הביצועים והתאמות קלות לאסטרטגיה.'
  },
  {
    question: 'איך עובד תהליך איסוף הלידים?',
    answer: 'הפלטפורמה שלנו מייצרת ומפיצה פוסטים אותנטיים בקבוצות פייסבוק רלוונטיות. כאשר אנשים מגיבים או שולחים הודעה ישירה, המערכת שלנו משתמשת בבוט מסנג\'ר חכם שמנהל את השיחה הראשונית, אוסף את פרטי הקשר, ושואל שאלות מיון בסיסיות. כל הלידים נשמרים אוטומטית במערכת ה-CRM המובנית שלנו, וניתן לייצא אותם או לשלב עם מערכות חיצוניות.'
  }
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-white dark:bg-slate-900" dir="rtl">
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
              שאלות <span className="gradient-text">נפוצות</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              קבל תשובות לשאלות נפוצות על BuzzCraft ושירות ייצור הלידים האורגניים שלנו מפייסבוק
            </p>
          </motion.div>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="mb-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`w-full text-right p-5 rounded-lg flex justify-between items-center ${
                  openIndex === index
                    ? 'bg-emerald-50 dark:bg-emerald-900/20'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                }`}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-slate-900 dark:text-white">{faq.question}</span>
                {openIndex === index ? (
                  <FiChevronUp className="text-emerald-500 flex-shrink-0 ml-2" />
                ) : (
                  <FiChevronDown className="text-slate-500 dark:text-slate-400 flex-shrink-0 ml-2" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="p-5 bg-white dark:bg-slate-900 border border-t-0 border-slate-200 dark:border-slate-700 rounded-b-lg">
                  <p className="text-slate-600 dark:text-slate-400 text-right">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Additional Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto mt-12 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            עדיין יש לך שאלות? אנחנו כאן לעזור!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-md font-medium transition-colors"
            >
              צור קשר עם התמיכה
            </a>
            <a 
              href="/docs" 
              className="px-6 py-3 bg-white dark:bg-slate-800 border border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-slate-700 rounded-md font-medium transition-colors"
            >
              צפה במדריך המשתמש
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

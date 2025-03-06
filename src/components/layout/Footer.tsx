import Link from 'next/link';
import Image from 'next/image';
import { FiTwitter, FiLinkedin, FiFacebook, FiInstagram } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-slate-200 dark:border-slate-800">
          {/* Company Info */}
          <div>
            <div className="flex flex-col gap-2">
              <div className="relative w-12 h-12">
                <Image 
                  src="/logo-dark.svg" 
                  alt="BuzzCraft Logo" 
                  fill
                  className="object-contain" 
                />
              </div>
              <span className="text-lg font-bold font-poppins text-slate-900 dark:text-white">BuzzCraft</span>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                הפלטפורמה המובילה לייצור לידים אורגניים מפייסבוק באמצעות תוכן אותנטי
              </p>
            </div>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="text-slate-500 hover:text-blue-500 transition-colors">
                <FiTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-blue-700 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="text-slate-500 hover:text-blue-600 transition-colors">
                <FiFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="text-slate-500 hover:text-pink-600 transition-colors">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#testimonials" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="text-slate-600 dark:text-slate-400">
                <span className="block">Email:</span>
                <a href="mailto:info@buzzcraft.com" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  info@buzzcraft.com
                </a>
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <span className="block">Phone:</span>
                <a href="tel:+1234567890" className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <span className="block">Address:</span>
                <address className="not-italic">
                  123 Lead Street<br />
                  San Francisco, CA 94103
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} BuzzCraft. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/sitemap" className="text-slate-600 dark:text-slate-400 text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Sitemap
            </Link>
            <Link href="/accessibility" className="text-slate-600 dark:text-slate-400 text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

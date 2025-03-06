'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiLogOut, FiUser } from 'react-icons/fi';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { DarkModeAwareLogo } from '@/components/ui/DarkModeAwareLogo';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      <header className={`fixed top-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-5'
      }`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <DarkModeAwareLogo />
            </div>
            <span className="text-xl font-bold font-rubik text-slate-900 dark:text-white">BuzzCraft</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              תכונות
            </Link>
            <Link href="#how-it-works" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              איך זה עובד
            </Link>
            <Link href="#pricing" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              מחירים
            </Link>
            <Link href="#testimonials" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              המלצות
            </Link>
            <Link href="#faq" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
              שאלות נפוצות
            </Link>
          </nav>

          {/* Desktop Call-to-Action */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link 
                  href="/dashboard" 
                  className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium inline-flex items-center gap-2"
                >
                  <FiUser className="w-4 h-4" />
                  לוח בקרה
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-outline flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4 transform scale-x-[-1]" />
                  התנתק
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium">
                  התחבר
                </Link>
                <Link href="/signup" className="btn-primary">
                  הרשמה חינם
                </Link>
              </>
            )}
            
            {/* Theme Toggle - Desktop */}
            <ThemeToggle />
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-2">
            {/* Theme Toggle - Mobile */}
            <ThemeToggle />
            
            {/* Mobile Menu Button */}
            <button
              className="text-slate-900 dark:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="תפריט"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Separate from header for better layout control */}
      {isMenuOpen && (
        <div className="fixed right-0 left-0 top-[60px] md:hidden bg-white dark:bg-slate-900 py-4 px-6 shadow-lg max-h-[calc(100vh-60px)] overflow-y-auto z-40">
          <nav className="flex flex-col gap-4">
            <Link 
              href="#features" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              תכונות
            </Link>
            <Link 
              href="#how-it-works" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              איך זה עובד
            </Link>
            <Link 
              href="#pricing" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              מחירים
            </Link>
            <Link 
              href="#testimonials" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              המלצות
            </Link>
            <Link 
              href="#faq" 
              className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors py-2 text-right"
              onClick={() => setIsMenuOpen(false)}
            >
              שאלות נפוצות
            </Link>
            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium py-2 flex items-center gap-2 justify-end"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FiUser className="w-4 h-4" />
                    לוח בקרה
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="btn-outline flex items-center gap-2 justify-center"
                  >
                    <FiLogOut className="w-4 h-4 transform scale-x-[-1]" />
                    התנתק
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="text-slate-700 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium py-2 text-right"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    התחבר
                  </Link>
                  <Link 
                    href="/signup" 
                    className="btn-primary text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    הרשמה חינם
                  </Link>
                </>
              )}
              
              {/* Theme Toggle in Mobile Menu */}
              <div className="flex items-center justify-between py-3 mt-2 border-t border-gray-100 dark:border-slate-800">
                <ThemeToggle />
                <span className="text-slate-700 dark:text-slate-300 font-medium">מצב כהה</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;

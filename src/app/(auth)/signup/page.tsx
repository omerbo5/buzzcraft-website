'use client';

import { useState } from 'react';
import { signUp } from '@/lib/actions/auth-actions';
import Link from 'next/link';
import Image from 'next/image';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useFormStatus } from 'react-dom';
import { redirect, useRouter } from 'next/navigation';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full py-3 rounded-md bg-blue-600 hover:bg-blue-700 transition-colors text-white font-medium text-center"
    >
      {pending ? 'Creating Account...' : 'Create account'}
    </button>
  );
}

export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState<Record<string, string[]>>({});
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const handleFormSubmit = async (formData: FormData) => {
    const result = await signUp(formData);
    
    if (result && !result.success && result.errors) {
      setFormErrors(result.errors);
    } else if (result && result.success) {
      // Redirect to login page after successful signup
      router.push('/login?registered=true');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Left column with image/branding */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="/images/auth-bg.jpg" 
            alt="Authentication background" 
            fill 
            className="object-cover object-center opacity-30"
            priority
            unoptimized
          />
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="p-8">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.svg" alt="BuzzCraft Logo" width={32} height={32} />
              <span className="text-xl font-bold tracking-tight">BuzzCraft</span>
            </Link>
          </div>
          
          <div className="flex-grow flex flex-col justify-center p-12">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-6">
                Capturing Moments,<br />Creating Memories
              </h2>
              <div className="flex gap-2 mt-8">
                <span className="block w-3 h-3 rounded-full bg-white/50"></span>
                <span className="block w-3 h-3 rounded-full bg-white/50"></span>
                <span className="block w-3 h-3 rounded-full bg-white"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right column with signup form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-12">
        <div className="md:hidden mb-8">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image src="/logo-dark.svg" alt="BuzzCraft Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight">BuzzCraft</span>
          </Link>
        </div>
        
        <div className="max-w-md w-full mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-slate-900 dark:text-white">
            Create an account
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-8">
            Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">Log in</Link>
          </p>
          
          <form action={handleFormSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="First name"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.firstName[0]}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Last name"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.lastName[0]}</p>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm mt-1">{formErrors.email[0]}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-2 pr-12 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Enter your password"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {formErrors.password && (
                <p className="text-red-500 text-sm mt-1">{formErrors.password[0]}</p>
              )}
            </div>
            
            <div className="flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="termsAccepted" className="text-slate-600 dark:text-slate-400">
                  I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</Link>
                </label>
                {formErrors.termsAccepted && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.termsAccepted[0]}</p>
                )}
              </div>
            </div>
            
            <SubmitButton />
          </form>
          
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-slate-50 dark:bg-slate-900 px-4 text-slate-600 dark:text-slate-400">
                  Or register with
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <button 
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.1711 8.36788H17.5V8.33329H10V11.6666H14.6906C14.0576 13.6059 12.1841 15.0001 10 15.0001C7.23858 15.0001 5 12.7615 5 10.0001C5 7.23868 7.23858 5.00011 10 5.00011C11.2558 5.00011 12.4088 5.48085 13.2841 6.26618L15.5711 3.9792C14.1425 2.63298 12.171 1.66676 10 1.66676C5.39917 1.66676 1.66667 5.39927 1.66667 10.0001C1.66667 14.6009 5.39917 18.3334 10 18.3334C14.6008 18.3334 18.3333 14.6009 18.3333 10.0001C18.3333 9.44038 18.2756 8.89371 18.1711 8.36788Z" fill="#FFC107"></path>
                  <path d="M2.62708 6.12109L5.36583 8.12943C6.10508 6.29526 7.90058 5.00018 10 5.00018C11.2558 5.00018 12.4088 5.48093 13.2841 6.26626L15.5711 3.97926C14.1425 2.63305 12.171 1.66682 10 1.66682C6.84917 1.66682 4.12 3.48768 2.62708 6.12109Z" fill="#FF3D00"></path>
                  <path d="M10 18.3333C12.1275 18.3333 14.0575 17.3966 15.48 16.0966L12.9683 13.9875C12.0966 14.6358 11.0316 15 10 15C7.82833 15 5.96166 13.6183 5.32080 11.6933L2.66583 13.6825C4.14083 16.3725 6.84917 18.3333 10 18.3333Z" fill="#4CAF50"></path>
                  <path d="M18.1712 8.36771H17.5V8.33312H10V11.6665H14.6906C14.3906 12.5916 13.8146 13.3916 13.0481 13.9865L13.049 13.986L15.5606 16.095C15.4156 16.2292 18.3333 14.166 18.3333 9.99979C18.3333 9.44006 18.2756 8.89339 18.1712 8.36771Z" fill="#1976D2"></path>
                </svg>
                <span>Google</span>
              </button>
              
              <button 
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.3125 10.5C15.3125 8.15625 16.7188 6.0625 18.75 5C17.8125 3.5 16.3125 2.5 14.5938 2.46875C12.7812 2.34375 10.9062 3.59375 10.0625 3.59375C9.125 3.59375 7.46875 2.5 6.09375 2.5C3.9375 2.53125 1.5625 4.09375 0.65625 6.375C-1.25 10.9688 0.15625 17.8125 2.1875 21.5312C3.15625 23.3438 4.3125 25.3438 5.875 25.2812C7.375 25.2188 8.0625 24.3125 9.875 24.3125C11.6562 24.3125 12.3125 25.2812 13.9062 25.25C15.5312 25.2188 16.5625 23.4375 17.5312 21.625C18.3438 20.1562 18.9375 18.5938 19.2812 16.9688C16.7812 15.9062 15.3125 13.3125 15.3125 10.5Z" fill="currentColor"/>
                  <path d="M12.7813 1.125C13.2813 0.5 13.625 -0.28125 13.5312 -1.125C12.5938 -1.0625 11.5938 -0.5625 10.9375 0.0625C10.3125 0.65625 9.9375 1.4375 10 2.28125C11 2.28125 12.0625 1.84375 12.7813 1.125Z" fill="currentColor"/>
                </svg>
                <span>Apple</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

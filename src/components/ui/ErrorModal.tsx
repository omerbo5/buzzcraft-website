'use client';

import { useEffect, useRef } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

type ErrorModalProps = {
  title: string;
  message: string | React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function ErrorModal({ title, message, isOpen, onClose }: ErrorModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-4 max-h-[90vh] overflow-auto"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-red-600 dark:text-red-400 font-medium">
            <FiAlertCircle className="h-5 w-5 mr-2" />
            <h3 className="text-lg">{title}</h3>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {typeof message === 'string' ? (
            <div className="whitespace-pre-line">{message}</div>
          ) : (
            message
          )}
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}

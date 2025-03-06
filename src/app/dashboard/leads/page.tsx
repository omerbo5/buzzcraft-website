'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadsIndexPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the "all" leads page
    router.push('/dashboard/leads/all');
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );
}

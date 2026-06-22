'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorFollower from '@/components/CursorFollower';

const NeuralBackground = dynamic(() => import('@/components/NeuralBackground'), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NeuralBackground />
      <CursorFollower />
      <Navbar />
      <main className="relative z-10 min-h-screen">{children}</main>
      <Footer />
    </>
  );
}

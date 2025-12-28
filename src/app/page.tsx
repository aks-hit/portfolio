'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronDown,
  Mail,
  Phone,
  Linkedin,
  Github,
  Award,
  Code,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';
import FloatingCard from '@/components/FloatingCard';

const colorMap: Record<string, string> = {
  cyan: 'text-cyan-400',
  blue: 'text-blue-400',
  purple: 'text-purple-400',
  pink: 'text-pink-400',
};

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.25 },
    },
  };

  const itemVariants = {
    hidden: { y: 18, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 110 },
    },
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-dark-gradient" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6,182,212,0.15), transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* HERO SECTION */}
      <section className="min-h-screen relative px-4 pt-28 pb-16 flex flex-col">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto text-center relative z-10 flex flex-col gap-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold backdrop-blur-sm">
              <Sparkles className="w-4 h-4" />
              Oracle Certified Data Science & GenAI Professional
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold gradient-text leading-[1.15] pb-2"
          >
            Akshit Singh
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl md:text-4xl text-slate-300 font-semibold">
              AI Developer & Machine Learning Engineer
            </h2>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              Building intelligent systems that make a difference
            </p>
            <div className="flex items-center justify-center gap-2 text-cyan-400">
              <Award className="w-5 h-5" />
              <span className="font-semibold">
                GATE 2025 Qualified • AIR 5246 • Top 9%
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <MagneticButton>
              <a
                href="mailto:akshitsinghak@yahoo.com"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/projects"
                className="flex items-center gap-2 px-6 py-3 glass-effect rounded-lg font-semibold hover:border-cyan-500/50 transition-all"
              >
                <Code className="w-5 h-5" />
                View Projects
              </Link>
            </MagneticButton>
          </motion.div>

          {/* Contact Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 mt-2"
          >
            {[
              { icon: Mail, href: 'mailto:akshitsinghak@yahoo.com' },
              { icon: Phone, href: 'tel:+918787232180' },
              { icon: Linkedin, href: 'https://linkedin.com/in/akshit-singh-007' },
              { icon: Github, href: '#' },
            ].map((item, index) => (
              <MagneticButton key={index}>
                <div className="glass-effect rounded-full w-12 h-12 flex items-center justify-center hover:bg-cyan-500/20 transition-all">
                  <a
                    href={item.href}
                    className="flex items-center justify-center w-full h-full"
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      item.href.startsWith('http')
                        ? 'noopener noreferrer'
                        : undefined
                    }
                  >
                    <item.icon className="w-6 h-6 hover:text-cyan-400 transition-colors" />
                  </a>
                </div>
              </MagneticButton>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div variants={itemVariants} className="pt-4">
            <ChevronDown className="w-8 h-8 mx-auto text-cyan-400 animate-bounce" />
          </motion.div>
        </motion.div>

        {/* INTERACTIVE ACHIEVEMENT FLOATING CARD */}
        <FloatingCard
        delay={1}
        className="absolute bottom-32 right-10 hidden lg:block z-20"
        >
        <Link
            href="/about#achievements"
            className="p-4 glass-effect rounded-lg flex items-center justify-center hover:bg-purple-500/20 transition-all cursor-pointer"
            aria-label="View Achievements"
        >
            <Award className="w-8 h-8 text-purple-400" />
        </Link>
        </FloatingCard>

      </section>

      {/* Quick Stats */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Projects', value: '10+', color: 'cyan' },
              { label: 'CGPA', value: '8.68', color: 'blue' },
              { label: 'Certifications', value: '10+', color: 'purple' },
              { label: 'GATE Rank', value: '5246', color: 'pink' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-effect p-6 rounded-xl text-center card-hover"
              >
                <div
                  className={`text-4xl font-bold ${colorMap[stat.color]} mb-2`}
                >
                  {stat.value}
                </div>
                <div className="text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

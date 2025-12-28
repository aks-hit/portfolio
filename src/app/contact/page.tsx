// ============================================
// FILE: src/app/contact/page.tsx
// ============================================
'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, MapPin, Send } from 'lucide-react';
import Section from '@/components/Section';
import MagneticButton from '@/components/MagneticButton';

export default function Contact() {
  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'akshitsinghak@yahoo.com',
      href: 'mailto:akshitsinghak@yahoo.com',
      color: 'cyan'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91-8787232180',
      href: 'tel:+918787232180',
      color: 'blue'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'akshit-singh-007',
      href: 'https://linkedin.com/in/akshit-singh-007',
      color: 'purple'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Kolkata, India',
      href: '#',
      color: 'pink'
    }
  ];

  return (
    <div className="pt-20">
      <Section title="Get In Touch">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <p className="text-xl text-slate-300 mb-4">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <p className="text-lg text-slate-400">
              Feel free to reach out through any of the channels below!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.a
                key={index}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect p-6 rounded-xl card-hover group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 bg-${method.color}-500/10 rounded-lg group-hover:bg-${method.color}-500/20 transition-colors`}>
                    <method.icon className={`w-6 h-6 text-${method.color}-400`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">{method.label}</p>
                    <p className="text-slate-200 font-medium">{method.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <MagneticButton>
              <a
                href="mailto:akshitsinghak@yahoo.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                <Send className="w-5 h-5" />
                Send me an email
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}
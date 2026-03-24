import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useSearchParams } from 'react-router';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa6';
import { clsx } from 'clsx';

const contactCards = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'baselmohamed937@gmail.com',
    href: 'mailto:baselmohamed937@gmail.com',
    color: 'blue',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-200 dark:border-blue-800',
    iconBg: 'bg-blue-100 dark:bg-blue-900/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
    hover: 'hover:border-blue-400 dark:hover:border-blue-500',
    glow: 'hover:shadow-blue-100 dark:hover:shadow-blue-900/30',
  },
  {
    icon: FaPhone,
    label: 'Phone',
    value: '+20 100 733 7686',
    href: 'tel:+201007337686',
    color: 'purple',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
    border: 'border-purple-200 dark:border-purple-800',
    iconBg: 'bg-purple-100 dark:bg-purple-900/40',
    iconColor: 'text-purple-600 dark:text-purple-400',
    hover: 'hover:border-purple-400 dark:hover:border-purple-500',
    glow: 'hover:shadow-purple-100 dark:hover:shadow-purple-900/30',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Basel Mohamed',
    href: 'https://www.linkedin.com/in/basel-mohamed-94972a334',
    color: 'emerald',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-200 dark:border-emerald-800',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    hover: 'hover:border-emerald-400 dark:hover:border-emerald-500',
    glow: 'hover:shadow-emerald-100 dark:hover:shadow-emerald-900/30',
  },
];

export function Contact() {
  const { t, dir } = useLanguage();
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: serviceParam ? `Inquiry about ${serviceParam}` : '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    if (serviceParam) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about ${serviceParam}`
      }));
    }
  }, [serviceParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    // Build mailto link with form data
    const subject = encodeURIComponent(formData.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    );
    window.open(`mailto:baselmohamed937@gmail.com?subject=${subject}&body=${body}`, '_self');
    
    setStatus('sent');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          {/* STANDARDIZED TITLE */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            {t.contact.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">{t.contact.subtitle}</p>
        </motion.div>

        {/* 3 Centered Contact Cards */}
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6 max-w-4xl mx-auto">
          {contactCards.map((card, i) => {
            const Icon = card.icon;
            const content = (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (i + 1), duration: 0.5, type: 'tween', ease: 'easeOut' }}
                whileHover={{ y: -6, scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: 'transform' }}
                className={clsx(
                  'group flex flex-col items-center text-center p-8 rounded-2xl border w-full sm:w-98 h-52',
                  'shadow-md cursor-pointer',
                  card.bg,
                  card.border,
                  card.hover,
                  card.glow,
                  'hover:shadow-xl'
                )}
              >
                {/* Icon Circle */}
                <div className={clsx(
                  'w-16 h-16 rounded-full flex items-center justify-center mb-5',
                  'transition-transform duration-300 group-hover:scale-110',
                  card.iconBg
                )}>
                  <Icon size={28} className={card.iconColor} />
                </div>

                {/* Label */}
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
                  {card.label}
                </p>

                {/* Value - Forced LTR for numbers like +20 to render properly */}
                <p 
                  dir="ltr"
                  className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-relaxed w-full overflow-hidden text-ellipsis" 
                  style={{ wordBreak: 'break-word' }}
                >
                  {card.value}
                </p>
              </motion.div>
            );

            return card.href ? (
              <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto no-underline">
                {content}
              </a>
            ) : (
              <div key={card.label} className="w-full sm:w-auto">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
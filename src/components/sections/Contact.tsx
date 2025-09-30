'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { ContactForm } from '@/types';
import { useIntersectionObserver, useReducedMotion } from '@/lib/hooks';
import { useDebounce } from '@/lib/performance';
import { cn } from '@/lib/utils';
import { mobileFirst } from '@/lib/mobile-first-patterns';

// Memoized form validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

// Memoized SVG pattern component
const AirmailBorder = React.memo(() => (
  <>
    {/* Top border */}
    <div className="absolute top-0 left-0 right-0 h-5 opacity-95">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalStripesTop" patternUnits="userSpaceOnUse" width="180" height="180" patternTransform="rotate(45)">
            <rect x="35" width="55" height="180" fill="#9F440D"/>
            <rect x="75" width="55" height="180" fill="transparent"/>
            <rect x="125" width="55" height="180" fill="#344155"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripesTop)"/>
      </svg>
    </div>
    
    {/* Bottom border */}
    <div className="absolute bottom-0 left-0 right-0 h-5 opacity-95">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalStripesBottom" patternUnits="userSpaceOnUse" width="180" height="180" patternTransform="rotate(45)">
            <rect x="35" width="55" height="180" fill="#9F440D"/>
            <rect x="75" width="55" height="180" fill="transparent"/>
            <rect x="125" width="55" height="180" fill="#344155"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripesBottom)"/>
      </svg>
    </div>
    
    {/* Left border */}
    <div className="absolute top-0 bottom-0 left-0 w-5 opacity-95">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalStripesLeft" patternUnits="userSpaceOnUse" width="180" height="180" patternTransform="rotate(45)">
            <rect x="35" width="55" height="180" fill="#9F440D"/>
            <rect x="75" width="55" height="180" fill="transparent"/>
            <rect x="125" width="55" height="180" fill="#344155"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripesLeft)"/>
      </svg>
    </div>
    
    {/* Right border */}
    <div className="absolute top-0 bottom-0 right-0 w-5 opacity-95">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diagonalStripesRight" patternUnits="userSpaceOnUse" width="180" height="180" patternTransform="rotate(45)">
            <rect x="35" width="55" height="180" fill="#9F440D"/>
            <rect x="75" width="55" height="180" fill="transparent"/>
            <rect x="125" width="55" height="180" fill="#344155"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalStripesRight)"/>
      </svg>
    </div>
  </>
));

AirmailBorder.displayName = 'AirmailBorder';

// Memoized status message components
const SuccessMessage = React.memo(() => (
  <div className="bg-[#134956]/10 border border-[#134956]/30 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-[#134956] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      <p className="text-[#134956] font-medium">Thank you! Your message has been sent successfully.</p>
    </div>
  </div>
));

const ErrorMessage = React.memo(() => (
  <div className="bg-black/10 border border-black/30 rounded-lg p-4 mb-6">
    <div className="flex items-center">
      <svg className="w-5 h-5 text-black mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
      <p className="text-black font-medium">Something went wrong. Please try again.</p>
    </div>
  </div>
));

SuccessMessage.displayName = 'SuccessMessage';
ErrorMessage.displayName = 'ErrorMessage';

const Contact: React.FC = React.memo(() => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    tripType: 'Custom Trip'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [validationErrors, setValidationErrors] = useState<Partial<ContactForm>>({});
  const prefersReducedMotion = useReducedMotion();

  // Intersection observers for animations
  const { setRef: setHeaderRef, isInView: isHeaderVisible } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const { setRef: setFormRef, isInView: isFormVisible } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true
  });

  // Memoized trip options
  const tripOptions = useMemo(() => [
    'Custom Trip',
    'Group Trip',
    'Adventure Trip',
    'Cultural Trip',
    'Luxury Trip'
  ], []);

  // Debounced validation
  const debouncedValidation = useDebounce((...args: unknown[]) => {
    const fieldName = args[0] as keyof ContactForm;
    const value = args[1] as string;
    
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      
      switch (fieldName) {
        case 'email':
          if (value && !validateEmail(value)) {
            newErrors.email = 'Please enter a valid email address';
          } else {
            delete newErrors.email;
          }
          break;
        case 'phone':
          if (value && !validatePhone(value)) {
            newErrors.phone = 'Please enter a valid phone number';
          } else {
            delete newErrors.phone;
          }
          break;
        case 'name':
          if (value && value.length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
          } else {
            delete newErrors.name;
          }
          break;
        case 'message':
          if (value && value.length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
          } else {
            delete newErrors.message;
          }
          break;
        default:
          break;
      }
      
      return newErrors;
    });
  }, 300);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Trigger debounced validation
    if (value) {
      debouncedValidation(name as keyof ContactForm, value);
    }
  }, [debouncedValidation]);

  const validateForm = useCallback((): boolean => {
    const errors: Partial<ContactForm> = {};
    
    if (!formData.name || typeof formData.name !== 'string' || !formData.name.trim()) errors.name = 'Name is required';
    else if (formData.name.length < 2) errors.name = 'Name must be at least 2 characters';
    
    if (!formData.email || typeof formData.email !== 'string' || !formData.email.trim()) errors.email = 'Email is required';
    else if (!validateEmail(formData.email)) errors.email = 'Please enter a valid email address';
    
    if (!formData.phone || typeof formData.phone !== 'string' || !formData.phone.trim()) errors.phone = 'Phone is required';
    else if (!validatePhone(formData.phone)) errors.phone = 'Please enter a valid phone number';
    
    if (!formData.message || typeof formData.message !== 'string' || !formData.message.trim()) errors.message = 'Message is required';
    else if (formData.message.length < 10) errors.message = 'Message must be at least 10 characters';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        tripType: 'Custom Trip'
      });
      setValidationErrors({});
      setSubmitStatus('success');
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      // Auto-hide error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  }, [validateForm]);

  // Memoized animation classes
  const headerAnimationClass = useMemo(() => 
    `text-center mb-12 sm:mb-16 font-body transition-all duration-1000 ease-out ${
      isHeaderVisible && !prefersReducedMotion
        ? 'opacity-100 translate-y-0'
        : prefersReducedMotion
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
    }`,
    [isHeaderVisible, prefersReducedMotion]
  );

  const formAnimationClass = useMemo(() =>
    `max-w-7xl mx-auto transition-all duration-1000 ease-out ${
      isFormVisible && !prefersReducedMotion
        ? 'opacity-100 translate-y-0'
        : prefersReducedMotion
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
    }`,
    [isFormVisible, prefersReducedMotion]
  );

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={setHeaderRef} className={headerAnimationClass}>
          <h2 className={cn(
            "font-bold text-gray-900 mb-4 font-heading",
            mobileFirst.text('h1')
          )}>
            Let&apos;s Plan Something <span className='text-[#134956]'>Beautiful</span> Together
          </h2>
        </div>

        {/* Contact Form Card */}
        <div ref={setFormRef} className={formAnimationClass}>
          <div className="bg-white rounded-2xl lg:rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-shadow duration-500">
            {/* SVG Pattern Border - Airmail Style */}
            <div className="absolute inset-0 rounded-2xl lg:rounded-3xl">
              <AirmailBorder />
            </div>

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-0 lg:gap-8 items-center min-h-[600px]">
                {/* Left Side - Image */}
                <div className="relative flex items-center justify-center">
                  <div className="relative aspect-[4.5/5] w-full max-w-md mx-auto rounded-xl lg:rounded-2xl overflow-hidden">
                    <Image
                      src="/form.png"
                      alt="Beautiful Kashmir landscape"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Vertical Divider - Hidden on mobile */}
                <div className="hidden lg:block absolute left-1/2 top-20 bottom-20 w-px bg-[#134956]/20 transform -translate-x-1/2" />

                {/* Right Side - Form */}
                <div className="space-y-6 mt-6 lg:mt-0 font-body flex flex-col justify-center">
                  {/* Status Messages */}
                  {submitStatus === 'success' && <SuccessMessage />}
                  {submitStatus === 'error' && <ErrorMessage />}

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    {/* Name and Email Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="John Carter"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#134956] focus:border-[#134956] transition-colors placeholder-gray-400 ${
                            validationErrors.name ? 'border-red-500' : 'border-black'
                          }`}
                          required
                          aria-describedby={validationErrors.name ? 'name-error' : undefined}
                        />
                        {validationErrors.name && (
                          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                            {validationErrors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="example@email.com"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#134956] focus:border-[#134956] transition-colors placeholder-gray-400 ${
                            validationErrors.email ? 'border-red-500' : 'border-black'
                          }`}
                          required
                          aria-describedby={validationErrors.email ? 'email-error' : undefined}
                        />
                        {validationErrors.email && (
                          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                            {validationErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Phone and Category Row */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(123) 456 - 789"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#134956] focus:border-[#134956] transition-colors placeholder-gray-400 ${
                            validationErrors.phone ? 'border-red-500' : 'border-black'
                          }`}
                          required
                          aria-describedby={validationErrors.phone ? 'phone-error' : undefined}
                        />
                        {validationErrors.phone && (
                          <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                            {validationErrors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="tripType" className="block text-sm font-medium text-gray-700 mb-2">
                          Category
                        </label>
                        <select
                          id="tripType"
                          name="tripType"
                          value={formData.tripType}
                          onChange={handleInputChange}
                          className="text-gray-700 w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-[#134956] focus:border-[#134956] transition-colors bg-white"
                          required
                        >
                          {tripOptions.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please type your message here..."
                        rows={6}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#134956] focus:border-[#134956] transition-colors placeholder-gray-400 resize-none ${
                          validationErrors.message ? 'border-red-500' : 'border-black'
                        }`}
                        required
                        aria-describedby={validationErrors.message ? 'message-error' : undefined}
                      />
                      {validationErrors.message && (
                        <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
                          {validationErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting || Object.keys(validationErrors).length > 0}
                      className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 transform font-cta ${
                        isSubmitting || Object.keys(validationErrors).length > 0
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-[#134956] hover:bg-[#0f3d47] active:bg-[#0a2d35] shadow-lg hover:shadow-xl hover:shadow-[#134956]/30 hover:scale-105'
                      }`}
                      aria-describedby="submit-button-description"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        'Send message'
                      )}
                    </button>
                    <p id="submit-button-description" className="sr-only">
                      Submit the contact form to send your message
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useWeb3forms from '@web3forms/react';
import { Send, Mail, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

// Input field styling constants
const inputClasses = "w-full pl-12 pr-4 py-3 sm:py-3.5 border rounded-xl text-gray-900 placeholder-gray-500 outline-none transition-colors focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm sm:text-base";
const labelClasses = "block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2";

const ContactUsForm = ({
    closeModal
}) => {
    const [formStatus, setFormStatus] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, reset, formState: { isSubmitting, errors } } = useForm({
        mode: 'onTouched',
    });

    const apiKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    const { submit: onSubmit } = useWeb3forms({
        access_key: apiKey,
        settings: {
            from_name: 'Skillora',
            subject: 'New Contact Message from Skillora Design Academy Contact form',
        },
        onSuccess: (msg, data) => {
            setIsSuccess(true);
            setMessage('Thank you for your message! We will get back to you soon.');
            setFormStatus('success');
            reset();
            setTimeout(() => setFormStatus(''), 3000);
            if (closeModal) {
                setTimeout(() => closeModal(), 3000);
            }
        },
        onError: (msg, data) => {
            setIsSuccess(false);
            setMessage('Something went wrong. Please try again later.');
            setFormStatus('error');
            setTimeout(() => setFormStatus(''), 3000);
            if (closeModal) {
                setTimeout(() => closeModal(), 3000);
            }
        },
    });

    const handleFormSubmit = (data, e) => {
        e.preventDefault();
        setFormStatus('sending');
        onSubmit(data);
    };

    return (
        <motion.div
            className="bg-white rounded-2xl shadow-md w-full max-w-2xl mx-auto border border-gray-100 p-4 sm:p-6 md:p-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
        >
            <div className="text-center mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">Get in Touch</h2>
                <p className="text-xs md:text-sm text-gray-500 mt-2">We'd love to hear from you</p>
            </div>

            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label htmlFor="firstName" className={labelClasses}>
                            First Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                id="firstName"
                                placeholder="Enter your first name"
                                className={`${inputClasses} ${errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                                {...register('firstName', { required: 'First name is required' })}
                            />
                        </div>
                        {errors.firstName && (
                            <p className="text-red-600 text-xs md:text-sm mt-2 flex items-center">
                                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                {errors.firstName.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName" className={labelClasses}>
                            Last Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <User className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                required
                                id="lastName"
                                placeholder="Enter your last name"
                                className={`${inputClasses} ${errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                                {...register('lastName', { required: 'Last name is required' })}
                            />
                        </div>
                        {errors.lastName && (
                            <p className="text-red-600 text-xs md:text-sm mt-2 flex items-center">
                                <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                                {errors.lastName.message}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <label htmlFor="email" className={labelClasses}>
                        Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <Mail className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            required
                            id="email"
                            placeholder="your.email@example.com"
                            className={`${inputClasses} ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Please enter a valid email address',
                                },
                            })}
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-600 text-xs md:text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="phone" className={labelClasses}>
                        Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2">
                            <Phone className="w-5 h-5 text-gray-400" />
                        </div>
                        <input
                            type="tel"
                            required
                            id="phone"
                            placeholder="Enter 10-digit phone number"
                            className={`${inputClasses} ${errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Please enter a valid 10-digit phone number',
                                },
                            })}
                        />
                    </div>
                    {errors.phone && (
                        <p className="text-red-600 text-xs md:text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="message" className={labelClasses}>
                        Your Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute left-3 top-3 mt-1">
                            <MessageSquare className="w-5 h-5 text-gray-400" />
                        </div>
                        <textarea
                            required
                            id="message"
                            rows="4"
                            className={`${inputClasses} pt-2 min-h-[120px] ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                            placeholder="How can we help you? (Minimum 10 characters)"
                            {...register('message', {
                                required: 'Message is required',
                                minLength: {
                                    value: 10,
                                    message: 'Message must be at least 10 characters long',
                                },
                            })}
                        ></textarea>
                    </div>
                    {errors.message && (
                        <p className="text-red-600 text-xs md:text-sm mt-2 flex items-center">
                            <span className="w-1 h-1 bg-red-600 rounded-full mr-2"></span>
                            {errors.message.message}
                        </p>
                    )}
                </div>

                <div className="pt-1 sm:pt-2">
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileTap={{ scale: 0.98 }}
                        className="w-full bg-gradient-to-br from-orange-600 via-orange-500 to-blue-500 text-white font-bold py-3 px-6 rounded-xl hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"
                                />
                                Sending...
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5 mr-2" />
                                Send Message
                            </>
                        )}
                    </motion.button>

                    <AnimatePresence>
                        {formStatus && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                className={`mt-4 p-4 rounded-xl flex items-center ${isSuccess
                                    ? 'bg-green-50 border border-green-200 text-green-800'
                                    : 'bg-red-50 border border-red-200 text-red-800'
                                    }`}
                            >
                                {isSuccess ? (
                                    <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                ) : (
                                    <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                                )}
                                <span className="text-sm font-medium">
                                    {message}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </form>

        </motion.div>
    );
};

export default ContactUsForm;
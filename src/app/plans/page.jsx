'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlanPage() {
    // State to toggle between 'seeker' and 'recruiter'
    const [userType, setUserType] = useState('seeker');
    // State for managing FAQ accordions
    const [openFaq, setOpenFaq] = useState(null);

    // Data mapped directly from image_ef64a3.png and image_ef5da2.png structures
    const plansData = {
        seeker: [
            {
                name: 'Free',
                price: '0',
                period: '/forever',
                tagline: 'Start exploring your next career move:',
                features: [
                    'Browse & save up to 10 jobs',
                    'Apply to up to 3 jobs per month',
                    'Basic profile setup',
                    'Standard email alerts'
                ],
                icon: (
                    <svg className="w-5 h-5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                ),
                isFeatured: false,
            },
            {
                name: 'Pro',
                price: '19',
                period: '/month',
                tagline: 'Accelerate your daily job search hunt:',
                features: [
                    'Apply to up to 30 jobs per month',
                    'Unlimited saved jobs',
                    'Advanced application tracking',
                    'Premium salary insights'
                ],
                icon: (
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                    </svg>
                ),
                isFeatured: true, // Highlights white button match styling in image_ef5da2.png
            },
            {
                name: 'Premium',
                price: '39',
                period: '/month',
                tagline: 'Maximum visibility and elite access:',
                features: [
                    'Everything included in Pro tier',
                    'Unlimited position applications',
                    'Profile boost directly to recruiters',
                    'Early access to new jobs & priority support'
                ],
                icon: (
                    <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                ),
                isFeatured: false,
            }
        ],
        recruiter: [
            {
                name: 'Free',
                price: '0',
                period: '/forever',
                tagline: 'Great for a company\'s first year of hiring:',
                features: [
                    'Up to 3 active job postings',
                    'Basic applicant management pipeline',
                    'Standard listing visibility setup'
                ],
                icon: (
                    <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                ),
                isFeatured: false,
            },
            {
                name: 'Growth',
                price: '49',
                period: '/month',
                tagline: 'Scale your team hiring velocity:',
                features: [
                    'Up to 10 active job postings',
                    'Detailed applicant tracking system',
                    'Basic candidate analytics dashboard',
                    'Direct email support desk'
                ],
                icon: (
                    <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                ),
                isFeatured: true,
            },
            {
                name: 'Enterprise',
                price: '149',
                period: '/month',
                tagline: 'Full power sourcing suite for global teams:',
                features: [
                    'Up to 50 active job postings',
                    'Advanced analytics & talent dashboard',
                    'Featured job listings & custom branding',
                    'Multi-seat team collaboration & priority support'
                ],
                icon: (
                    <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                ),
                isFeatured: false,
            }
        ]
    };

    const faqData = [
        { q: 'Can I cancel my subscription anytime?', a: 'Yes, you can cancel your plan at any time through your billing settings. Your features will remain active until the end of your current cycle.' },
        { q: 'How do refunds work?', a: 'We offer a 14-day hassle-free refund policy if you are unsatisfied with our premium features, provided you have not exceeded your usage boundaries.' },
        { q: 'What payment methods do you accept?', a: 'We accept all major credit/debit cards including Visa, Mastercard, American Express, as well as digital options like Apple Pay and Google Pay.' },
        { q: 'Can I switch plans later?', a: 'Absolutely. You can upgrade or downgrade your tier level dynamically. Costs will automatically be prorated on your upcoming statement cycle.' }
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#09090b] text-[#fafafa] font-sans antialiased py-16 px-4">
            <div className="max-w-6xl mx-auto">

                {/* Header & Title Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
                        Simple, transparent pricing
                    </h1>
                    <p className="text-[#a1a1aa] max-w-xl mx-auto text-base">
                        Choose the right path forward. Scale options down or upgrade features instantly depending on your professional needs.
                    </p>
                </div>

                {/* Seeker / Recruiter Slider Selector Toggle */}
                <div className="flex justify-center mb-16">
                    <div className="relative bg-[#18181b] border border-[#27272a] p-1 rounded-xl flex w-72 shadow-inner">
                        <div
                            className={`absolute top-1 bottom-1 left-1 rounded-lg bg-[#27272a] shadow transition-all duration-300 ease-out`}
                            style={{
                                width: 'calc(50% - 4px)',
                                transform: userType === 'seeker' ? 'translateX(0%)' : 'translateX(100%)'
                            }}
                        />
                        <button
                            onClick={() => setUserType('seeker')}
                            className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${userType === 'seeker' ? 'text-white' : 'text-[#a1a1aa] hover:text-white'
                                }`}
                        >
                            For Job Seekers
                        </button>
                        <button
                            onClick={() => setUserType('recruiter')}
                            className={`relative z-10 w-1/2 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 ${userType === 'recruiter' ? 'text-white' : 'text-[#a1a1aa] hover:text-white'
                                }`}
                        >
                            For Recruiters
                        </button>
                    </div>
                </div>

                {/* Plan Pricing Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {plansData[userType].map((plan, idx) => (
                        <div
                            key={idx}
                            className="bg-[#121214] border border-[#1f1f23] rounded-2xl p-6 flex flex-col justify-between shadow-xl transition-all hover:border-[#2e2e33]"
                        >
                            <div>
                                {/* Card Head details */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-[#1a1a1e] border border-[#2d2d34] rounded-lg flex items-center justify-center">
                                            {plan.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white tracking-wide">{plan.name}</h3>
                                    </div>
                                    <div className="flex items-baseline text-white">
                                        <span className="text-3xl font-black">${plan.price}</span>
                                        <span className="text-[#71717a] text-xs font-medium ml-1">{plan.period}</span>
                                    </div>
                                </div>

                                {/* Dynamic Description */}
                                <p className="text-[#e4e4e7] text-sm font-medium mb-5">{plan.tagline}</p>

                                {/* Feature list rendering */}
                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-start gap-2.5 text-[#a1a1aa] text-sm leading-relaxed">
                                            <span className="flex-shrink-0 w-5 h-5 bg-[#18181b] border border-[#27272a] text-[#71717a] rounded flex items-center justify-center text-xs select-none">
                                                +
                                            </span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Standard / Highlighted Call To Action button */}

                            <form action="/api/checkout_sessions" method="POST">
                                <section>

                                    <button type="submit" role="link"
                                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all group ${plan.isFeatured
                                            ? 'bg-white text-black hover:bg-[#e4e4e7]'
                                            : 'bg-[#242427] text-white hover:bg-[#2e2e33] border border-[#2d2d34]'
                                            }`}
                                    >
                                        <span>Choose This Plan</span>
                                        <svg
                                            className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2.5}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </section>
                            </form>

                        </div>
                    ))}
                </div>

                {/* FAQ Accordion Section (image_ef64a3.png requirement) */}
                <div className="max-w-3xl mx-auto border-t border-[#1f1f23] pt-16">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-10 text-white">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqData.map((faq, index) => {
                            const isOpen = openFaq === index;
                            return (
                                <div
                                    key={index}
                                    className="border border-[#1f1f23] bg-[#121214] rounded-xl overflow-hidden transition-all duration-200"
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex justify-between items-center p-5 text-left text-white font-medium hover:bg-[#161619] transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <svg
                                            className={`w-5 h-5 text-[#71717a] transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-40 border-t border-[#1f1f23]' : 'max-h-0'
                                            }`}
                                    >
                                        <p className="p-5 text-sm text-[#a1a1aa] leading-relaxed bg-[#0e0e10]">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
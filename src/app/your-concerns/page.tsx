'use client';
import React from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { motion } from 'framer-motion';
import { 
    Wrench, 
    DollarSign, 
    Brush, 
    ClipboardList,
    MessageCircle,
    Shield,
    Trees,
    Building2,
    BarChart3,
    LucideIcon
} from 'lucide-react';

interface PollItem {
    question: string;
    percentage: number;
    icon: LucideIcon;
}

const pollData: PollItem[] = [
    { question: "Condition of common areas", percentage: 25.7, icon: Trees },
    { question: "Amenities quality and availability", percentage: 19.0, icon: Building2 },
    { question: "Current HOA fee structure", percentage: 13.7, icon: DollarSign },
    { question: "Community aesthetics/appearance", percentage: 12.5, icon: Brush },
    { question: "Future plans for the community", percentage: 10.5, icon: ClipboardList },
    { question: "Handling of resident concerns/complaints", percentage: 6.5, icon: MessageCircle },
    { question: "Enforcement of community rules", percentage: 5.5, icon: Shield },
    { question: "Communication from board & association", percentage: 3.7, icon: MessageCircle },
    { question: "Speed of maintenance responses", percentage: 2.7, icon: Wrench },
];

export default function YourConcernsPage() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>
                <PageHero 
                    title="What Issues Matter Most to Our Community?"
                    subtitle="266 residents participated in a survey, sharing their concerns and priorities."
                    imageSrc="/images/hoa-meeting.jpeg"
                    imageAlt="HOA Meeting Background"
                />

                {/* Main Content */}
                <div className='bg-gray-50'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
                        <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8'>My Assessment of Common Community Concerns</h2>
                                <p className='text-base sm:text-lg text-gray-600 mb-8'>
                                    Through my personal initiative, I conducted a comprehensive survey of 266 community members to understand their priorities and concerns. These results represent real feedback from our neighbors, collected through direct engagement and community outreach. This data has been instrumental in shaping my action plan to address our community's most pressing issues.
                                </p>

                                <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='bg-white rounded-xl p-6 shadow-sm'>
                                        <div className='flex items-center mb-4'>
                                            <Trees className='w-6 h-6 text-[#40BFB4] mr-3' />
                                            <h3 className='text-xl font-semibold text-[#0B3558]'>Common Areas & Amenities</h3>
                                        </div>
                                        <p className='text-gray-600 mb-3'>Our top community concern at 25.7% of responses, followed by amenities quality at 19%.</p>
                                        <ul className='text-sm text-gray-600 space-y-2'>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Regular maintenance schedule reviews</li>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Quality assessment of facilities</li>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Prioritized improvement plans</li>
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-lg shadow-lg p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <Building2 className="h-6 w-6 text-teal-500" />
                                            <h3 className="text-xl font-bold text-[#0B3558]">Amenities Quality</h3>
                                        </div>
                                        <p className="text-gray-600">Second highest at 19.0% of responses</p>
                                        <div className="mt-4">
                                            <h4 className="text-[#0B3558] font-semibold mb-2">Our Solution:</h4>
                                            <ul className="text-sm text-gray-600 space-y-2">
                                                <li className="flex items-center"><span className="text-teal-500 mr-2">•</span> Regular maintenance schedules</li>
                                                <li className="flex items-center"><span className="text-teal-500 mr-2">•</span> Quality upgrades planning</li>
                                                <li className="flex items-center"><span className="text-teal-500 mr-2">•</span> Resident feedback integration</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className='bg-white rounded-xl p-6 shadow-sm'>
                                        <div className='flex items-center mb-4'>
                                            <Brush className='w-6 h-6 text-[#40BFB4] mr-3' />
                                            <h3 className='text-xl font-semibold text-[#0B3558]'>Community Aesthetics</h3>
                                        </div>
                                        <p className='text-gray-600 mb-3'>12.5% of responses focused on community appearance and standards.</p>
                                        <ul className='text-sm text-gray-600 space-y-2'>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Enhanced landscaping programs</li>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Consistent maintenance standards</li>
                                            <li className='flex items-center'><span className='text-[#40BFB4] mr-2'>•</span> Property value protection</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Poll Results Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8 flex items-center'>
                                    <BarChart3 className='w-8 h-8 text-[#40BFB4] mr-3' />
                                    Complete Poll Results
                                </h2>
                                <div className='space-y-4'>
                                    {pollData.map((item, index) => {
                                        const IconComponent = item.icon;

                                        return (
                                            <div key={index} className='bg-white rounded-lg p-4 shadow-sm'>
                                                <div className='flex items-center mb-2'>
                                                    <IconComponent className='w-5 h-5 text-[#40BFB4] mr-2' />
                                                    <span className='text-[#0B3558] font-medium'>{item.question}</span>
                                                    <span className='ml-auto text-[#40BFB4] font-bold'>{item.percentage}%</span>
                                                </div>
                                                <motion.div 
                                                    className='h-2 bg-gray-100 rounded-full overflow-hidden'
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                >
                                                    <motion.div 
                                                        className='h-full bg-[#40BFB4] rounded-full'
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.percentage}%` }}
                                                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                                                    />
                                                </motion.div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Action Plan Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8 flex items-center'>
                                    <ClipboardList className='w-8 h-8 text-[#40BFB4] mr-3' />
                                    Action Plan
                                </h2>
                                <div className='bg-white rounded-xl p-6 shadow-sm'>
                                    <ul className='space-y-4 text-gray-600'>
                                        <li className='flex items-start'>
                                            <span className='text-[#40BFB4] mr-3'>1.</span>
                                            <span><strong>Immediate Assessment:</strong> Conduct a thorough review of common areas and amenities, with a focus on establishing a contingency fund and implementing cost-efficient maintenance schedules to address the top concerns of our community (44.7% combined).</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <span className='text-[#40BFB4] mr-3'>2.</span>
                                            <span><strong>Financial Transparency:</strong> Review and clarify HOA fee structure, provide detailed budget breakdowns, and implement a transparent process for disclosing all fees and expenses (13.7% of concerns).</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <span className='text-[#40BFB4] mr-3'>3.</span>
                                            <span><strong>Future Planning:</strong> Develop and communicate clear plans for community improvements, including setting aside funds for future needs and optimizing community event costs (10.5% of responses).</span>
                                        </li>
                                        <li className='flex items-start'>
                                            <span className='text-[#40BFB4] mr-3'>4.</span>
                                            <span><strong>Communication Enhancement:</strong> Implement better communication channels for maintenance requests and resident concerns, while ensuring regular updates on financial decisions and community improvements.</span>
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            {/* Contact Section */}
                            <section>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8'>Share Your Thoughts</h2>
                                <p className='text-base sm:text-lg text-gray-600 mb-8'>
                                    Your input is valuable to me. I want to hear about your concerns and ideas for improving our community.
                                </p>
                                <div className='bg-[#0B3558] text-white rounded-2xl p-6 sm:p-8 shadow-sm'>
                                    <h3 className='text-xl sm:text-2xl font-bold mb-4'>Contact Me</h3>
                                    <p className='mb-6'>
                                        Feel free to reach out with your thoughts, concerns, or suggestions. I'm here to listen and work together for our community's future.
                                    </p>
                                    <a
                                        href='mailto:derrick@example.com'
                                        className='inline-flex items-center rounded-full bg-[#40BFB4] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                                    >
                                        Send Message
                                    </a>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

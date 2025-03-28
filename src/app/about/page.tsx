import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Link from 'next/link';
import { Briefcase, GraduationCap, Home, Heart, Users, Star, Globe, Code, ChartBar, Building2, DollarSign, MessageSquare, Lightbulb } from 'lucide-react';
import { Metadata } from 'next';
import Button from '../components/Button';

const title = 'About Derrick Threatt | Candidate for GCP RAI Board';
const description = 'Learn about Derrick Threatt - a technology leader, community advocate, and candidate for the Grand Central Park Residential Association Inc. Board.';
const subtitle = 'A Technology Leader & Community Advocate';

// Use hardcoded URLs instead of the generateOgMetadata utility to avoid build issues
export const metadata: Metadata = {
    title,
    description,
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'RAI', 'Board Member', 'About', 'Biography', 'Leadership', 'Military Service'],
    openGraph: {
        title,
        description,
        images: [
            {
                url: 'https://gcphoatx.com/api/og?title=About%20Derrick%20Threatt&subtitle=A%20Technology%20Leader%20%26%20Community%20Advocate',
                width: 1200,
                height: 630,
                alt: title
            }
        ],
        siteName: 'Derrick Threatt for GCP RAI',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: ['https://gcphoatx.com/api/og?title=About%20Derrick%20Threatt&subtitle=A%20Technology%20Leader%20%26%20Community%20Advocate'],
        creator: '@derrickthreatt',
    }
};

export default function AboutPage() {
    return (
        <main className="flex-grow bg-gray-50">
            <Navbar />
            
            <PageHero 
                title="Who is Derrick&nbsp;Threatt?"
                subtitle="A Technology Leader & Community Advocate"
                imageSrc="/images/family.jpeg"
                imageAlt="Derrick Threatt with Family"
                objectPosition="top -50px"
            />

            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
                {/* Introduction */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Introduction</h2>
                    <div className='prose prose-lg mx-auto'>
                        <p className='text-gray-600 leading-relaxed'>
                            With over two decades of experience in leadership roles across technology and operations, I bring a unique blend of strategic thinking and practical problem-solving to our community. As a resident of Grand Central Park since 2021, I've been actively involved in community initiatives and am passionate about leveraging my expertise to enhance our neighborhood's future.
                        </p>
                    </div>
                </div>

                {/* Community Impact */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>My Personal Community Impact</h2>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-start gap-4'>
                                <Users className='flex-shrink-0 w-8 h-8 text-[#0B3558]' />
                                <div>
                                    <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Management Improvements</h3>
                                    <p className='text-gray-600'>Advocated for and achieved significant changes in the management teams, driving improvements in how technology is utilized for community management.</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-start gap-4'>
                                <Globe className='flex-shrink-0 w-8 h-8 text-[#0B3558]' />
                                <div>
                                    <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Hurricane Response</h3>
                                    <p className='text-gray-600'>During Hurricane Berly, coordinated aerial operations to assess storm damage and personally reported all damage accounts to various agencies, helping expedite community recovery.</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-start gap-4'>
                                <Heart className='flex-shrink-0 w-8 h-8 text-[#0B3558]' />
                                <div>
                                    <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Crisis Support</h3>
                                    <p className='text-gray-600'>Assisted over 13 households with internet connectivity and generator-related issues during the week-long power outage, ensuring residents stayed connected during the crisis.</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-start gap-4'>
                                <MessageSquare className='flex-shrink-0 w-8 h-8 text-[#0B3558]' />
                                <div>
                                    <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Ongoing Support</h3>
                                    <p className='text-gray-600'>Provide ongoing volunteer technical assistance to elderly neighbors, helping them stay connected and comfortable with modern technology.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Experience */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Professional Leadership</h2>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-center mb-4'>
                                <Building2 className='w-8 h-8 text-[#40BFB4] mr-3' />
                                <h3 className='text-lg font-semibold text-[#0B3558]'>Director of Marketing Operations</h3>
                            </div>
                            <p className='text-gray-600'>Leading strategic operations and data-driven decision making at a Fortune 500 company.</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='flex items-center mb-4'>
                                <Users className='w-8 h-8 text-[#40BFB4] mr-3' />
                                <h3 className='text-lg font-semibold text-[#0B3558]'>20+ Years Leadership Experience</h3>
                            </div>
                            <p className='text-gray-600'>Proven track record of building and leading high-performing teams across multiple industries.</p>
                        </div>
                    </div>
                </div>

                {/* Skills & Expertise */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Skills & Expertise</h2>
                    <div className='grid gap-6 md:grid-cols-3'>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <Code className='w-8 h-8 text-[#40BFB4] mb-4' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Technical Expertise</h3>
                            <p className='text-gray-600'>Advanced data analysis and project management skills</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <Globe className='w-8 h-8 text-[#40BFB4] mb-4' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Multilingual</h3>
                            <p className='text-gray-600'>Fluent in English, Portuguese, and Spanish</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <Users className='w-8 h-8 text-[#40BFB4] mb-4' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Team Leadership</h3>
                            <p className='text-gray-600'>Experience managing diverse, cross-functional teams</p>
                        </div>
                    </div>
                </div>

                {/* Military Service */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Military Service</h2>
                    <div className='grid gap-6 md:grid-cols-2'>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <div className='relative w-full h-[400px]'>
                                <Image
                                    src="/images/veteran.jpg"
                                    alt="Derrick Threatt Military Service"
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className='object-cover rounded-lg'
                                    priority
                                />
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm h-full flex flex-col justify-center'>
                            <div className='flex items-center gap-6 mb-6'>
                                <Image
                                    src="/images/seal.png"
                                    alt="United States Air Force Seal"
                                    width={120}
                                    height={120}
                                    sizes="(max-width: 768px) 100px, 120px"
                                    className='flex-shrink-0'
                                />
                                <h3 className='text-3xl font-semibold text-[#0B3558]'>United States Air Force</h3>
                            </div>
                            <ul className='list-disc pl-6 space-y-3 text-gray-600 text-[21px] leading-[32px]'>
                                <li>Crew Chief & Electronics Warfare Officer</li>
                                <li>B-1B/B-52G Bomber</li>
                                <li>Stationed at Lowery, Sheppard and Mather AFB</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Community Values */}
                <div className='mb-16'>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Community Values</h2>
                    <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                        <div className='bg-white rounded-xl p-8 shadow-sm text-center'>
                            <Star className='w-8 h-8 text-[#40BFB4] mb-4 mx-auto' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Data-Driven Decisions</h3>
                            <p className='text-gray-600'>Making informed choices based on facts and analysis</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm text-center'>
                            <DollarSign className='w-8 h-8 text-[#40BFB4] mb-4 mx-auto' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Fiscal Responsibility</h3>
                            <p className='text-gray-600'>Ensuring efficient use of community resources</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm text-center'>
                            <MessageSquare className='w-8 h-8 text-[#40BFB4] mb-4 mx-auto' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Transparent Communication</h3>
                            <p className='text-gray-600'>Open dialogue with all community members</p>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm text-center'>
                            <Lightbulb className='w-8 h-8 text-[#40BFB4] mb-4 mx-auto' />
                            <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Innovation Focus</h3>
                            <p className='text-gray-600'>Finding creative solutions to community challenges</p>
                        </div>
                    </div>
                </div>

                {/* CTA Section - Orange Background */}
                <div className='mb-16 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#E85C41] py-12'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='md:flex items-center justify-between'>
                            <div className='md:w-1/2 mb-8 md:mb-0 md:pr-8'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-white mb-4'>Have Questions or Want to Show Support?</h2>
                                <p className='text-white/90 text-lg mb-0'>
                                    Learn more about my campaign or add your name to the growing list of community members who support my vision for Grand Central Park.
                                </p>
                            </div>
                            <div className='md:w-1/2 flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4'>
                                <Button 
                                    href='/faqs' 
                                    variant="outline"
                                    size="large"
                                    className='w-full sm:w-auto'
                                >
                                    View FAQs
                                </Button>
                                <Button 
                                    href='/endorse-derrick-for-gcphoa' 
                                    variant="secondary"
                                    size="large"
                                    className='w-full sm:w-auto'
                                >
                                    Endorse My Campaign
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div>
                    <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Let's Connect</h2>
                    <div className='bg-white rounded-xl p-8 shadow-sm text-center'>
                        <div className='prose prose-lg'>
                            <p className='text-gray-600 max-w-3xl mx-auto mb-6'>
                                I'm always eager to hear from our community members and discuss how we can work together to improve Grand Central Park.
                            </p>
                            <div className='flex flex-wrap justify-center gap-4'>
                                <Button 
                                    href='tel:+19362515911'
                                    variant="primary"
                                    size="large"
                                >
                                    Call: +1 936 251 5911
                                </Button>
                                <Button 
                                    href='/request'
                                    variant="secondary"
                                    size="large"
                                >
                                    Contact Me
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

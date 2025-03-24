import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { Leaf, Shield, Home, Users, Target, Clock, Building, DollarSign } from 'lucide-react';

export default function VisionPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />
            
            <PageHero 
                title="My Vision for Grand Central Park"
                subtitle="Preserving Our Natural Haven While Building a Close-knit Community & Preserving Home Equity"
                imageSrc="/images/lakehouse.jpeg"
                imageAlt="Grand Central Park Lakehouse"
                objectPosition="center 50%"
            />

            {/* Main Content */}
            <div className='bg-gray-50'>
                <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
                    {/* Introduction */}
                    <div className='mb-16'>
                        <div className='prose prose-lg mx-auto'>
                            <p className='text-gray-600 leading-normal'>
                                When I first chose Grand Central Park as my home, I was drawn to its unique balance – a safe neighborhood nestled against natural wilderness, yet conveniently close to urban amenities. I valued the promise of great schools, low taxes, and peaceful living for my family. Today, I still cherish these foundational elements, along with our quick access to I-45, proximity to The Woodlands, nearby healthcare facilities, and most importantly, our respectful neighbors who maintain our clean, quiet surroundings.
                            </p>
                        </div>
                    </div>

                    {/* Who We Are Section */}
                    <div className='mb-16'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Who We Are</h2>
                        <div className='prose prose-lg'>
                            <p className='text-gray-600 leading-normal'>
                                Grand Central Park stands apart with its upscale, modern character. Our community honors its heritage as a former Boy Scout camp while embracing thoughtful development. This blend of history and progress creates our distinctive identity – a secluded sanctuary that's still connected to everything we need.
                            </p>
                        </div>
                    </div>

                    {/* Challenges Section */}
                    <div className='mb-16'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Challenges We Must Address</h2>
                        <div className='grid gap-6 md:grid-cols-3'>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <div className='flex items-center mb-4'>
                                    <Building className='w-6 h-6 text-[#40BFB4] mr-3' />
                                    <h3 className='text-xl font-semibold text-[#0B3558]'>Balanced Growth Management</h3>
                                </div>
                                <p className='text-gray-600'>
                                    The expansion of our community with more homes than initially promised requires thoughtful oversight to maintain the character and quality that attracted us here.
                                </p>
                            </div>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <div className='flex items-center mb-4'>
                                    <DollarSign className='w-6 h-6 text-[#40BFB4] mr-3' />
                                    <h3 className='text-xl font-semibold text-[#0B3558]'>Tax Vigilance</h3>
                                </div>
                                <p className='text-gray-600'>
                                    Increasing MCAD and MUD taxes demand our attention and strategic planning to protect homeowners.
                                </p>
                            </div>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <div className='flex items-center mb-4'>
                                    <Leaf className='w-6 h-6 text-[#40BFB4] mr-3' />
                                    <h3 className='text-xl font-semibold text-[#0B3558]'>Environmental Preservation</h3>
                                </div>
                                <p className='text-gray-600'>
                                    The excessive clear-cutting beyond what was originally presented threatens the natural beauty that makes our community special.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Community Needs Section */}
                    <div className='mb-16'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Prioritizing Community Needs</h2>
                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <Home className='w-8 h-8 text-[#40BFB4] mb-4' />
                                <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Second Pool</h3>
                                <p className='text-gray-600'>To accommodate our growing community</p>
                            </div>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <Shield className='w-8 h-8 text-[#40BFB4] mb-4' />
                                <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Enhanced Security</h3>
                                <p className='text-gray-600'>Including patrols, trail cameras, and community surveillance</p>
                            </div>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <Target className='w-8 h-8 text-[#40BFB4] mb-4' />
                                <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Modern Access</h3>
                                <p className='text-gray-600'>Modernized electronic access to gated areas</p>
                            </div>
                            <div className='bg-white rounded-xl p-8 shadow-sm'>
                                <Users className='w-8 h-8 text-[#40BFB4] mb-4' />
                                <h3 className='text-lg font-semibold text-[#0B3558] mb-2'>Strict Enforcement</h3>
                                <p className='text-gray-600'>Against amenity vandalism</p>
                            </div>
                        </div>
                    </div>

                    {/* Building Connections Section */}
                    <div className='mb-16'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Building Stronger Connections</h2>
                        <div className='prose prose-lg'>
                            <p className='text-gray-600 mb-6'>
                                Our community thrives when neighbors know neighbors. I believe in strengthening our bonds by:
                            </p>
                            <ul className='list-disc pl-6 space-y-3 text-gray-600'>
                                <li>Recruiting and supporting an exceptional lifestyle director who can create meaningful engagement opportunities</li>
                                <li>Promoting our online communities to ensure all residents know how to stay connected</li>
                                <li>Revitalizing our community events to recapture the vibrant social atmosphere we once enjoyed</li>
                            </ul>
                            <p className='text-gray-600 mt-6'>
                                I remember attending nearly every community event when I first moved here. The decline in participation over the past two years signals a need for renewed focus on quality programming that brings us together.
                            </p>
                        </div>
                    </div>

                    {/* Governance & Financial Sections */}
                    <div className='grid gap-8 md:grid-cols-2 mb-16'>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-6'>Responsive Governance</h2>
                            <div className='prose prose-lg'>
                                <p className='text-gray-600'>
                                    Too often, residents feel their concerns go unheard when calls and emails remain unanswered for days or weeks. My commitment is to ensure our HOA is responsive and accountable. Every homeowner deserves acknowledgment and thoughtful consideration of their concerns – usually within 24 hours, not days or weeks.
                                </p>
                            </div>
                        </div>
                        <div className='bg-white rounded-xl p-8 shadow-sm'>
                            <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-6'>Financial Stewardship</h2>
                            <div className='prose prose-lg'>
                                <ul className='list-disc pl-6 space-y-3 text-gray-600'>
                                    <li>Addressing the urgent issues facing our townhome HOA</li>
                                    <li>Exploring tiered assessment structures that reflect our diverse property values (ranging from $300K to $1M)</li>
                                    <li>Ensuring our budget reflects the actual needs and priorities of residents</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Five-Year Vision Section */}
                    <div className='mb-16'>
                        <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-8'>Looking Forward: My Five-Year Vision</h2>
                        <div className='prose prose-lg'>
                            <p className='text-gray-600 mb-6'>A successful term on the HOA board would be defined by:</p>
                            <ul className='list-disc pl-6 space-y-3 text-gray-600 mb-8'>
                                <li>Establishing mutually beneficial relationships between residential and commercial properties, recognizing that residents support local businesses</li>
                                <li>Creating a more transparent, interactive community website that bridges residents and commercial enterprises</li>
                                <li>Keeping residents informed about commercial developments and creating opportunities for resident-owned businesses</li>
                                <li>Preserving the natural beauty that makes Grand Central Park special while accommodating thoughtful growth</li>
                            </ul>
                            <div className='bg-white p-8 rounded-xl shadow-sm border border-gray-100'>
                                <p className='text-gray-700 font-medium'>
                                    I believe Grand Central Park can be a community where the natural environment is protected, where neighbors know and support each other, where our amenities exceed expectations, and where every resident feels heard and valued. With responsive leadership and strategic planning, we can address our challenges while enhancing what makes this community extraordinary.
                                </p>
                                <p className='text-gray-700 font-medium mt-4'>
                                    I'm committed to being your voice on the HOA board – preserving what we love about Grand Central Park while guiding us toward an even brighter future.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

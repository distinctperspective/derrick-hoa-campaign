import Image from 'next/image';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import { 
    DollarSign, 
    Users, 
    Building2, 
    Wallet, 
    Droplet, 
    Warehouse, 
    CheckCircle, 
    AlertTriangle, 
    BarChart3,
    ClipboardList 
} from 'lucide-react';
import { Metadata } from 'next';

const title = 'Financial Analysis | Derrick Threatt for GCP RAI';
const description = 'Review Derrick Threatt\'s analysis of Grand Central Park RAI\'s financial health, budget breakdown, and financial management strategies.';
const subtitle = 'Review our financial health, budget breakdown, and management strategies';

// Use hardcoded URLs instead of the generateOgMetadata utility to avoid build issues
export const metadata: Metadata = {
    title,
    description,
    keywords: ['Derrick Threatt', 'Grand Central Park', 'GCP', 'HOA', 'Financials', 'Budget', 'HOA Dues', 'Financial Management'],
    // Removed openGraph and twitter metadata to avoid URL construction issues during build
};

export const dynamic = 'force-static';

export default function FinancialsPage() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-grow'>
                <PageHero 
                    title="What is the health of the Grand Central Park RAIs financials?"
                    imageSrc="/images/accounting.jpg"
                    imageAlt="Financial Background"
                >
                    <div className='mt-6 sm:mt-8'>
                        <a
                            href='https://www.gcprai.com/document-library/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center rounded-full bg-[#40BFB4] px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide'
                        >
                            View Financial Documents
                        </a>
                    </div>
                </PageHero>

                {/* Financial Analysis Content */}
                <div className='bg-gray-50'>
                    <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20'>
                        <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
                            <p className='text-base sm:text-lg text-gray-600 mb-8 sm:mb-12'>
                                As a candidate for our HOA board, I've taken the time to thoroughly review our association's 2025 budget. I believe transparent financial management is crucial to our community's success, and I want to share my analysis with you so we can make informed decisions together.
                            </p>

                            {/* Revenue Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8'>Where Our Money Comes From</h2>
                                <p className='mb-4'>Our association expects to collect approximately $3.59 million in 2025. Here's the breakdown of our major revenue sources:</p>
                                
                                <div className='grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='bg-white rounded-xl p-4 sm:p-6 shadow-sm'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                            <DollarSign className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                            <h3 className='text-lg sm:text-xl font-semibold text-[#0B3558]'>Association Dues</h3>
                                        </div>
                                        <p className='text-xl sm:text-2xl font-bold text-[#40BFB4] mb-2'>$1,760,560</p>
                                        <p className='text-sm sm:text-base text-gray-600'>49% of total income</p>
                                        <ul className='mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600'>
                                            <li>• $146,713 per month average</li>
                                            <li>• Our financial foundation</li>
                                        </ul>
                                    </div>

                                    <div className='bg-white rounded-xl p-4 sm:p-6 shadow-sm'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                            <Users className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                            <h3 className='text-lg sm:text-xl font-semibold text-[#0B3558]'>Shared Cost Reimbursement</h3>
                                        </div>
                                        <p className='text-xl sm:text-2xl font-bold text-[#40BFB4] mb-2'>$528,708</p>
                                        <p className='text-sm sm:text-base text-gray-600'>15% of total income</p>
                                        <p className='mt-3 sm:mt-4 text-sm sm:text-base text-gray-600'>Costs shared with other entities/partners</p>
                                    </div>

                                    <div className='bg-white rounded-xl p-4 sm:p-6 shadow-sm'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                            <Building2 className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                            <h3 className='text-lg sm:text-xl font-semibold text-[#0B3558]'>Capitalization Fee</h3>
                                        </div>
                                        <p className='text-xl sm:text-2xl font-bold text-[#40BFB4] mb-2'>$479,080</p>
                                        <p className='text-sm sm:text-base text-gray-600'>13% of total income</p>
                                        <ul className='mt-3 sm:mt-4 space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600'>
                                            <li>• Collected during property transfers</li>
                                            <li>• Peaks in July and December</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Expenses Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8'>Where Our Money Goes</h2>
                                <p className='mb-4 sm:mb-8'>The association plans to spend approximately $2.98 million on operations in 2025:</p>

                                <div className='space-y-6 sm:space-y-8'>
                                    <div className='bg-white rounded-xl p-4 sm:p-8 shadow-sm'>
                                        <h3 className='text-xl sm:text-2xl font-bold text-[#0B3558] mb-4'>Major Operational Expenses</h3>
                                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                            <div>
                                                <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                                    <Warehouse className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                                    <h4 className='text-base sm:text-lg font-semibold'>Landscaping</h4>
                                                </div>
                                                <p className='text-lg sm:text-xl font-bold text-[#40BFB4] mb-2'>$979,195</p>
                                                <p className='text-sm sm:text-base text-gray-600'>33% of expenses</p>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                                    <Droplet className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                                    <h4 className='text-base sm:text-lg font-semibold'>Water</h4>
                                                </div>
                                                <p className='text-lg sm:text-xl font-bold text-[#40BFB4] mb-2'>$456,000</p>
                                                <p className='text-sm sm:text-base text-gray-600'>15% of expenses</p>
                                            </div>
                                            <div>
                                                <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                                    <Wallet className='w-5 h-5 sm:w-6 sm:h-6 text-[#40BFB4]' />
                                                    <h4 className='text-base sm:text-lg font-semibold'>Onsite Services</h4>
                                                </div>
                                                <p className='text-lg sm:text-xl font-bold text-[#40BFB4] mb-2'>$418,680</p>
                                                <p className='text-sm sm:text-base text-gray-600'>14% of expenses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Financial Health Assessment */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='text-2xl sm:text-3xl font-bold text-[#0B3558] mb-4 sm:mb-8'>Financial Health Assessment</h2>
                                
                                <div className='grid gap-4 sm:gap-8 md:grid-cols-2'>
                                    <div className='bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-green-500'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                            <CheckCircle className='w-5 h-5 sm:w-6 sm:h-6 text-green-500' />
                                            <h3 className='text-lg sm:text-xl font-semibold text-[#0B3558]'>What We're Doing Well</h3>
                                        </div>
                                        <ul className='space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600'>
                                            <li>• Balanced Budget: Operating income covers planned expenses</li>
                                            <li>• Reserve Planning: $303,996 transfer to reserves in 2025</li>
                                            <li>• Diversified Revenue Sources</li>
                                            <li>• Strong Seasonal Planning</li>
                                        </ul>
                                    </div>

                                    <div className='bg-white rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-orange-500'>
                                        <div className='flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4'>
                                            <AlertTriangle className='w-5 h-5 sm:w-6 sm:h-6 text-orange-500' />
                                            <h3 className='text-lg sm:text-xl font-semibold text-[#0B3558]'>Areas for Improvement</h3>
                                        </div>
                                        <ul className='space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-600'>
                                            <li>• Thin Operating Margin</li>
                                            <li>• Water Expense Optimization Needed</li>
                                            <li>• Landscape Contract Review</li>
                                            <li>• Foundation Budget Management</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* My Commitment Section */}
                            <section className='bg-[#0B3558] text-white rounded-2xl p-4 sm:p-8 mb-12 sm:mb-16 shadow-sm'>
                                <h2 className='text-2xl sm:text-3xl font-bold mb-4 sm:mb-8'>My HOA Financial Commitments If Elected</h2>
                                <ul className='space-y-3 sm:space-y-4 text-sm sm:text-base'>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Push for a Contingency Fund if one does not exist
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Review Major Contracts for Cost Efficiency
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Improve Financial Transparency by disclosing all fees and expenses in more detail
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Optimize Community Events by streamlining processes and reducing costs
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Plan for Long-Term Sustainability by setting aside funds for future needs
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='text-[#40BFB4] mr-3 sm:mr-4'>•</span>
                                        Implement a transparent budgeting process
                                    </li>
                                </ul>
                            </section>

                            <p className='text-base sm:text-lg text-gray-600'>
                                I believe our association is generally well-managed financially, but there are opportunities to strengthen our position. I welcome your questions and feedback on this analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

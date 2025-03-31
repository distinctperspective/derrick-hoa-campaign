import { Metadata } from 'next';
import Image from 'next/image';

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PageHero from '../components/PageHero';
import {
    AlertTriangle,
    BarChart3,
    Building2,
    CheckCircle,
    ClipboardList,
    DollarSign,
    Droplet,
    Users,
    Wallet,
    Warehouse
} from 'lucide-react';

const title = 'Financial Analysis | Derrick Threatt for GCP RAI';
const description =
    "Review Derrick Threatt's analysis of Grand Central Park RAI's financial health, budget breakdown, and financial management strategies.";
const subtitle = 'Review our financial health, budget breakdown, and management strategies';

// Use hardcoded URLs instead of the generateOgMetadata utility to avoid build issues
export const metadata: Metadata = {
    title,
    description,
    keywords: [
        'Derrick Threatt',
        'Grand Central Park',
        'GCP',
        'HOA',
        'Financials',
        'Budget',
        'HOA Dues',
        'Financial Management'
    ]
    // Removed openGraph and twitter metadata to avoid URL construction issues during build
};

export const dynamic = 'force-static';

export default function FinancialsPage() {
    return (
        <div className='flex min-h-screen flex-col'>
            <Navbar />
            <main className='flex-grow'>
                <PageHero
                    title='What is the health of the Grand Central Park RAIs financials?'
                    imageSrc='/images/accounting.jpg'
                    imageAlt='Financial Background'>
                    <div className='mt-6 sm:mt-8'>
                        <a
                            href='https://www.gcprai.com/document-library/'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-flex items-center rounded-full bg-[#40BFB4] px-4 py-2.5 text-sm font-extrabold tracking-wide text-white uppercase transition-colors hover:bg-[#40BFB4]/90 sm:px-6 sm:py-3 sm:text-base'>
                            View Financial Documents
                        </a>
                    </div>
                </PageHero>

                {/* Financial Analysis Content */}
                <div className='bg-gray-50'>
                    <div className='mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8'>
                        <div className='prose prose-sm sm:prose-base lg:prose-lg max-w-none'>
                            <p className='mb-8 text-base text-gray-600 sm:mb-12 sm:text-lg'>
                                As a candidate for our HOA board, I've taken the time to thoroughly review our
                                association's 2025 budget. I believe transparent financial management is crucial to our
                                community's success, and I want to share my analysis with you so we can make informed
                                decisions together.
                            </p>

                            {/* Revenue Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='mb-4 text-2xl font-bold text-[#0B3558] sm:text-3xl'>
                                    Where Our Money Comes From
                                </h2>
                                <p className='mb-4 text-gray-600'>
                                    Our association expects to collect approximately $3.59 million in 2025. Here's the
                                    breakdown of our major revenue sources:
                                </p>

                                <div className='grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                    <div className='rounded-xl bg-white p-4 shadow-sm sm:p-6'>
                                        <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                            <DollarSign className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                            <h3 className='text-lg font-semibold text-[#0B3558] sm:text-xl'>
                                                Association Dues
                                            </h3>
                                        </div>
                                        <p className='mb-2 text-xl font-bold text-[#40BFB4] sm:text-2xl'>$1,760,560</p>
                                        <p className='text-sm text-gray-600 sm:text-base'>49% of total income</p>
                                        <ul className='mt-3 space-y-1 text-sm text-gray-600 sm:mt-4 sm:space-y-2 sm:text-base'>
                                            <li>• $146,713 per month average</li>
                                            <li>• Our financial foundation</li>
                                        </ul>
                                    </div>

                                    <div className='rounded-xl bg-white p-4 shadow-sm sm:p-6'>
                                        <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                            <Users className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                            <h3 className='text-lg font-semibold text-[#0B3558] sm:text-xl'>
                                                Shared Cost Reimbursement
                                            </h3>
                                        </div>
                                        <p className='mb-2 text-xl font-bold text-[#40BFB4] sm:text-2xl'>$528,708</p>
                                        <p className='text-sm text-gray-600 sm:text-base'>15% of total income</p>
                                        <p className='mt-3 text-sm text-gray-600 sm:mt-4 sm:text-base'>
                                            Costs shared with other entities/partners
                                        </p>
                                    </div>

                                    <div className='rounded-xl bg-white p-4 shadow-sm sm:p-6'>
                                        <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                            <Building2 className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                            <h3 className='text-lg font-semibold text-[#0B3558] sm:text-xl'>
                                                Capitalization Fee
                                            </h3>
                                        </div>
                                        <p className='mb-2 text-xl font-bold text-[#40BFB4] sm:text-2xl'>$479,080</p>
                                        <p className='text-sm text-gray-600 sm:text-base'>13% of total income</p>
                                        <ul className='mt-3 space-y-1 text-sm text-gray-600 sm:mt-4 sm:space-y-2 sm:text-base'>
                                            <li>• Collected during property transfers</li>
                                            <li>• Peaks in July and December</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Expenses Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='mb-4 text-2xl font-bold text-[#0B3558] sm:text-3xl'>
                                    Where Our Money Goes
                                </h2>
                                <p className='mb-4 text-gray-600'>
                                    The association plans to spend approximately $2.98 million on operations in 2025:
                                </p>

                                <div className='space-y-4 sm:space-y-6'>
                                    <div className='rounded-xl bg-white p-4 shadow-sm sm:p-8'>
                                        <h3 className='mb-4 text-xl font-bold text-[#0B3558] sm:text-2xl'>
                                            Major Operational Expenses
                                        </h3>
                                        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                                            <div>
                                                <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                                    <Warehouse className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                                    <h4 className='text-base font-semibold text-[#0B3558] sm:text-lg'>
                                                        Landscaping
                                                    </h4>
                                                </div>
                                                <p className='mb-2 text-lg font-bold text-[#40BFB4] sm:text-xl'>
                                                    $979,195
                                                </p>
                                                <p className='text-sm text-gray-600 sm:text-base'>33% of expenses</p>
                                            </div>
                                            <div>
                                                <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                                    <Droplet className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                                    <h4 className='text-base font-semibold text-[#0B3558] sm:text-lg'>
                                                        Water
                                                    </h4>
                                                </div>
                                                <p className='mb-2 text-lg font-bold text-[#40BFB4] sm:text-xl'>
                                                    $456,000
                                                </p>
                                                <p className='text-sm text-gray-600 sm:text-base'>15% of expenses</p>
                                            </div>
                                            <div>
                                                <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                                    <Wallet className='h-5 w-5 text-[#40BFB4] sm:h-6 sm:w-6' />
                                                    <h4 className='text-base font-semibold text-[#0B3558] sm:text-lg'>
                                                        Onsite Services
                                                    </h4>
                                                </div>
                                                <p className='mb-2 text-lg font-bold text-[#40BFB4] sm:text-xl'>
                                                    $418,680
                                                </p>
                                                <p className='text-sm text-gray-600 sm:text-base'>14% of expenses</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Financial Health Assessment */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='mb-4 text-2xl font-bold text-[#0B3558] sm:text-3xl'>
                                    Financial Health Assessment
                                </h2>

                                <div className='grid gap-4 sm:gap-6 md:grid-cols-2'>
                                    <div className='rounded-xl border-l-4 border-green-500 bg-white p-4 shadow-sm sm:p-6'>
                                        <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                            <CheckCircle className='h-5 w-5 text-green-500 sm:h-6 sm:w-6' />
                                            <h3 className='text-lg font-semibold text-[#0B3558] sm:text-xl'>
                                                What We're Doing Well
                                            </h3>
                                        </div>
                                        <ul className='space-y-2 text-sm text-gray-600 sm:space-y-3 sm:text-base'>
                                            <li>• Balanced Budget: Operating income covers planned expenses</li>
                                            <li>• Diversified Revenue Sources</li>
                                            <li>• Strong Seasonal Planning</li>
                                        </ul>
                                    </div>

                                    <div className='rounded-xl border-l-4 border-orange-500 bg-white p-4 shadow-sm sm:p-6'>
                                        <div className='mb-3 flex items-center gap-2 sm:mb-4 sm:gap-3'>
                                            <AlertTriangle className='h-5 w-5 text-orange-500 sm:h-6 sm:w-6' />
                                            <h3 className='text-lg font-semibold text-[#0B3558] sm:text-xl'>
                                                Areas for Improvement
                                            </h3>
                                        </div>
                                        <ul className='space-y-2 text-sm text-gray-600 sm:space-y-3 sm:text-base'>
                                            <li>• Reserve Planning: Current transfer of $303,996 is insufficient</li>
                                            <li>• Thin Operating Margin</li>
                                            <li>• Water Expense Optimization Needed</li>
                                            <li>• Landscape Contract Review</li>
                                            <li>• Foundation Budget Management</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* Reserve Fund Status Section */}
                            <section className='mb-12 sm:mb-16'>
                                <h2 className='mb-4 text-2xl font-bold text-[#0B3558] sm:text-3xl'>
                                    Reserve Fund Status
                                </h2>

                                <div className='space-y-4 sm:space-y-6'>
                                    {/* Current Status */}
                                    <div className='rounded-xl bg-white p-6 shadow-sm sm:p-8'>
                                        <div className='mb-4 flex items-center gap-3'>
                                            <BarChart3 className='h-6 w-6 text-[#40BFB4]' />
                                            <h3 className='text-xl font-semibold text-[#0B3558]'>
                                                Current Reserve Fund Status
                                            </h3>
                                        </div>
                                        <div className='prose prose-sm sm:prose-base max-w-none text-gray-600'>
                                            <p>
                                                The HOA reserve fund is currently underfunded, with a balance below the
                                                recommended level.
                                            </p>
                                            <p>
                                                Industry best practices suggest maintaining at least 70%–100% funding to
                                                avoid special assessments or deferred maintenance.
                                            </p>
                                            <p>
                                                The study highlights a shortfall, meaning upcoming expenses could strain
                                                the budget.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Upcoming Expenditures */}
                                    <div className='rounded-xl bg-white p-6 shadow-sm sm:p-8'>
                                        <div className='mb-4 flex items-center gap-3'>
                                            <ClipboardList className='h-6 w-6 text-[#40BFB4]' />
                                            <h3 className='text-xl font-semibold text-[#0B3558]'>
                                                Upcoming Expenditures
                                            </h3>
                                        </div>

                                        <div className='space-y-6'>
                                            {/* 1-2 Years */}
                                            <div>
                                                <h4 className='mb-3 text-lg font-semibold text-[#0B3558]'>
                                                    1–2 Years (Immediate Needs)
                                                </h4>
                                                <ul className='space-y-2 text-gray-600'>
                                                    <li>
                                                        • <span className='font-semibold'>Roof Replacements:</span>{' '}
                                                        Several buildings in the community are due for new roofing due
                                                        to aging shingles and potential leaks.
                                                    </li>
                                                    <li>
                                                        • <span className='font-semibold'>Road Resurfacing:</span>{' '}
                                                        Asphalt resurfacing is planned to fix cracks and potholes that
                                                        have worsened over the years.
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* 3-5 Years */}
                                            <div>
                                                <h4 className='mb-3 text-lg font-semibold text-[#0B3558]'>
                                                    3–5 Years (Mid-Term Projects)
                                                </h4>
                                                <ul className='space-y-2 text-gray-600'>
                                                    <li>
                                                        •{' '}
                                                        <span className='font-semibold'>
                                                            Pool and Clubhouse Renovations:
                                                        </span>{' '}
                                                        The community pool needs resurfacing, and the clubhouse requires
                                                        new flooring, paint, and HVAC updates.
                                                    </li>
                                                    <li>
                                                        • <span className='font-semibold'>HVAC System Updates:</span>{' '}
                                                        Aging heating and cooling systems in shared facilities are
                                                        becoming inefficient.
                                                    </li>
                                                </ul>
                                            </div>

                                            {/* Long-Term */}
                                            <div>
                                                <h4 className='mb-3 text-lg font-semibold text-[#0B3558]'>
                                                    Long-Term Considerations (5+ Years)
                                                </h4>
                                                <ul className='space-y-2 text-gray-600'>
                                                    <li>
                                                        •{' '}
                                                        <span className='font-semibold'>
                                                            Fence and Gate Replacements:
                                                        </span>{' '}
                                                        The perimeter fencing and entrance gates will need upgrades.
                                                    </li>
                                                    <li>
                                                        •{' '}
                                                        <span className='font-semibold'>
                                                            Plumbing and Electrical Work:
                                                        </span>{' '}
                                                        Older infrastructure may require updates to prevent future
                                                        failures.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Why Reserves Matter */}
                                    <div className='rounded-xl bg-white p-6 shadow-sm sm:p-8'>
                                        <h3 className='mb-4 text-xl font-semibold text-[#0B3558]'>
                                            Why Reserves Matter
                                        </h3>
                                        <ul className='space-y-2 text-gray-600'>
                                            <li>
                                                • A healthy reserve fund ensures financial stability and avoids
                                                unexpected special assessments.
                                            </li>
                                            <li>• Well-funded reserves contribute to higher property values.</li>
                                            <li>
                                                • Proactive planning helps spread costs over time instead of imposing
                                                large fees all at once.
                                            </li>
                                        </ul>
                                    </div>

                                    {/* Action Plan */}
                                    <div className='rounded-xl border-l-4 border-[#40BFB4] bg-white p-6 shadow-sm sm:p-8'>
                                        <h3 className='mb-4 text-xl font-semibold text-[#0B3558]'>
                                            Action Plan to Bolster Reserves
                                        </h3>
                                        <ul className='space-y-2 text-gray-600'>
                                            <li>
                                                • Increase reserve contributions through gradual HOA dues adjustments
                                            </li>
                                            <li>• Phase in necessary projects to prioritize urgent repairs</li>
                                            <li>• Explore alternative funding sources including grants and loans</li>
                                            <li>
                                                • Improve financial transparency with regular updates on fund status
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* My Commitment Section */}
                            <section className='mb-12 rounded-2xl bg-[#0B3558] p-4 text-white shadow-sm sm:mb-16 sm:p-8'>
                                <h2 className='mb-4 text-2xl font-bold sm:text-3xl'>
                                    My HOA Financial Commitments If Elected
                                </h2>
                                <ul className='space-y-3 text-sm sm:space-y-4 sm:text-base'>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Push for a Contingency Fund if one does not exist
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Review Major Contracts for Cost Efficiency
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Improve Financial Transparency by disclosing all fees and expenses in more
                                        detail
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Optimize Community Events by streamlining processes and reducing costs
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Plan for Long-Term Sustainability by setting aside funds for future needs
                                    </li>
                                    <li className='flex items-start'>
                                        <span className='mr-3 text-[#40BFB4] sm:mr-4'>•</span>
                                        Implement a transparent budgeting process
                                    </li>
                                </ul>
                            </section>

                            <p className='text-base text-gray-600 sm:text-lg'>
                                I believe our association is generally well-managed financially, but there are
                                opportunities to strengthen our position. I welcome your questions and feedback on this
                                analysis.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Annual Meeting 2025 | Grand Central Park HOA',
  description: 'Review the 2025 Annual Meeting presentation for Grand Central Park Residential Association.',
  keywords: ['Grand Central Park', 'HOA', 'Annual Meeting', '2025', 'Community Updates'],
  openGraph: {
    title: 'Annual Meeting 2025 | Grand Central Park HOA',
    description: 'Review the 2025 Annual Meeting presentation for Grand Central Park Residential Association.',
    url: 'https://derrickthreatt.com/annual-meeting',
    siteName: 'Derrick Threatt for GCP HOA',
    images: [
      {
        url: '/images/2025-resident-meeting-ogimage.jpg',
        width: 1200,
        height: 630,
        alt: 'Grand Central Park HOA Annual Meeting 2025',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function AnnualMeeting() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative pt-[50px]">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/images/hero-background.jpg"
              alt="Grand Central Park"
              fill
              sizes="100vw"
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhgJAi5qj4AAAAABJRU5ErkJggg=="
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Content */}
          <div className="relative w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="flex flex-col-reverse items-center gap-8 lg:flex-row lg:justify-between">
              {/* Left Column - Text Content */}
              <div className="flex flex-col items-center text-center lg:text-left lg:items-start lg:w-1/2">
                <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                  Resident Annual<br />Presentation 2025
                </h1>
                <p className="mt-6 text-lg text-gray-100">
                  Review the highlights and updates from the 2025 Annual Meeting of the Grand Central Park Residential Association.
                </p>
              </div>

              {/* Right Column - QR Code Image */}
              <div className="lg:w-1/2 flex flex-col items-center">
                <a 
                  href="https://www.canva.com/design/DAGcSEhUpe4/jMO4vDkzQFmKOxl3SORF6A/view"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-72 w-72 sm:h-80 sm:w-80 cursor-pointer transition-transform hover:scale-105"
                >
                  <Image
                    src="/images/2025-resident-meeting-canva.jpg"
                    alt="Annual Meeting Presentation QR Code"
                    width={320}
                    height={320}
                    className="rounded-lg shadow-lg"
                  />
                </a>
                <div className="mt-4 text-center">
                  <a 
                    href="https://www.canva.com/design/DAGcSEhUpe4/jMO4vDkzQFmKOxl3SORF6A/view"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#40BFB4] hover:text-[#40BFB4]/80 font-semibold"
                  >
                    Scan or click to see the presentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Minutes Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">Annual Meeting Highlights</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Key updates and information from the April 4th, 2025 Annual Meeting at the Lake House.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 shadow-sm mb-12">
              <h3 className="text-2xl font-semibold text-[#0B3558] mb-6">Meeting Overview</h3>
              <div className="space-y-4">
                <p className="text-gray-700">
                  The Grand Central Park Residential Association Annual Meeting was held on April 4th, 2025 at the Lake House. 
                  James Schultz, Community Manager, called the meeting to order at 6:00 PM.
                </p>
                <p className="text-gray-700">
                  The minutes from the 2023 Annual Meeting were presented and approved. The Board of Directors and CCMC management team were introduced to the community.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Report Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">Financial Report</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Overview of the community's financial health and management.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B3558] mb-3">2024 Financial Summary</h3>
                  <p className="text-gray-700 mb-4">
                    James Schultz, Community Manager, reported a total income of $2,726,325 for the year ending December 31st, 2023. The income primarily came from residential assessments, working capital fees, community foundation contributions, and the shared use contribution from the commercial association.
                  </p>
                  <p className="text-gray-700">
                    Total expenses for the year were $2,409,790, with the majority allocated to contract services, administration services, insurance, utilities, repair and maintenance, and foundation expenses.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0B3558] mb-3">Lake House Revenue</h3>
                  <p className="text-gray-700">
                    In 2024, a total of 94 events were held at the Lake House, generating $111,194 in revenue. Rental proceeds directly support the upkeep of this beautiful venue and its amenities.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0B3558] mb-3">Cost Savings Initiatives</h3>
                  <p className="text-gray-700">
                    Leak detection and repairs near The Lake House resulted in water cost savings of approximately $48,000, demonstrating the board's commitment to fiscal responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Updates Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">Development Updates</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Commercial and residential development progress in our community.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Commercial Development</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0B3558]">Hyatt Regency Conroe</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>250 guestrooms</li>
                      <li>Full bar, pool, three-meal restaurant, fitness center</li>
                      <li>30,000 sq. ft. ballroom, meeting & pre-function space</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#0B3558]">SHSU College of Osteopathic Medicine</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>First osteopathic college in Montgomery County</li>
                      <li>Parking garage completed 2024</li>
                      <li>NEW: Building 85,000 square foot Health Professions Building</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#0B3558]">Marcel Boulevard</h4>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>68,000 sq. ft. of retail, dining & offices</li>
                      <li>32,000 sq. ft. office spaces with Regus Office Space</li>
                      <li>Still in growth phase and needs more time to gain visibility beyond the immediate community</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Retail & Marketplace</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#0B3558]">336 Marketplace</h4>
                    <p className="text-gray-700 mt-2">
                      Expanding retail options with new stores coming soon:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Total Wine & More</li>
                      <li>Bath & Body Works</li>
                      <li>EOS Fitness</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-[#0B3558]">Greenway Village</h4>
                    <p className="text-gray-700 mt-2">
                      Growing selection of services including:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                      <li>Medistar</li>
                      <li>Taco Bell</li>
                      <li>Grand Central Dentistry</li>
                      <li>Ocean Express Car Wash</li>
                      <li>Texas First Bank</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Amenity Development Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">Amenity Development</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                New and improved amenities enhancing our community experience.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Deer Lake</h3>
                <p className="text-gray-700 mb-3">
                  New amenities coming to Deer Lake include:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Fishing pier</li>
                  <li>Kayak launch</li>
                  <li>Pavilion</li>
                  <li>Games area</li>
                  <li>Open lawn space</li>
                  <li>Grills</li>
                  <li>Hammock grove</li>
                  <li>Picnic areas</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Pickleball Courts</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Two gated courts with lighting</li>
                  <li>Reservation-only courts</li>
                  <li>Located to the right as you pass The Lake House Pavilion</li>
                  <li>Construction expected to begin in May 2025</li>
                  <li>Reservation system and court rules will be announced as we get closer to completion</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Pool Improvements</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>New tile trim installed</li>
                  <li>Replastering of the pool</li>
                  <li>Addition of 20-foot canvas umbrellas</li>
                  <li>Eight new pool ledge loungers</li>
                  <li>New pool hammocks on order</li>
                  <li>Open May 10th through September 28th, 10:00 AM to 8:00 PM (closed Mondays for cleaning)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 2024 Accomplishments Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">2024 Accomplishments</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                Key achievements and improvements made throughout our community.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Community Growth & Management</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Welcomed over 387 new residents to the community</li>
                  <li>Jennifer Khalil joined as Community Manager</li>
                  <li>Brianna Mcgee joined as Administrative Assistant</li>
                  <li>Tarah Siegel joined as Community Standards Coordinator</li>
                  <li>Added environmental and flood insurance policies</li>
                  <li>Updated the Facility Usage Agreement to reflect current policies and guidelines</li>
                  <li>Updated The Lake House rental agreement policy</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Facility Improvements</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Restriped The Lake House parking lot for improved organization and better visibility</li>
                  <li>The Lake House was repainted, and offices were redesigned to accommodate two team members per office</li>
                  <li>Office furniture was replaced, and new shelving was added for additional storage</li>
                  <li>Acoustic soundproofing panels were installed in the Grand Room, office hallway, and staff offices</li>
                  <li>Installed new commercial-grade benches at Twilight and Frisky Biscuit Parks</li>
                  <li>Replaced wooden benches at Frisky Biscuit Park with durable alternatives</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-gray-50 rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Landscaping & Maintenance</h3>
              <div className="grid gap-8 md:grid-cols-2">
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Seasonal color changes installed throughout the community and major community entrances</li>
                  <li>Hardwood and pine straw mulch installed in the medians and reforestation areas in February and November</li>
                  <li>Monthly irrigation inspections and repairs conducted to ensure system efficiency</li>
                  <li>Ongoing clearing of nature trail walkways</li>
                  <li>Post Hurricane Beryl debris removal of downed, snapped, leaning trees and tree stumps throughout the community and parks</li>
                </ul>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Wild boars trapped to protect community landscaping</li>
                  <li>Frisk Biscuit Dog Park drainage system improvements</li>
                  <li>Adding topsoil to the Dog Parks</li>
                  <li>West Village mailbox refresh</li>
                  <li>Revitalizing The Lake House entrance with nine single-trunk crepe myrtles</li>
                  <li>Shrub Bed Audit & Enhancement Project</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 2025 Goals Section */}
        <div className="bg-gray-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0B3558] mb-4">2025 Goals</h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                What we're excited about for this year.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Amenity Enhancements</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Two lighted gated Pickleball Courts reservation-only courts</li>
                    <li>Outdoor Restrooms: Currently underway at the Pavilion for enhanced convenience</li>
                    <li>Community Enhancements: Improvements at Deer Lake and The Landing</li>
                    <li>New pool hammocks</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-[#0B3558] mb-4">Community Maintenance</h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Proactive Weekly Common Area Inspections for Continuous Improvement and Accelerated Maintenance Response</li>
                    <li>Deed Restriction Compliance: Proactive Monitoring and Inspections via our new Community Standards Coordinator</li>
                    <li>Hideaway Nature Trail: Cleanup with refreshed trail markers</li>
                    <li>Monument Lighting: Repairs and upgrades</li>
                    <li>West Village street poles audit for repairs, replacement, and readjustment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0B3558] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Stay Connected</h2>
              <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-8">
                Keep up with the latest updates and information about our community.
              </p>
              
              <div className="mt-10">
                <Link
                  href="/request"
                  className="rounded-full bg-[#40BFB4] px-8 py-3 text-white hover:bg-[#40BFB4]/90 transition-colors font-extrabold uppercase tracking-wide"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

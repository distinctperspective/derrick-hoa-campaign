'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ExternalLink, Info } from 'lucide-react';

interface ResourceLink {
  title: string;
  url: string;
  description: string;
  isExternal: boolean;
  category: 'community' | 'campaign';
}

const resourceLinks: ResourceLink[] = [
  // Community Links
  {
    title: "GCP Official Website",
    url: "https://www.grandcentralparktx.com/",
    description: "Visit the official Grand Central Park website for community information, amenities, and resources.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Community Calendar",
    url: "https://www.gcprai.com/community-calendar/",
    description: "Stay up-to-date with all community events, meetings, and activities happening in Grand Central Park.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "The Lake House",
    url: "https://www.grandcentralparktx.com/lakehouse",
    description: "Learn about our spectacular 13-acre amenity complex with a 7,600-square foot clubhouse and resort-style pool.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Community Trails",
    url: "https://www.grandcentralparktx.com/trails",
    description: "Explore miles of trails winding through lush woods in our 2,046-acre community.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Hyatt Regency (20% Off)",
    url: "https://www.hyatt.com/hyatt-regency/en-US/iahrc-hyatt-regency-conroe?corp_id=1004430",
    description: "Book at the Hyatt Regency Conroe with a special 20% discount for Grand Central Park residents and visitors. Located in the heart of Grand Central Park.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Johnson Development",
    url: "https://www.johnsondevelopment.com/conroe-tx/mpc_grand_central_park",
    description: "Information about Grand Central Park from the master developer, featuring community highlights and development plans.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "New Resident Guide",
    url: "https://www.grandcentralparktx.com/start-here",
    description: "Essential information for new residents of Grand Central Park.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Community Resources",
    url: "https://www.grandcentralparktx.com/resources",
    description: "Access important resources and information for Grand Central Park residents.",
    isExternal: true,
    category: 'community'
  },
  {
    title: "Community Blog",
    url: "https://www.grandcentralparktx.com/press",
    description: "Stay updated with the latest news and events in the Grand Central Park community.",
    isExternal: true,
    category: 'community'
  },
  
  // Campaign Links
  {
    title: "Endorse Derrick",
    url: "/endorse-derrick-for-gcphoa",
    description: "Show your support by endorsing Derrick's campaign for the GCP HOA board.",
    isExternal: false,
    category: 'campaign'
  },
  {
    title: "Derrick's Vision",
    url: "/vision",
    description: "Learn about Derrick's vision and plans for improving our community.",
    isExternal: false,
    category: 'campaign'
  },
  {
    title: "Community Concerns",
    url: "/your-concerns",
    description: "See how Derrick plans to address the most common concerns in our community.",
    isExternal: false,
    category: 'campaign'
  },
  {
    title: "Financial Transparency",
    url: "/financials",
    description: "Review Derrick's approach to financial management and transparency.",
    isExternal: false,
    category: 'campaign'
  }
];

export default function ResourcesSidebar() {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const showTooltip = (index: number) => {
    setActiveTooltip(index);
  };

  const hideTooltip = () => {
    setActiveTooltip(null);
  };

  const communityLinks = resourceLinks.filter(link => link.category === 'community');
  const campaignLinks = resourceLinks.filter(link => link.category === 'campaign');

  const renderLinksList = (links: ResourceLink[]) => (
    <div className="space-y-3">
      {links.map((link, index) => (
        <div key={index} className="relative">
          <div className="flex items-center justify-between">
            <Link 
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="flex-grow text-[#0B3558] hover:text-[#40BFB4] transition-colors"
            >
              <span className="font-medium">{link.title}</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              {link.isExternal && (
                <ExternalLink size={16} className="flex-shrink-0 text-gray-400" />
              )}
              
              <div 
                className="cursor-help"
                onMouseEnter={() => showTooltip(index + (link.category === 'campaign' ? communityLinks.length : 0))}
                onMouseLeave={hideTooltip}
                onFocus={() => showTooltip(index + (link.category === 'campaign' ? communityLinks.length : 0))}
                onBlur={hideTooltip}
              >
                <Info size={16} className="text-gray-400 hover:text-[#40BFB4]" />
                
                {activeTooltip === index + (link.category === 'campaign' ? communityLinks.length : 0) && (
                  <div className="absolute z-10 right-0 -top-2 transform translate-y-[-100%] w-64 bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-sm text-gray-600">
                    {link.description}
                    <div className="absolute bottom-[-6px] right-[7px] w-3 h-3 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {index < links.length - 1 && (
            <div className="border-b border-gray-100 my-2"></div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-[#0B3558] mb-5">Resource Directory</h3>
      
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-[#40BFB4] mb-3">Community Resources</h4>
        {renderLinksList(communityLinks)}
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-[#E85C41] mb-3">Campaign Information</h4>
        {renderLinksList(campaignLinks)}
      </div>
    </div>
  );
}

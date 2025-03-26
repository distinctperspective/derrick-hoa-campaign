'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
    question: string;
    answer: string | JSX.Element;
}

const faqs: FAQItem[] = [
    {
        question: "How long have you lived in Grand Central Park?",
        answer: "I have been a proud resident of Grand Central Park for 3 years, experiencing firsthand both the joys and challenges of our growing community."
    },
    {
        question: "What professional experience qualifies you for the HOA board?",
        answer: (
            <div className="space-y-3">
                <p>My professional background uniquely qualifies me for this role:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>HOA Software Experience</strong> – I have worked for an HOA software company writing software for HOAs to manage requests, bylaws, resident portals, etc. I've also worked hand-in-hand with HOA attorneys to ensure the portals for HOAs were legally compliant.</li>
                    <li><strong>Strategic Leadership & Decision-Making</strong> – My experience in marketing operations and working with executive leadership teams has honed my ability to analyze complex challenges, make data-driven decisions, and align strategies with community needs.</li>
                    <li><strong>Budgeting & Financial Oversight</strong> – Having worked in SaaS and marketing, I understand financial planning, resource allocation, and cost-efficiency, which are critical in managing HOA budgets responsibly.</li>
                    <li><strong>Communication & Community Engagement</strong> – With a background in customer engagement, sales, and marketing, I bring strong communication skills to facilitate transparent discussions and promote a collaborative environment.</li>
                    <li><strong>Technology & Process Improvement</strong> – My work with SafetyChain Software and AI-driven tools has given me insight into leveraging technology for operational efficiency—useful for modernizing HOA processes and communication platforms.</li>
                </ul>
            </div>
        )
    },
    {
        question: "What can you contribute to the Residential Association as a Board Member?",
        answer: (
            <div className="space-y-3">
                <p>As a Board Member, I would bring a strategic, solution-oriented mindset to ensure our community remains a well-managed, desirable place to live. My professional experience equips me to:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Improve Communication & Engagement</strong> – With my background in marketing and customer relations, I can help foster clearer, more effective communication between the board and residents, ensuring transparency and active participation.</li>
                    <li><strong>Enhance Financial & Operational Efficiency</strong> – My experience in budgeting, campaign attribution, and SaaS operations allows me to contribute to sound financial planning and responsible spending for the HOA.</li>
                    <li><strong>Leverage Technology for Better Management</strong> – Having worked with AI tools and digital platforms, I can help modernize processes such as online payments, resident feedback systems, and HOA communications.</li>
                    <li><strong>Ensure Fair & Data-Driven Decision-Making</strong> – My experience working with executive leadership teams has strengthened my ability to analyze challenges objectively and implement policies that serve all residents' best interests.</li>
                    <li><strong>Foster a Positive & Inclusive Community</strong> – I'm committed to ensuring all voices in our community are heard and that Grand Central Park remains a place where people want to live and invest.</li>
                </ul>
            </div>
        )
    },
    {
        question: "What are your top priorities if elected?",
        answer: (
            <div className="space-y-3">
                <p>My top priorities include:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li>Improving maintenance and quality of our common areas and amenities</li>
                    <li>Ensuring financial transparency and responsible management of HOA funds</li>
                    <li>Preserving our natural environment while supporting thoughtful development</li>
                    <li>Building a stronger sense of community through improved communication and events</li>
                    <li>Advocating for resident concerns with developers and local authorities</li>
                    <li>Helping the 336 marketplace grow and enhancing our HOA's value</li>
                </ul>
            </div>
        )
    },
    {
        question: "What unique skills do you bring beyond traditional HOA experience?",
        answer: (
            <div className="space-y-3">
                <p>Beyond my professional background in marketing and operations, I bring several unique skills:</p>
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Drone & Digital Photography</strong> – I specialize in aerial drone videography and digital photography, skills that can be useful for documenting community events, property improvements, and marketing initiatives for the neighborhood.</li>
                    <li><strong>Video Production Expertise</strong> – I create customer success videos for major brands like Square, Blue Bell Ice Cream, Costco, and Freshpet. This experience in video storytelling could help enhance communication and engagement within our community.</li>
                    <li><strong>Marketing Expertise</strong> – As a marketer, I can help promote our community, increase property values, and attract quality businesses to the area.</li>
                    <li><strong>Technology Integration</strong> – I enjoy leveraging technology and creative solutions to improve processes, whether through digital engagement, process efficiencies, or enhanced resident communication.</li>
                </ul>
            </div>
        )
    },
    {
        question: "How do you plan to address the concerns about amenity quality?",
        answer: "I plan to conduct a comprehensive audit of our current amenities, gather resident feedback on priorities for improvements, and develop a strategic plan for upgrades and maintenance. I'll work to ensure that our amenities meet the high standards promised to residents when they chose to make Grand Central Park their home."
    },
    {
        question: "What's your position on HOA fees?",
        answer: "I believe in transparent, value-based assessments that ensure residents receive quality services while maintaining fiscal responsibility. I'll advocate for clear communication about how fees are allocated and work to maximize the value residents receive from their HOA contributions. Any proposed changes should be thoroughly justified and communicated clearly to all homeowners."
    },
    {
        question: "What happened to the front yard maintenance for the townhomes?",
        answer: "This is a concern that has been raised by many townhome residents. If elected, I will investigate this issue thoroughly, review the original agreements regarding townhome maintenance, and work to ensure that all services promised to residents are being delivered appropriately. Clear communication about maintenance responsibilities and schedules will be a priority."
    },
    {
        question: "How will you improve communication between the board and residents?",
        answer: "I plan to implement regular updates through multiple channels (email, community portal, social media), hold quarterly town halls for direct feedback, and create accessible ways for residents to submit questions and concerns. With my background in marketing and communication, I'll ensure that all residents feel informed and heard, creating a more transparent and responsive board."
    },
    {
        question: "What is your vision for Grand Central Park's future?",
        answer: "I envision Grand Central Park as a premier community that balances natural beauty with thoughtful development, where residents enjoy exceptional amenities, strong property values, and a genuine sense of belonging. I want us to be known for our environmental stewardship, community engagement, high quality of life, and innovative use of technology to enhance the resident experience."
    },
    {
        question: "How can I support your campaign?",
        answer: (
            <div className="space-y-4">
                <p>The most important way to support my campaign is to vote! You can also help by sharing my campaign information with your neighbors, providing your endorsement on my website, and reaching out with your ideas and concerns. Together, we can build the community we all want to call home.</p>
                <div>
                    <a 
                        href="/endorse-derrick-for-gcphoa" 
                        className="inline-block bg-[#E85C41] hover:bg-[#E85C41]/90 text-white font-bold py-2 px-5 rounded-full transition-colors"
                    >
                        Endorse Me
                    </a>
                </div>
            </div>
        )
    }
];

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {faqs.map((faq, index) => (
                <motion.div 
                    key={index} 
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                >
                    <motion.button
                        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                        onClick={() => toggleFAQ(index)}
                        whileTap={{ scale: 0.98 }}
                    >
                        <h3 className="text-lg font-semibold text-[#0B3558]">{faq.question}</h3>
                        <motion.div
                            animate={{ rotate: openIndex === index ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="h-5 w-5 text-[#40BFB4] flex-shrink-0" />
                        </motion.div>
                    </motion.button>
                    
                    <AnimatePresence>
                        {openIndex === index && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-4">
                                    <motion.div 
                                        className="text-gray-600 prose"
                                        initial={{ y: -10, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
                                        {faq.answer}
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </motion.div>
    );
}

'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface PollItem {
    question: string;
    percentage: number;
    icon: LucideIcon;
}

interface PollResultsProps {
    pollData: PollItem[];
}

export default function PollResults({ pollData }: PollResultsProps) {
    return (
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
    );
}

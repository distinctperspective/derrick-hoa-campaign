'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Endorsement = {
    id: string;
    displayName: string;
    message: string;
};

const EndorsementCarousel = () => {
    const [endorsements, setEndorsements] = useState<Endorsement[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEndorsements = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/endorsements');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch endorsements');
                }
                
                const data = await response.json();
                console.log('Fetched endorsements:', data);
                
                if (data.endorsements && data.endorsements.length > 0) {
                    setEndorsements(data.endorsements);
                } else {
                    // Fallback to static data if no approved endorsements yet
                    setEndorsements([
                        {
                            id: '1',
                            displayName: 'Resident on Callery Pear Court - D.T.',
                            message: 'Derrick is exactly what our community needs - someone who listens to residents and takes action!'
                        },
                        {
                            id: '2',
                            displayName: 'Resident on Grand Central Parkway - J.S.',
                            message: 'I appreciate Derrick\'s commitment to transparency and his vision for our community.'
                        },
                        {
                            id: '3',
                            displayName: 'Resident on Harmony Woods - M.K.',
                            message: 'Derrick has consistently shown that he cares about all residents and our concerns.'
                        }
                    ]);
                }
                
                setError(null);
            } catch (err) {
                console.error('Error fetching endorsements:', err);
                setError('Failed to load endorsements');
                // Fallback to static data
                setEndorsements([
                    {
                        id: '1',
                        displayName: 'Resident on Callery Pear Court - D.T.',
                        message: 'Derrick is exactly what our community needs - someone who listens to residents and takes action!'
                    },
                    {
                        id: '2',
                        displayName: 'Resident on Grand Central Parkway - J.S.',
                        message: 'I appreciate Derrick\'s commitment to transparency and his vision for our community.'
                    },
                    {
                        id: '3',
                        displayName: 'Resident on Harmony Woods - M.K.',
                        message: 'Derrick has consistently shown that he cares about all residents and our concerns.'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchEndorsements();
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? endorsements.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === endorsements.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0B3558]"></div>
            </div>
        );
    }

    if (error || endorsements.length === 0) {
        return null;
    }

    return (
        <div className="relative max-w-3xl mx-auto px-4">
            <div className="flex justify-between items-center">
                <button 
                    onClick={handlePrev}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Previous endorsement"
                >
                    <ChevronLeft className="h-6 w-6 text-[#0B3558]" />
                </button>
                
                <div className="text-center mx-4 flex-1">
                    <div className="relative p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                        <div className="absolute -top-3 -left-3 text-[#40C5B5]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-80">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                            </svg>
                        </div>
                        <p className="text-gray-600 italic mb-4">{endorsements[currentIndex].message}</p>
                        <p className="text-[#0B3558] font-bold">{endorsements[currentIndex].displayName}</p>
                    </div>
                </div>
                
                <button 
                    onClick={handleNext}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    aria-label="Next endorsement"
                >
                    <ChevronRight className="h-6 w-6 text-[#0B3558]" />
                </button>
            </div>
            
            {/* Navigation dots centered below the carousel */}
            <div className="flex justify-center gap-1 mt-4 mb-0">
                {endorsements.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                            index === currentIndex ? 'bg-[#0B3558]' : 'bg-gray-300'
                        }`}
                        aria-label={`Go to endorsement ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default EndorsementCarousel;

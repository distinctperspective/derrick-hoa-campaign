'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  start: string | null;
  end: string | null;
  url: string | null;
  image: string | null;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/calendar');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get only upcoming events (today and future)
        const now = new Date();
        const upcomingEvents = data.events.filter((event: Event) => 
          event.start && new Date(event.start) >= now
        ).slice(0, 5); // Limit to 5 events
        
        // Log events to debug image URLs
        console.log('Upcoming events:', upcomingEvents);
        
        setEvents(upcomingEvents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Could not load upcoming events');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatDay = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string | null) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const toggleExpand = (eventId: string) => {
    if (expandedEvent === eventId) {
      setExpandedEvent(null);
    } else {
      setExpandedEvent(eventId);
    }
  };

  // Fallback image for events without images
  const fallbackImage = '/images/grand-central-park.jpg';

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#0B3558] mb-4">Upcoming Events</h3>
        <div className="py-4 text-center text-gray-500">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#0B3558] mb-4">Upcoming Events</h3>
        <div className="py-4 text-center text-gray-500">
          <p>{error}</p>
          <Link 
            href="https://www.gcprai.com/community-calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#40BFB4] hover:text-[#40BFB4]/80 mt-2"
          >
            View Calendar
          </Link>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-xl font-bold text-[#0B3558] mb-4">Upcoming Events</h3>
        <div className="py-4 text-center text-gray-500">
          <p>No upcoming events found</p>
          <Link 
            href="https://www.gcprai.com/community-calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#40BFB4] hover:text-[#40BFB4]/80 mt-2"
          >
            View Full Calendar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-bold text-[#0B3558] mb-4">Upcoming Events</h3>
      <div className="space-y-3">
        {events.map((event) => (
          <motion.div 
            key={event.id} 
            className={`border border-gray-100 rounded-lg overflow-hidden transition-all duration-300 ${
              hoveredEvent === event.id ? 'shadow-md' : ''
            }`}
            onHoverStart={() => setHoveredEvent(event.id)}
            onHoverEnd={() => setHoveredEvent(null)}
            onClick={() => toggleExpand(event.id)}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {/* Event Header - Always Visible */}
            <div 
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
            >
              <div className="flex items-center">
                <div className="bg-[#40BFB4]/10 rounded-lg p-2 mr-3 text-center min-w-[50px]">
                  <div className="text-[#40BFB4] font-bold">
                    {event.start ? new Date(event.start).getDate() : ''}
                  </div>
                  <div className="text-xs text-[#0B3558]">
                    {event.start ? new Date(event.start).toLocaleDateString('en-US', { month: 'short' }) : ''}
                  </div>
                </div>
                <h4 className="font-medium text-[#0B3558] line-clamp-1">{event.title}</h4>
              </div>
              <motion.div
                animate={{ rotate: expandedEvent === event.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className="text-gray-400" />
              </motion.div>
            </div>
            
            {/* Expanded Content */}
            <AnimatePresence>
              {(expandedEvent === event.id || hoveredEvent === event.id) && (
                <motion.div 
                  className="p-3 pt-0 border-t border-gray-100 bg-gray-50"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {(event.image || fallbackImage) && (
                    <div className="mb-3 relative h-32 w-full rounded-lg overflow-hidden">
                      <Image 
                        src={event.image || fallbackImage}
                        alt={event.title} 
                        fill 
                        style={{ objectFit: 'cover' }} 
                        unoptimized
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {event.start && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-2 text-[#40BFB4]" />
                        <span>{formatDate(event.start)}</span>
                      </div>
                    )}
                    
                    {event.start && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={14} className="mr-2 text-[#40BFB4]" />
                        <span>{formatTime(event.start)}</span>
                        {event.end && event.start !== event.end && (
                          <span> - {formatTime(event.end)}</span>
                        )}
                      </div>
                    )}
                    
                    {event.location && (
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin size={14} className="mr-2 mt-1 flex-shrink-0 text-[#40BFB4]" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    
                    {event.url && (
                      <div className="mt-3">
                        <Link 
                          href={event.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[#40BFB4] hover:text-[#40BFB4]/80 font-medium"
                        >
                          Event Details
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        
        <div className="text-center mt-4">
          <Link 
            href="https://www.gcprai.com/community-calendar/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-[#40BFB4] hover:text-[#40BFB4]/80 font-medium"
          >
            View Full Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}

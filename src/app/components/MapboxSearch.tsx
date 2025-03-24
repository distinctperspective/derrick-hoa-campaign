'use client';

import { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';

interface MapboxSearchProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

interface AddressSuggestion {
    full_address?: string;
    [key: string]: any;
}

const MapboxSearch = ({ value, onChange, className = '' }: MapboxSearchProps) => {
    const [accessToken, setAccessToken] = useState('');

    useEffect(() => {
        setAccessToken(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '');
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleSuggestion = (suggestion: AddressSuggestion) => {
        if (suggestion.full_address) {
            onChange(suggestion.full_address);
        }
    };

    if (!accessToken) return null;

    return (
        <div className="relative w-full">
            {/* @ts-ignore - Known issue with Mapbox types */}
            <AddressAutofill accessToken={accessToken} onSuggestion={handleSuggestion}>
                <input
                    type="text"
                    autoComplete="street-address"
                    value={value}
                    onChange={handleChange}
                    placeholder="Enter your Grand Central Park address"
                    className={className}
                />
            </AddressAutofill>
        </div>
    );
};

export default MapboxSearch;

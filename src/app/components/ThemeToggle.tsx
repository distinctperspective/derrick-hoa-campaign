'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const cycleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark') {
            setTheme('system');
        } else {
            setTheme('light');
        }
    };

    return (
        <button
            onClick={cycleTheme}
            className="rounded-md p-2 hover:bg-[#1A4E84] transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Sun className="h-5 w-5 text-white" />
            ) : theme === 'dark' ? (
                <Moon className="h-5 w-5 text-white" />
            ) : (
                <Monitor className="h-5 w-5 text-white" />
            )}
        </button>
    );
};

export default ThemeToggle;

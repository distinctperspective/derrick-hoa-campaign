'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'large';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
  uppercase?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  isLoading = false,
  className = '',
  href,
  target,
  rel,
  uppercase = false,
  ...props
}: ButtonProps) {
  // Base styles that apply to all buttons
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-colors";
  
  // Variant specific styles (colors)
  const variantStyles = {
    primary: "bg-[#40C5B5] text-white hover:bg-[#40C5B5]/90",
    secondary: "bg-[#0B3558] text-white hover:bg-[#0B3558]/90",
    accent: "bg-[#E85C41] text-white hover:bg-[#E85C41]/90",
    outline: "bg-white text-[#E85C41] hover:bg-gray-100 border border-[#E85C41]",
    ghost: "bg-transparent hover:bg-white/10"
  };
  
  // Size specific styles
  const sizeStyles = {
    default: "px-6 py-2.5 text-sm",
    large: "px-8 py-3 text-base"
  };
  
  // Optional uppercase styling
  const textCase = uppercase ? "uppercase tracking-wide" : "";
  
  // Combine all styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${textCase} ${className}`;
  
  // Disabled state
  const disabledStyles = isLoading || props.disabled ? "opacity-70 cursor-not-allowed" : "";
  
  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} target={target} rel={rel} className={`${buttonStyles} ${disabledStyles}`}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {children}
          </>
        ) : (
          children
        )}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <button
      className={`${buttonStyles} ${disabledStyles} cursor-pointer`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  );
}

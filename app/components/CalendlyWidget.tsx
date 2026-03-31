'use client';

import React, { useEffect, useState } from 'react';

interface CalendlyWidgetProps {
  url: string;
  text?: string;
  className?: string;
  variant?: 'button' | 'inline' | 'popup';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url,
  text = 'Schedule a Meeting',
  className = '',
  variant = 'button',
  size = 'md',
  fullWidth = false
}) => {
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  useEffect(() => {
    // Check if Calendly is already loaded
    if ((window as any).Calendly) {
      setIsCalendlyLoaded(true);
      return;
    }

    // Load Calendly script if not already loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsCalendlyLoaded(true);
    document.head.appendChild(script);

    return () => {
      // Cleanup script if component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const openCalendlyPopup = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initPopupWidget({
        url: url,
        parentElement: document.body
      });
    }
  };

  const openCalendlyInline = () => {
    if ((window as any).Calendly) {
      (window as any).Calendly.initInlineWidget({
        url: url,
        parentElement: document.getElementById('calendly-inline-widget')
      });
    }
  };

  // Size classes for responsive design
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2';
      case 'lg':
        return 'text-base sm:text-lg px-6 sm:px-8 py-2 sm:py-3';
      default: // md
        return 'text-sm sm:text-base px-4 sm:px-6 py-1 sm:py-2';
    }
  };

  // Width classes for responsive design
  const getWidthClasses = () => {
    if (fullWidth) {
      return 'w-full';
    }
    return 'w-auto';
  };

  // Base button classes with responsive design
  const baseButtonClasses = `
    bg-[#FFBE02] hover:bg-yellow-500 text-black font-semibold 
    rounded-full transition-colors duration-300 shadow-lg hover-lift smooth-transition
    flex items-center justify-center
    ${getSizeClasses()}
    ${getWidthClasses()}
    ${className}
  `.trim();

  if (variant === 'popup') {
    return (
      <button
        onClick={openCalendlyPopup}
        disabled={!isCalendlyLoaded}
        className={baseButtonClasses}
      >
        {text}
      </button>
    );
  }

  if (variant === 'inline') {
    return (
      <div className="w-full">
        <button
          onClick={openCalendlyInline}
          disabled={!isCalendlyLoaded}
          className={baseButtonClasses}
        >
          {text}
        </button>
        <div 
          id="calendly-inline-widget" 
          className="w-full min-h-[520px] sm:min-h-[620px] lg:min-h-[720px] mt-4"
          style={{ minWidth: '320px' }}
        />
      </div>
    );
  }

  // Default button variant
  return (
    <button
      onClick={openCalendlyPopup}
      disabled={!isCalendlyLoaded}
      className={baseButtonClasses}
    >
      {text}
    </button>
  );
};

export default CalendlyWidget;

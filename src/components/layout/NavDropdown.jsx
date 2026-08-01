'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function NavDropdown({
  label,
  icon: Icon,
  children,
  className = '',
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`relative h-full ${className}`}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Nav Item */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}

        className="group text-textcolor hover:text-primary relative flex h-full flex-col items-center justify-center gap-1 text-sm font-medium transition"
      >
        {Icon && (
          <Icon
            size={17}
            className="group-hover:text-primary text-gray-500 transition-all duration-300 group-hover:-translate-y-1"
          />
        )}

        <span>{label}</span>

        <ChevronDown
          size={14}
          className={`absolute -right-4 bottom-1 transition-transform duration-300 ${
            open ? 'text-primary rotate-180' : 'text-gray-400'
          } `}
        />

        {/* Hover underline */}

        <span className="bg-primary absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transition-transform duration-300 group-hover:origin-left group-hover:scale-x-100" />
      </button>

      {/* Dropdown Content */}

      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}

        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-2 opacity-0'
        } `}
      >
        {children}
      </div>
    </div>
  );
}

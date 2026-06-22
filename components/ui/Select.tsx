'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as FiIcons from 'react-icons/fi';

const FiChevronDown = FiIcons.FiChevronDown;
const FiCheck = FiIcons.FiCheck;

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
}

export default function Select({ value, onChange, options, placeholder, className = '' }: SelectProps) {
  const t = useTranslations('calculator');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-sm text-left bg-white border border-jira-border rounded hover:bg-gray-50 focus:border-jira-blue focus:ring-2 focus:ring-primary-100 outline-none transition-all flex items-center justify-between"
      >
        <span className={selectedOption ? 'text-jira-text' : 'text-gray-400'}>
          {selectedOption ? selectedOption.label : placeholder || t('selectPlaceholder')}
        </span>
        <FiChevronDown className={`text-jira-textSecondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-jira-border rounded shadow-jira-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`w-full px-3 py-2 text-sm text-left hover:bg-primary-50 transition-colors flex items-center justify-between ${
                option.value === value ? 'bg-primary-50 text-jira-blue font-medium' : 'text-jira-text'
              }`}
            >
              <span>{option.label}</span>
              {option.value === value && <FiCheck className="text-jira-blue" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}


import React from 'react';
import { cn } from '@/lib/utils';
import { Search, Filter, X } from 'lucide-react';
import { Button } from './button';

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search by medicine or generic name (e.g. Paracetamol, Amoxicillin)...',
  className,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className={cn('relative flex items-center w-full', className)}>
      <div className="relative w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-medilink-muted" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-11 pr-10 py-3 bg-white border border-medilink-border rounded-xl text-sm text-medilink-text placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-medilink-teal focus:border-transparent shadow-sm transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-medilink-muted hover:text-medilink-text p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      {onSearch && (
        <Button type="submit" variant="secondary" className="ml-2 py-3">
          Search
        </Button>
      )}
    </form>
  );
};

export interface FilterBarProps {
  availability: string;
  onAvailabilityChange: (value: string) => void;
  prescriptionOnly: boolean;
  onPrescriptionOnlyChange: (value: boolean) => void;
  category?: string;
  onCategoryChange?: (value: string) => void;
  categories?: string[];
  className?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  availability,
  onAvailabilityChange,
  prescriptionOnly,
  onPrescriptionOnlyChange,
  category,
  onCategoryChange,
  categories = ['All', 'Analgesic', 'Antibiotics', 'Diabetes Care', 'Cardiology', 'Allergy'],
  className,
}) => {
  return (
    <div className={cn('flex flex-wrap items-center gap-3 p-3 bg-white border border-medilink-border rounded-xl shadow-sm text-xs', className)}>
      <div className="flex items-center gap-1.5 text-medilink-muted font-semibold uppercase tracking-wider pr-2 border-r border-medilink-border">
        <Filter className="w-3.5 h-3.5" />
        <span>Filters</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-medilink-muted font-medium">Availability:</span>
        <select
          value={availability}
          onChange={(e) => onAvailabilityChange(e.target.value)}
          className="bg-medilink-surface border border-medilink-border rounded-lg px-2.5 py-1 text-xs text-medilink-text focus:outline-none focus:ring-1 focus:ring-medilink-teal font-medium"
        >
          <option value="ALL">All Statuses</option>
          <option value="AVAILABLE">Available</option>
          <option value="LIMITED">Limited Stock</option>
          <option value="UNAVAILABLE">Unavailable</option>
        </select>
      </div>

      {categories && onCategoryChange && (
        <div className="flex items-center gap-2">
          <span className="text-medilink-muted font-medium">Category:</span>
          <select
            value={category || 'All'}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-medilink-surface border border-medilink-border rounded-lg px-2.5 py-1 text-xs text-medilink-text focus:outline-none focus:ring-1 focus:ring-medilink-teal font-medium"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      )}

      <label className="flex items-center gap-2 ml-auto cursor-pointer select-none">
        <input
          type="checkbox"
          checked={prescriptionOnly}
          onChange={(e) => onPrescriptionOnlyChange(e.target.checked)}
          className="rounded border-medilink-border text-medilink-teal focus:ring-medilink-teal"
        />
        <span className="text-medilink-text font-medium">Prescription Required Only</span>
      </label>
    </div>
  );
};

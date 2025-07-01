'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Filter, ChevronDown } from 'lucide-react';

interface CourseFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { value: 'all', label: 'Alle Kurse' },
  { value: 'enrolled', label: 'Eingeschrieben' },
  { value: 'in_progress', label: 'In Bearbeitung' },
  { value: 'completed', label: 'Abgeschlossen' },
  { value: 'paused', label: 'Pausiert' },
];

export function CourseFilters({ selectedFilter, onFilterChange }: CourseFiltersProps) {
  const currentFilter = filters.find(f => f.value === selectedFilter);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          {currentFilter?.label}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {filters.map((filter) => (
          <DropdownMenuItem
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className="flex items-center justify-between"
          >
            {filter.label}
            {selectedFilter === filter.value && (
              <Badge variant="secondary" className="ml-2">
                Aktiv
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
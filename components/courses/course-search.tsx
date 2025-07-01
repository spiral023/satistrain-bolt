'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface CourseSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function CourseSearch({ value, onChange }: CourseSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Kurse durchsuchen..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
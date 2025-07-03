'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Brain,
  Trophy,
  BarChart3,
  Settings,
  Users,
  MessageSquare,
  Target,
  GraduationCap,
  Zap,
  Menu,
  X,
} from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: BarChart3,
  },
  {
    name: 'Meine Kurse',
    href: '/courses',
    icon: BookOpen,
  },
  {
    name: 'KI-Simulator',
    href: '/simulator',
    icon: Brain,
    badge: 'NEU',
  },
  {
    name: 'Mikro-Lernen',
    href: '/microlearning',
    icon: Zap,
  },
  {
    name: 'Erfolge',
    href: '/achievements',
    icon: Trophy,
  },
  {
    name: 'Rangliste',
    href: '/leaderboard',
    icon: Target,
  },
  {
    name: 'Team-Diskussionen',
    href: '/discussions',
    icon: MessageSquare,
  },
  {
    name: 'Zertifikate',
    href: '/certificates',
    icon: GraduationCap,
  },
];

const adminNavigation = [
  {
    name: 'Benutzerverwaltung',
    href: '/admin/users',
    icon: Users,
  },
  {
    name: 'Systemeinstellungen',
    href: '/admin/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className={cn(
      "flex h-full flex-col border-r border-border bg-card/50",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <GraduationCap className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SatisTrain</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-3 text-left",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span>{item.name}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="mt-8">
            <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Administration
            </h3>
            <nav className="space-y-2">
              {adminNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start gap-3 text-left"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </ScrollArea>

      {/* User Info */}
      {!isCollapsed && (
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">M</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                Max Mustermann
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Level 5 • 1,250 XP
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Download,
  Eye,
  Share,
  Star,
  Calendar,
  Shield,
  Award,
  GraduationCap,
  Trophy,
  CheckCircle,
  Clock,
  Lock,
  ExternalLink,
} from 'lucide-react';

interface CertificateGalleryProps {
  category: string;
  type: string;
  searchQuery: string;
  onPreview: (certificate: any) => void;
  onDownload: (certificate: any) => void;
}

const certificates = [
  {
    id: 'cert-001',
    title: 'Empathische Kommunikation',
    subtitle: 'Grundlagen der Kundenkommunikation',
    type: 'course',
    category: 'completed',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-20',
    expiryDate: '2026-01-20',
    credibilityScore: 95,
    verificationId: 'LH-2024-EC-001',
    skills: ['Empathie', 'Kommunikation', 'Kundenservice'],
    level: 'Fortgeschritten',
    hours: 25,
    grade: 'A+',
    status: 'verified',
    thumbnail: '/certificates/empathy-cert.jpg',
    description: 'Zertifikat für die erfolgreiche Absolvierung des Kurses "Empathische Kommunikation" mit Auszeichnung.',
    icon: GraduationCap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    id: 'cert-002',
    title: 'KI-Simulation Experte',
    subtitle: 'Meisterschaft in KI-gestützten Simulationen',
    type: 'skill',
    category: 'completed',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-15',
    expiryDate: null,
    credibilityScore: 98,
    verificationId: 'LH-2024-AI-002',
    skills: ['KI-Interaktion', 'Problemlösung', 'Simulation'],
    level: 'Experte',
    hours: 40,
    grade: 'A+',
    status: 'verified',
    thumbnail: '/certificates/ai-expert-cert.jpg',
    description: 'Auszeichnung für herausragende Leistungen in KI-gestützten Kundensimulationen.',
    icon: Trophy,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    id: 'cert-003',
    title: 'Konfliktlösung Spezialist',
    subtitle: 'Deeskalation und Problemlösung',
    type: 'course',
    category: 'completed',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-10',
    expiryDate: '2026-01-10',
    credibilityScore: 92,
    verificationId: 'LH-2024-CR-003',
    skills: ['Deeskalation', 'Konfliktlösung', 'Mediation'],
    level: 'Fortgeschritten',
    hours: 30,
    grade: 'A',
    status: 'verified',
    thumbnail: '/certificates/conflict-cert.jpg',
    description: 'Zertifikat für die erfolgreiche Absolvierung des Konfliktlösungs-Kurses.',
    icon: Award,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
  {
    id: 'cert-004',
    title: 'Team-Mentor Zertifikat',
    subtitle: 'Führung und Mentoring',
    type: 'achievement',
    category: 'completed',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-05',
    expiryDate: null,
    credibilityScore: 89,
    verificationId: 'LH-2024-TM-004',
    skills: ['Mentoring', 'Führung', 'Teamarbeit'],
    level: 'Fortgeschritten',
    hours: 20,
    grade: 'A',
    status: 'verified',
    thumbnail: '/certificates/mentor-cert.jpg',
    description: 'Anerkennung für herausragende Mentoring-Leistungen im Team.',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
  },
  {
    id: 'cert-005',
    title: 'Kundenservice Excellence',
    subtitle: 'Professioneller Kundenservice',
    type: 'professional',
    category: 'completed',
    issuer: 'LernHub Academy',
    issuedDate: '2023-12-20',
    expiryDate: '2025-12-20',
    credibilityScore: 96,
    verificationId: 'LH-2023-CSE-005',
    skills: ['Kundenservice', 'Qualitätsmanagement', 'Prozessoptimierung'],
    level: 'Experte',
    hours: 50,
    grade: 'A+',
    status: 'verified',
    thumbnail: '/certificates/excellence-cert.jpg',
    description: 'Professionelles Zertifikat für exzellenten Kundenservice.',
    icon: Award,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
  },
  {
    id: 'cert-006',
    title: 'Digitale Kommunikation',
    subtitle: 'Moderne Kommunikationskanäle',
    type: 'course',
    category: 'in_progress',
    issuer: 'LernHub Academy',
    issuedDate: null,
    expiryDate: null,
    credibilityScore: null,
    verificationId: null,
    skills: ['Digitale Medien', 'Online-Kommunikation', 'Social Media'],
    level: 'Fortgeschritten',
    hours: 35,
    grade: null,
    status: 'in_progress',
    progress: 75,
    thumbnail: '/certificates/digital-cert.jpg',
    description: 'Kurs über moderne digitale Kommunikationsstrategien.',
    icon: GraduationCap,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    id: 'cert-007',
    title: 'Interkulturelle Kompetenz',
    subtitle: 'Globale Kommunikation',
    type: 'course',
    category: 'available',
    issuer: 'LernHub Academy',
    issuedDate: null,
    expiryDate: null,
    credibilityScore: null,
    verificationId: null,
    skills: ['Interkulturelle Kommunikation', 'Diversität', 'Globalisierung'],
    level: 'Fortgeschritten',
    hours: 28,
    grade: null,
    status: 'available',
    progress: 0,
    thumbnail: '/certificates/intercultural-cert.jpg',
    description: 'Entwickeln Sie Fähigkeiten für die interkulturelle Kommunikation.',
    icon: GraduationCap,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    id: 'cert-008',
    title: 'Datenanalyse im Kundenservice',
    subtitle: 'Analytics und Insights',
    type: 'skill',
    category: 'available',
    issuer: 'LernHub Academy',
    issuedDate: null,
    expiryDate: null,
    credibilityScore: null,
    verificationId: null,
    skills: ['Datenanalyse', 'KPIs', 'Reporting'],
    level: 'Experte',
    hours: 45,
    grade: null,
    status: 'available',
    progress: 0,
    thumbnail: '/certificates/analytics-cert.jpg',
    description: 'Lernen Sie, Kundendaten zu analysieren und Insights zu gewinnen.',
    icon: Trophy,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
];

const statusConfig = {
  verified: {
    label: 'Verifiziert',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    icon: Shield,
  },
  in_progress: {
    label: 'In Bearbeitung',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    icon: Clock,
  },
  available: {
    label: 'Verfügbar',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    icon: Lock,
  },
};

const gradeColors = {
  'A+': 'text-green-500',
  'A': 'text-blue-500',
  'B+': 'text-yellow-500',
  'B': 'text-orange-500',
};

export function CertificateGallery({ 
  category, 
  type, 
  searchQuery, 
  onPreview, 
  onDownload 
}: CertificateGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = category === 'all' || cert.category === category;
    const matchesType = type === 'all' || cert.type === type;
    const matchesSearch = cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* View Controls */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {filteredCertificates.length} Zertifikat{filteredCertificates.length !== 1 ? 'e' : ''} gefunden
        </h2>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            Raster
          </Button>
          <Button
            variant={viewMode === 'list' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            Liste
          </Button>
        </div>
      </div>

      {/* Certificates Grid/List */}
      <div className={viewMode === 'grid' 
        ? 'grid gap-6 md:grid-cols-2 lg:grid-cols-3' 
        : 'space-y-4'
      }>
        {filteredCertificates.map((certificate) => {
          const statusInfo = statusConfig[certificate.status as keyof typeof statusConfig];
          const CertIcon = certificate.icon;
          
          return (
            <Card 
              key={certificate.id} 
              className={`bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group border-2 ${certificate.borderColor}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${certificate.bgColor}`}>
                      <CertIcon className={`h-6 w-6 ${certificate.color}`} />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {certificate.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {certificate.subtitle}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={`text-xs ${statusInfo.color} ${statusInfo.bgColor}`}>
                          <statusInfo.icon className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        {certificate.grade && (
                          <Badge variant="outline" className={`text-xs ${gradeColors[certificate.grade as keyof typeof gradeColors]}`}>
                            Note: {certificate.grade}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {certificate.description}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {certificate.hours}h
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    {certificate.level}
                  </div>
                  {certificate.credibilityScore && (
                    <div className="flex items-center gap-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      {certificate.credibilityScore}%
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Fähigkeiten:</h4>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {certificate.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{certificate.skills.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {certificate.status === 'in_progress' && certificate.progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fortschritt</span>
                      <span>{certificate.progress}%</span>
                    </div>
                    <Progress value={certificate.progress} className="h-2" />
                  </div>
                )}

                {certificate.issuedDate && (
                  <div className="text-xs text-muted-foreground">
                    Ausgestellt am {new Date(certificate.issuedDate).toLocaleDateString('de-DE')}
                    {certificate.expiryDate && (
                      <span> • Gültig bis {new Date(certificate.expiryDate).toLocaleDateString('de-DE')}</span>
                    )}
                  </div>
                )}

                {certificate.verificationId && (
                  <div className="text-xs text-muted-foreground font-mono">
                    ID: {certificate.verificationId}
                  </div>
                )}

                <div className="flex gap-2">
                  {certificate.status === 'verified' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => onPreview(certificate)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Vorschau
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onDownload(certificate)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  {certificate.status === 'in_progress' && (
                    <Button className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Fortsetzen
                    </Button>
                  )}
                  
                  {certificate.status === 'available' && (
                    <Button className="flex-1">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Kurs starten
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCertificates.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Keine Zertifikate gefunden
          </h3>
          <p className="text-muted-foreground">
            Versuchen Sie andere Suchbegriffe oder Filter.
          </p>
        </div>
      )}
    </div>
  );
}

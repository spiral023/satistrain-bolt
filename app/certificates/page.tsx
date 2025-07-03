'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/navigation/sidebar';
import { CertificateGallery } from '@/components/certificates/certificate-gallery';
import { CertificatePreview } from '@/components/certificates/certificate-preview';
import { CertificateProgress } from '@/components/certificates/certificate-progress';
import { CertificateSharing } from '@/components/certificates/certificate-sharing';
import { CertificateVerification } from '@/components/certificates/certificate-verification';
import { CertificateTemplates } from '@/components/certificates/certificate-templates';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import {
  GraduationCap,
  Award,
  Download,
  Share,
  Eye,
  Star,
  Trophy,
  Shield,
  Calendar,
  Filter,
  Search,
  Plus,
} from 'lucide-react';

const certificateCategories = [
  {
    id: 'all',
    name: 'Alle',
    count: 12,
  },
  {
    id: 'completed',
    name: 'Erhalten',
    count: 8,
  },
  {
    id: 'in_progress',
    name: 'In Arbeit',
    count: 3,
  },
  {
    id: 'available',
    name: 'Verfügbar',
    count: 15,
  },
];

const certificateTypes = [
  {
    id: 'course',
    name: 'Kurs-Zertifikate',
    icon: GraduationCap,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    count: 5,
  },
  {
    id: 'skill',
    name: 'Fähigkeiten',
    icon: Star,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    count: 4,
  },
  {
    id: 'achievement',
    name: 'Erfolge',
    icon: Trophy,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    count: 3,
  },
  {
    id: 'professional',
    name: 'Beruflich',
    icon: Award,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    count: 2,
  },
];

export default function CertificatesPage() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificateStats, setCertificateStats] = useState({
    totalEarned: 8,
    totalAvailable: 23,
    completionRate: 35,
    credibilityScore: 92,
    verifiedCertificates: 6,
  });

  const handlePreviewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate);
    setShowPreview(true);
  };

  const handleDownloadCertificate = (certificate: any) => {
    // Mock download functionality
    console.log('Downloading certificate:', certificate.id);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex h-16 items-center justify-between px-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-blue-500" />
                Zertifikate & Nachweise
              </h1>
              <p className="text-sm text-muted-foreground">
                Verwalten Sie Ihre Lernzertifikate und teilen Sie Ihre Erfolge
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Shield className="h-3 w-3" />
                {certificateStats.verifiedCertificates} verifiziert
              </Badge>
              <Badge variant="outline" className="gap-1">
                <Award className="h-3 w-3" />
                {certificateStats.totalEarned} erhalten
              </Badge>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Zertifikat beantragen
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Certificate Stats Overview */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {certificateStats.totalEarned}
                  </div>
                  <p className="text-sm text-muted-foreground">Erhalten</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {certificateStats.completionRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Abschlussrate</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {certificateStats.credibilityScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Glaubwürdigkeit</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-500">
                    {certificateStats.verifiedCertificates}
                  </div>
                  <p className="text-sm text-muted-foreground">Verifiziert</p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-500">
                    {certificateStats.totalAvailable}
                  </div>
                  <p className="text-sm text-muted-foreground">Verfügbar</p>
                </CardContent>
              </Card>
            </div>

            {/* Certificate Type Navigation */}
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Zertifikat-Kategorien
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {certificateTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={selectedType === type.id ? "secondary" : "ghost"}
                      className="h-auto p-4 flex flex-col items-center gap-3"
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div className={`p-3 rounded-full ${type.bgColor}`}>
                        <type.icon className={`h-6 w-6 ${type.color}`} />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{type.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {type.count} verfügbar
                        </p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Zertifikate durchsuchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-2">
                {certificateCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name} ({category.count})
                  </Button>
                ))}
              </div>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="gallery" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="gallery">
                  Galerie
                </TabsTrigger>
                <TabsTrigger value="progress">
                  Fortschritt
                </TabsTrigger>
                <TabsTrigger value="verification">
                  Verifizierung
                </TabsTrigger>
                <TabsTrigger value="sharing">
                  Teilen
                </TabsTrigger>
                <TabsTrigger value="templates">
                  Vorlagen
                </TabsTrigger>
              </TabsList>

              <TabsContent value="gallery" className="space-y-6">
                <CertificateGallery 
                  category={selectedCategory}
                  type={selectedType}
                  searchQuery={searchQuery}
                  onPreview={handlePreviewCertificate}
                  onDownload={handleDownloadCertificate}
                />
              </TabsContent>

              <TabsContent value="progress" className="space-y-6">
                <CertificateProgress />
              </TabsContent>

              <TabsContent value="verification" className="space-y-6">
                <CertificateVerification />
              </TabsContent>

              <TabsContent value="sharing" className="space-y-6">
                <CertificateSharing />
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <CertificateTemplates />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Certificate Preview Modal */}
      {showPreview && selectedCertificate && (
        <CertificatePreview
          certificate={selectedCertificate}
          onClose={() => setShowPreview(false)}
          onDownload={() => handleDownloadCertificate(selectedCertificate)}
        />
      )}
    </div>
  );
}
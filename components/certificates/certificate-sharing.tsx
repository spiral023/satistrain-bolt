'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Share,
  Link,
  Mail,
  MessageSquare,
  Globe,
  Eye,
  EyeOff,
  Copy,
  Download,
  QrCode,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Settings,
  Shield,
} from 'lucide-react';

const socialPlatforms = [
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-600',
    bgColor: 'bg-blue-600/10',
    description: 'Teilen Sie Ihre beruflichen Erfolge',
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-500/10',
    description: 'Verkünden Sie Ihre Erfolge',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-700',
    bgColor: 'bg-blue-700/10',
    description: 'Mit Freunden und Familie teilen',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
    description: 'Visuell ansprechend präsentieren',
  },
];

const sharingMethods = [
  {
    id: 'public-link',
    title: 'Öffentlicher Link',
    description: 'Erstellen Sie einen öffentlich zugänglichen Link',
    icon: Link,
    color: 'text-blue-500',
  },
  {
    id: 'email',
    title: 'E-Mail versenden',
    description: 'Senden Sie das Zertifikat direkt per E-Mail',
    icon: Mail,
    color: 'text-green-500',
  },
  {
    id: 'qr-code',
    title: 'QR-Code generieren',
    description: 'Erstellen Sie einen QR-Code für einfaches Teilen',
    icon: QrCode,
    color: 'text-purple-500',
  },
  {
    id: 'embed',
    title: 'Einbetten',
    description: 'Betten Sie das Zertifikat in Ihre Website ein',
    icon: Globe,
    color: 'text-orange-500',
  },
];

const sharedCertificates = [
  {
    id: 'cert-001',
    title: 'Empathische Kommunikation',
    sharedOn: '2024-01-25',
    views: 45,
    platform: 'LinkedIn',
    visibility: 'public',
    link: 'https://lernhub.academy/cert/LH-2024-EC-001',
  },
  {
    id: 'cert-002',
    title: 'KI-Simulation Experte',
    sharedOn: '2024-01-20',
    views: 32,
    platform: 'Twitter',
    visibility: 'public',
    link: 'https://lernhub.academy/cert/LH-2024-AI-002',
  },
  {
    id: 'cert-003',
    title: 'Konfliktlösung Spezialist',
    sharedOn: '2024-01-15',
    views: 28,
    platform: 'E-Mail',
    visibility: 'private',
    link: 'https://lernhub.academy/cert/LH-2024-CR-003',
  },
];

export function CertificateSharing() {
  const [selectedMethod, setSelectedMethod] = useState('public-link');
  const [shareSettings, setShareSettings] = useState({
    includeGrade: true,
    includeSkills: true,
    includeVerification: true,
    allowPublicView: true,
    requireAuthentication: false,
    expirationDate: '',
    customMessage: '',
  });
  const [emailRecipients, setEmailRecipients] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const handleGenerateLink = () => {
    const link = `https://lernhub.academy/cert/shared/${Date.now()}`;
    setGeneratedLink(link);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  const handleSocialShare = (platform: string, certificateTitle: string) => {
    const text = `Ich habe erfolgreich das Zertifikat "${certificateTitle}" bei LernHub Academy erhalten! 🎓`;
    const url = generatedLink || 'https://lernhub.academy';
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: '#', // Instagram doesn't support direct URL sharing
    };
    
    if (shareUrls[platform as keyof typeof shareUrls] !== '#') {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
  };

  return (
    <div className="space-y-6">
      {/* Sharing Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">3</div>
            <p className="text-sm text-muted-foreground">Geteilte Zertifikate</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">105</div>
            <p className="text-sm text-muted-foreground">Gesamtaufrufe</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">35</div>
            <p className="text-sm text-muted-foreground">Ø Aufrufe/Zertifikat</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">12</div>
            <p className="text-sm text-muted-foreground">Verifikationen</p>
          </CardContent>
        </Card>
      </div>

      {/* Sharing Methods */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share className="h-5 w-5 text-primary" />
            Zertifikat teilen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {sharingMethods.map((method) => (
              <Button
                key={method.id}
                variant={selectedMethod === method.id ? "secondary" : "outline"}
                className="h-auto p-4 flex flex-col items-center gap-3"
                onClick={() => setSelectedMethod(method.id)}
              >
                <method.icon className={`h-6 w-6 ${method.color}`} />
                <div className="text-center">
                  <p className="font-medium">{method.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {method.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>

          {/* Sharing Settings */}
          <Card className="bg-muted/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Freigabe-Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-grade">Note anzeigen</Label>
                    <p className="text-sm text-muted-foreground">Zeigt Ihre Bewertung im Zertifikat</p>
                  </div>
                  <Switch
                    id="include-grade"
                    checked={shareSettings.includeGrade}
                    onCheckedChange={(checked) => 
                      setShareSettings(prev => ({ ...prev, includeGrade: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-skills">Fähigkeiten anzeigen</Label>
                    <p className="text-sm text-muted-foreground">Listet erworbene Fähigkeiten auf</p>
                  </div>
                  <Switch
                    id="include-skills"
                    checked={shareSettings.includeSkills}
                    onCheckedChange={(checked) => 
                      setShareSettings(prev => ({ ...prev, includeSkills: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="include-verification">Verifikation anzeigen</Label>
                    <p className="text-sm text-muted-foreground">Zeigt Verifikations-ID und Status</p>
                  </div>
                  <Switch
                    id="include-verification"
                    checked={shareSettings.includeVerification}
                    onCheckedChange={(checked) => 
                      setShareSettings(prev => ({ ...prev, includeVerification: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="public-view">Öffentlich sichtbar</Label>
                    <p className="text-sm text-muted-foreground">Jeder kann das Zertifikat einsehen</p>
                  </div>
                  <Switch
                    id="public-view"
                    checked={shareSettings.allowPublicView}
                    onCheckedChange={(checked) => 
                      setShareSettings(prev => ({ ...prev, allowPublicView: checked }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-message">Persönliche Nachricht (optional)</Label>
                <Textarea
                  id="custom-message"
                  placeholder="Fügen Sie eine persönliche Nachricht hinzu..."
                  value={shareSettings.customMessage}
                  onChange={(e) => 
                    setShareSettings(prev => ({ ...prev, customMessage: e.target.value }))
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Method-specific Content */}
          {selectedMethod === 'public-link' && (
            <div className="space-y-4">
              <Button onClick={handleGenerateLink} className="w-full">
                <Link className="h-4 w-4 mr-2" />
                Öffentlichen Link generieren
              </Button>
              
              {generatedLink && (
                <div className="space-y-2">
                  <Label>Generierter Link:</Label>
                  <div className="flex gap-2">
                    <Input value={generatedLink} readOnly />
                    <Button variant="outline" onClick={handleCopyLink}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {selectedMethod === 'email' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-recipients">E-Mail-Empfänger</Label>
                <Input
                  id="email-recipients"
                  placeholder="empfaenger@beispiel.de, weitere@beispiel.de"
                  value={emailRecipients}
                  onChange={(e) => setEmailRecipients(e.target.value)}
                />
              </div>
              <Button className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                E-Mail versenden
              </Button>
            </div>
          )}

          {selectedMethod === 'qr-code' && (
            <div className="text-center space-y-4">
              <div className="w-48 h-48 bg-muted rounded-lg mx-auto flex items-center justify-center">
                <QrCode className="h-24 w-24 text-muted-foreground" />
              </div>
              <Button className="w-full">
                <Download className="h-4 w-4 mr-2" />
                QR-Code herunterladen
              </Button>
            </div>
          )}

          {selectedMethod === 'embed' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Embed-Code:</Label>
                <Textarea
                  readOnly
                  value={`<iframe src="https://lernhub.academy/embed/cert/LH-2024-EC-001" width="400" height="300" frameborder="0"></iframe>`}
                  className="font-mono text-sm"
                />
              </div>
              <Button variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                Code kopieren
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Social Media Sharing */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Social Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {socialPlatforms.map((platform) => (
              <Button
                key={platform.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-center gap-3"
                onClick={() => handleSocialShare(platform.id, 'Empathische Kommunikation')}
              >
                <div className={`p-3 rounded-full ${platform.bgColor}`}>
                  <platform.icon className={`h-6 w-6 ${platform.color}`} />
                </div>
                <div className="text-center">
                  <p className="font-medium">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {platform.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shared Certificates */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-green-500" />
            Geteilte Zertifikate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sharedCertificates.map((cert) => (
              <div key={cert.id} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Geteilt am {new Date(cert.sharedOn).toLocaleDateString('de-DE')} über {cert.platform}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className={cert.visibility === 'public' ? 'text-green-500' : 'text-orange-500'}>
                        {cert.visibility === 'public' ? (
                          <Eye className="h-3 w-3 mr-1" />
                        ) : (
                          <EyeOff className="h-3 w-3 mr-1" />
                        )}
                        {cert.visibility === 'public' ? 'Öffentlich' : 'Privat'}
                      </Badge>
                      <span className="text-muted-foreground">
                        {cert.views} Aufrufe
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground font-mono">
                      {cert.link}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Privacy Information */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-500" />
            Datenschutz & Sicherheit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-blue-500 mb-1">Kontrolle über Ihre Daten</h4>
              <p className="text-sm text-muted-foreground">
                Sie behalten die volle Kontrolle darüber, wer Ihre Zertifikate sehen kann und welche Informationen geteilt werden.
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-green-500 mb-1">Sichere Übertragung</h4>
              <p className="text-sm text-muted-foreground">
                Alle geteilten Links sind verschlüsselt und können jederzeit widerrufen werden.
              </p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <h4 className="font-medium text-purple-500 mb-1">Authentizität garantiert</h4>
              <p className="text-sm text-muted-foreground">
                Jedes geteilte Zertifikat enthält Verifikationsmechanismen zur Bestätigung der Echtheit.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
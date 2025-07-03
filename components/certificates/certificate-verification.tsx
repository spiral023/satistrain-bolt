'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Search,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Copy,
  QrCode,
  Globe,
  Lock,
  Eye,
  Download,
} from 'lucide-react';

const verificationMethods = [
  {
    id: 'id-lookup',
    title: 'Verifikations-ID Suche',
    description: 'Geben Sie die Verifikations-ID ein, um ein Zertifikat zu überprüfen',
    icon: Search,
    color: 'text-blue-500',
  },
  {
    id: 'qr-scan',
    title: 'QR-Code Scanner',
    description: 'Scannen Sie den QR-Code auf dem Zertifikat',
    icon: QrCode,
    color: 'text-purple-500',
  },
  {
    id: 'blockchain',
    title: 'Blockchain-Verifikation',
    description: 'Überprüfung über die Blockchain für maximale Sicherheit',
    icon: Lock,
    color: 'text-green-500',
  },
];

const verifiedCertificates = [
  {
    id: 'LH-2024-EC-001',
    holder: 'Max Mustermann',
    title: 'Empathische Kommunikation',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-20',
    status: 'verified',
    credibilityScore: 95,
    verificationCount: 12,
    lastVerified: '2024-01-25',
  },
  {
    id: 'LH-2024-AI-002',
    holder: 'Max Mustermann',
    title: 'KI-Simulation Experte',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-15',
    status: 'verified',
    credibilityScore: 98,
    verificationCount: 8,
    lastVerified: '2024-01-24',
  },
  {
    id: 'LH-2024-CR-003',
    holder: 'Max Mustermann',
    title: 'Konfliktlösung Spezialist',
    issuer: 'LernHub Academy',
    issuedDate: '2024-01-10',
    status: 'verified',
    credibilityScore: 92,
    verificationCount: 15,
    lastVerified: '2024-01-23',
  },
];

const verificationStats = {
  totalVerifications: 35,
  successRate: 97,
  averageResponseTime: '0.8s',
  blockchainVerified: 28,
};

export function CertificateVerification() {
  const [selectedMethod, setSelectedMethod] = useState('id-lookup');
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerification = async () => {
    if (!verificationId.trim()) return;
    
    setIsVerifying(true);
    
    // Simulate verification process
    setTimeout(() => {
      const found = verifiedCertificates.find(cert => cert.id === verificationId);
      setVerificationResult(found || { status: 'not_found' });
      setIsVerifying(false);
    }, 1500);
  };

  const copyVerificationLink = (id: string) => {
    const link = `https://lernhub.academy/verify/${id}`;
    navigator.clipboard.writeText(link);
  };

  return (
    <div className="space-y-6">
      {/* Verification Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {verificationStats.totalVerifications}
            </div>
            <p className="text-sm text-muted-foreground">Verifikationen</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {verificationStats.successRate}%
            </div>
            <p className="text-sm text-muted-foreground">Erfolgsrate</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {verificationStats.averageResponseTime}
            </div>
            <p className="text-sm text-muted-foreground">Ø Antwortzeit</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {verificationStats.blockchainVerified}
            </div>
            <p className="text-sm text-muted-foreground">Blockchain</p>
          </CardContent>
        </Card>
      </div>

      {/* Verification Methods */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-500" />
            Zertifikat verifizieren
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {verificationMethods.map((method) => (
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

          {selectedMethod === 'id-lookup' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="verification-id">Verifikations-ID</Label>
                <div className="flex gap-2">
                  <Input
                    id="verification-id"
                    placeholder="z.B. LH-2024-EC-001"
                    value={verificationId}
                    onChange={(e) => setVerificationId(e.target.value)}
                  />
                  <Button 
                    onClick={handleVerification}
                    disabled={!verificationId.trim() || isVerifying}
                  >
                    {isVerifying ? 'Prüfe...' : 'Verifizieren'}
                  </Button>
                </div>
              </div>

              {verificationResult && (
                <Alert className={verificationResult.status === 'verified' ? 'border-green-500' : 'border-red-500'}>
                  <div className="flex items-center gap-2">
                    {verificationResult.status === 'verified' ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                    )}
                    <AlertDescription>
                      {verificationResult.status === 'verified' ? (
                        <div>
                          <p className="font-medium text-green-600">Zertifikat erfolgreich verifiziert!</p>
                          <div className="mt-2 space-y-1 text-sm">
                            <p><strong>Inhaber:</strong> {verificationResult.holder}</p>
                            <p><strong>Titel:</strong> {verificationResult.title}</p>
                            <p><strong>Aussteller:</strong> {verificationResult.issuer}</p>
                            <p><strong>Ausgestellt:</strong> {new Date(verificationResult.issuedDate).toLocaleDateString('de-DE')}</p>
                            <p><strong>Glaubwürdigkeit:</strong> {verificationResult.credibilityScore}%</p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-red-600">Zertifikat nicht gefunden oder ungültig.</p>
                      )}
                    </AlertDescription>
                  </div>
                </Alert>
              )}
            </div>
          )}

          {selectedMethod === 'qr-scan' && (
            <div className="text-center py-8">
              <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">QR-Code Scanner</h3>
              <p className="text-muted-foreground mb-4">
                Verwenden Sie Ihre Kamera, um den QR-Code auf dem Zertifikat zu scannen.
              </p>
              <Button>
                <QrCode className="h-4 w-4 mr-2" />
                Scanner starten
              </Button>
            </div>
          )}

          {selectedMethod === 'blockchain' && (
            <div className="text-center py-8">
              <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Blockchain-Verifikation</h3>
              <p className="text-muted-foreground mb-4">
                Überprüfen Sie die Authentizität über unsere Blockchain-Integration.
              </p>
              <Button>
                <Lock className="h-4 w-4 mr-2" />
                Blockchain prüfen
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* My Verified Certificates */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            Meine verifizierten Zertifikate
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {verifiedCertificates.map((cert) => (
              <div key={cert.id} className="p-4 rounded-lg border bg-muted/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div>
                      <h3 className="font-semibold">{cert.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {new Date(cert.issuedDate).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <Badge variant="outline" className="text-green-500">
                        <Shield className="h-3 w-3 mr-1" />
                        Verifiziert
                      </Badge>
                      <span className="text-muted-foreground">
                        {cert.verificationCount} Verifikationen
                      </span>
                      <span className="text-muted-foreground">
                        Glaubwürdigkeit: {cert.credibilityScore}%
                      </span>
                    </div>
                    
                    <div className="text-xs text-muted-foreground font-mono">
                      ID: {cert.id}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => copyVerificationLink(cert.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Verification Information */}
      <Card className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            Verifikations-Informationen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">Für Arbeitgeber</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Verifizieren Sie die Authentizität von Zertifikaten Ihrer Bewerber oder Mitarbeiter.
              </p>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Arbeitgeber-Portal
              </Button>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Öffentliche Verifikation</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Jeder kann die Echtheit unserer Zertifikate über unsere öffentliche API überprüfen.
              </p>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                API-Dokumentation
              </Button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-border/20">
            <h4 className="font-medium mb-2">Sicherheitsfeatures</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Blockchain-basierte Unveränderlichkeit</li>
              <li>• Kryptographische Signaturen</li>
              <li>• Zeitstempel-Verifikation</li>
              <li>• Automatische Gültigkeitsprüfung</li>
              <li>• Revocation-Status-Checking</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  X,
  Download,
  Share,
  ExternalLink,
  Shield,
  Calendar,
  Award,
  Star,
  CheckCircle,
} from 'lucide-react';

interface CertificatePreviewProps {
  certificate: any;
  onClose: () => void;
  onDownload: () => void;
}

export function CertificatePreview({ certificate, onClose, onDownload }: CertificatePreviewProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold">Zertifikat-Vorschau</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Certificate Display */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-8 border-2 border-primary/20">
            {/* Certificate Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Award className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Zertifikat der Vollendung
              </h1>
              <p className="text-lg text-muted-foreground">
                LernHub Academy
              </p>
            </div>

            {/* Certificate Body */}
            <div className="text-center mb-8">
              <p className="text-lg mb-4">
                Hiermit wird bestätigt, dass
              </p>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Max Mustermann
              </h2>
              <p className="text-lg mb-2">
                erfolgreich den Kurs
              </p>
              <h3 className="text-2xl font-semibold text-primary mb-4">
                {certificate.title}
              </h3>
              <p className="text-lg mb-6">
                abgeschlossen hat
              </p>
              
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">
                    {certificate.grade}
                  </div>
                  <p className="text-sm text-muted-foreground">Note</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">
                    {certificate.hours}h
                  </div>
                  <p className="text-sm text-muted-foreground">Lernstunden</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-500">
                    {certificate.credibilityScore}%
                  </div>
                  <p className="text-sm text-muted-foreground">Glaubwürdigkeit</p>
                </div>
              </div>
            </div>

            {/* Certificate Footer */}
            <div className="flex justify-between items-end">
              <div>
                <p className="text-sm text-muted-foreground">Ausgestellt am</p>
                <p className="font-semibold">
                  {new Date(certificate.issuedDate).toLocaleDateString('de-DE')}
                </p>
                {certificate.expiryDate && (
                  <>
                    <p className="text-sm text-muted-foreground mt-2">Gültig bis</p>
                    <p className="font-semibold">
                      {new Date(certificate.expiryDate).toLocaleDateString('de-DE')}
                    </p>
                  </>
                )}
              </div>
              
              <div className="text-right">
                <div className="mb-2">
                  <div className="w-24 h-0.5 bg-foreground mb-1"></div>
                  <p className="text-sm font-semibold">Dr. Sarah Schmidt</p>
                  <p className="text-xs text-muted-foreground">Akademische Leiterin</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span className="text-green-500">Verifiziert</span>
                </div>
              </div>
            </div>

            {/* Verification ID */}
            <div className="mt-6 pt-4 border-t border-border/20 text-center">
              <p className="text-xs text-muted-foreground">
                Verifikations-ID: {certificate.verificationId}
              </p>
              <p className="text-xs text-muted-foreground">
                Verifizieren Sie dieses Zertifikat unter: lernhub.academy/verify
              </p>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  Erworbene Fähigkeiten
                </h4>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Zertifikat-Details
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Typ:</span>
                    <span className="font-medium">{certificate.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span className="font-medium">{certificate.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aussteller:</span>
                    <span className="font-medium">{certificate.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant="outline" className="text-green-500">
                      Verifiziert
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 p-6 border-t border-border">
          <Button onClick={onDownload} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            PDF herunterladen
          </Button>
          <Button variant="outline" className="flex-1">
            <Share className="h-4 w-4 mr-2" />
            Teilen
          </Button>
          <Button variant="outline" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            Verifizieren
          </Button>
        </div>
      </div>
    </div>
  );
}
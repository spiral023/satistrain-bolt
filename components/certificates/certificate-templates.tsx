'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Palette,
  Layout,
  Type,
  Image,
  Download,
  Eye,
  Edit,
  Copy,
  Star,
  Crown,
  Award,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';

const certificateTemplates = [
  {
    id: 'classic-blue',
    name: 'Klassisch Blau',
    description: 'Traditionelles Design mit professionellem blauen Farbschema',
    category: 'Professional',
    style: 'classic',
    colors: ['#1e40af', '#3b82f6', '#60a5fa'],
    preview: '/templates/classic-blue.jpg',
    features: ['Elegante Typografie', 'Goldene Akzente', 'Traditionelles Layout'],
    popularity: 95,
    downloads: 1240,
    icon: Award,
    isPremium: false,
  },
  {
    id: 'modern-gradient',
    name: 'Moderner Gradient',
    description: 'Zeitgemäßes Design mit dynamischen Farbverläufen',
    category: 'Modern',
    style: 'modern',
    colors: ['#8b5cf6', '#a855f7', '#c084fc'],
    preview: '/templates/modern-gradient.jpg',
    features: ['Gradient-Hintergründe', 'Moderne Typografie', 'Minimalistisch'],
    popularity: 88,
    downloads: 856,
    icon: Sparkles,
    isPremium: true,
  },
  {
    id: 'corporate-gold',
    name: 'Corporate Gold',
    description: 'Luxuriöses Design für hochwertige Zertifikate',
    category: 'Luxury',
    style: 'luxury',
    colors: ['#d97706', '#f59e0b', '#fbbf24'],
    preview: '/templates/corporate-gold.jpg',
    features: ['Goldene Elemente', 'Premium-Typografie', 'Luxuriöse Ornamente'],
    popularity: 92,
    downloads: 1120,
    icon: Crown,
    isPremium: true,
  },
  {
    id: 'tech-minimal',
    name: 'Tech Minimal',
    description: 'Minimalistisches Design für technische Zertifikate',
    category: 'Technology',
    style: 'minimal',
    colors: ['#059669', '#10b981', '#34d399'],
    preview: '/templates/tech-minimal.jpg',
    features: ['Klare Linien', 'Technische Elemente', 'Moderne Icons'],
    popularity: 85,
    downloads: 734,
    icon: Zap,
    isPremium: false,
  },
  {
    id: 'academic-traditional',
    name: 'Akademisch Traditionell',
    description: 'Klassisches akademisches Design für Bildungszertifikate',
    category: 'Academic',
    style: 'traditional',
    colors: ['#7c2d12', '#dc2626', '#ef4444'],
    preview: '/templates/academic-traditional.jpg',
    features: ['Akademische Symbole', 'Traditionelle Farben', 'Formelles Layout'],
    popularity: 90,
    downloads: 945,
    icon: Shield,
    isPremium: false,
  },
  {
    id: 'creative-artistic',
    name: 'Kreativ Künstlerisch',
    description: 'Künstlerisches Design für kreative Zertifikate',
    category: 'Creative',
    style: 'artistic',
    colors: ['#be185d', '#e11d48', '#f43f5e'],
    preview: '/templates/creative-artistic.jpg',
    features: ['Künstlerische Elemente', 'Kreative Typografie', 'Farbenfrohe Akzente'],
    popularity: 78,
    downloads: 623,
    icon: Palette,
    isPremium: true,
  },
];

const customizationOptions = [
  {
    id: 'colors',
    name: 'Farben',
    description: 'Passen Sie das Farbschema an',
    icon: Palette,
    options: ['Primärfarbe', 'Sekundärfarbe', 'Akzentfarbe', 'Textfarbe'],
  },
  {
    id: 'typography',
    name: 'Typografie',
    description: 'Wählen Sie Schriftarten und -größen',
    icon: Type,
    options: ['Hauptschrift', 'Überschrift', 'Textgröße', 'Zeilenabstand'],
  },
  {
    id: 'layout',
    name: 'Layout',
    description: 'Anordnung der Elemente anpassen',
    icon: Layout,
    options: ['Ausrichtung', 'Abstände', 'Rahmen', 'Hintergrund'],
  },
  {
    id: 'branding',
    name: 'Branding',
    description: 'Logo und Markenelemente hinzufügen',
    icon: Image,
    options: ['Logo', 'Wasserzeichen', 'Signatur', 'QR-Code'],
  },
];

const templateCategories = [
  { id: 'all', name: 'Alle', count: 6 },
  { id: 'Professional', name: 'Professionell', count: 2 },
  { id: 'Modern', name: 'Modern', count: 1 },
  { id: 'Luxury', name: 'Luxus', count: 1 },
  { id: 'Technology', name: 'Technologie', count: 1 },
  { id: 'Academic', name: 'Akademisch', count: 1 },
  { id: 'Creative', name: 'Kreativ', count: 1 },
];

export function CertificateTemplates() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [customSettings, setCustomSettings] = useState({
    primaryColor: '#1e40af',
    secondaryColor: '#3b82f6',
    fontFamily: 'Inter',
    fontSize: '16',
    logoUrl: '',
    customText: '',
  });

  const filteredTemplates = selectedCategory === 'all' 
    ? certificateTemplates 
    : certificateTemplates.filter(template => template.category === selectedCategory);

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setShowCustomization(true);
  };

  const handleDownloadTemplate = (template: any) => {
    console.log('Downloading template:', template.id);
  };

  return (
    <div className="space-y-6">
      {/* Template Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">
              {certificateTemplates.length}
            </div>
            <p className="text-sm text-muted-foreground">Verfügbare Vorlagen</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500">
              {certificateTemplates.filter(t => !t.isPremium).length}
            </div>
            <p className="text-sm text-muted-foreground">Kostenlos</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-500">
              {certificateTemplates.filter(t => t.isPremium).length}
            </div>
            <p className="text-sm text-muted-foreground">Premium</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-500">
              {certificateTemplates.reduce((sum, t) => sum + t.downloads, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Downloads</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {templateCategories.map((category) => (
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

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-200 group">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <template.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {template.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {template.category}
                    </p>
                  </div>
                </div>
                {template.isPremium && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    Premium
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Template Preview */}
              <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Layout className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Vorschau</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                {template.description}
              </p>

              {/* Color Palette */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Farben:</span>
                <div className="flex gap-1">
                  {template.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-4 h-4 rounded-full border border-border"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {template.features.slice(0, 2).map((feature, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {template.features.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{template.features.length - 2}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-500" />
                  {template.popularity}%
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  {template.downloads}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Vorschau
                </Button>
                <Button 
                  size="sm" 
                  className="flex-1"
                  onClick={() => handleDownloadTemplate(template)}
                  disabled={template.isPremium}
                >
                  <Download className="h-4 w-4 mr-2" />
                  {template.isPremium ? 'Premium' : 'Verwenden'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Template Customization */}
      {showCustomization && selectedTemplate && (
        <Card className="bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Vorlage anpassen: {selectedTemplate.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Customization Options */}
              <div className="space-y-4">
                {customizationOptions.map((option) => (
                  <Card key={option.id} className="bg-muted/20">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <option.icon className="h-4 w-4" />
                        {option.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {option.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {option.id === 'colors' && (
                        <div className="space-y-2">
                          <Label htmlFor="primary-color">Primärfarbe</Label>
                          <div className="flex gap-2">
                            <Input
                              id="primary-color"
                              type="color"
                              value={customSettings.primaryColor}
                              onChange={(e) => setCustomSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="w-16 h-8"
                            />
                            <Input
                              value={customSettings.primaryColor}
                              onChange={(e) => setCustomSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                              className="flex-1"
                            />
                          </div>
                        </div>
                      )}
                      
                      {option.id === 'typography' && (
                        <div className="space-y-2">
                          <Label htmlFor="font-family">Schriftart</Label>
                          <select 
                            id="font-family"
                            className="w-full p-2 border border-border rounded-md bg-background"
                            value={customSettings.fontFamily}
                            onChange={(e) => setCustomSettings(prev => ({ ...prev, fontFamily: e.target.value }))}
                          >
                            <option value="Inter">Inter</option>
                            <option value="Roboto">Roboto</option>
                            <option value="Open Sans">Open Sans</option>
                            <option value="Playfair Display">Playfair Display</option>
                          </select>
                        </div>
                      )}
                      
                      {option.id === 'branding' && (
                        <div className="space-y-2">
                          <Label htmlFor="logo-url">Logo URL</Label>
                          <Input
                            id="logo-url"
                            placeholder="https://beispiel.de/logo.png"
                            value={customSettings.logoUrl}
                            onChange={(e) => setCustomSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Live Preview */}
              <div className="space-y-4">
                <h3 className="font-medium">Live-Vorschau</h3>
                <div className="aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                  <div className="text-center">
                    <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Zertifikat-Vorschau wird hier angezeigt
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Herunterladen
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Copy className="h-4 w-4 mr-2" />
                    Als Vorlage speichern
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Premium Templates Info */}
      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-yellow-500" />
            Premium-Vorlagen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Erhalten Sie Zugang zu exklusiven Premium-Vorlagen mit erweiterten Anpassungsoptionen 
              und professionellen Designs.
            </p>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">15+</div>
                <p className="text-sm text-muted-foreground">Premium-Vorlagen</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-500">∞</div>
                <p className="text-sm text-muted-foreground">Anpassungen</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">24/7</div>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
            
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600">
              <Crown className="h-4 w-4 mr-2" />
              Premium upgraden
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
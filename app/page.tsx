'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Brain,
  Trophy,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  BarChart3,
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'KI-gestützte Simulationen',
    description: 'Übe realistische Kundengespräche mit fortschrittlicher KI, die echte Empathie und Kommunikationsfähigkeiten bewertet.',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Trophy,
    title: 'Gamification & Belohnungen',
    description: 'Sammle Punkte, verdiene Abzeichen und steige in Levels auf. Konkuriere mit Teammitgliedern in wöchentlichen Herausforderungen.',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
  },
  {
    icon: Target,
    title: 'Personalisierte Lernpfade',
    description: 'Erhalte maßgeschneiderte Kurse basierend auf deiner Rolle, deinem Fortschritt und identifizierten Verbesserungsbereichen.',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Users,
    title: 'Soziales Lernen',
    description: 'Tausche dich mit Kollegen aus, gib Feedback zu Simulationen und lerne voneinander in Diskussionsforen.',
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: BarChart3,
    title: 'Analytik & Einblicke',
    description: 'Verfolge deinen Fortschritt mit detaillierten Analysen und identifiziere Bereiche für weitere Verbesserungen.',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Sparkles,
    title: 'Mikro-Lernen',
    description: 'Kurze, effektive Lerneinheiten von 3-5 Minuten, die perfekt in deinen Arbeitsalltag passen.',
    color: 'text-pink-500',
    bgColor: 'bg-pink-500/10',
  },
];

const stats = [
  { label: 'Aktive Lerner', value: '2,500+' },
  { label: 'Kurse verfügbar', value: '50+' },
  { label: 'Durchschnittliche Verbesserung', value: '85%' },
  { label: 'Simulationen pro Monat', value: '10k+' },
];

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  useEffect(() => {
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "SatisTrain",
      "alternateName": "SatisTrain - KI-gestützte Kundenservice-Schulungen",
      "url": "https://satistrain-bolt.netlify.app",
      "logo": "https://satistrain-bolt.netlify.app/logo.png",
      "description": "Revolutioniere dein Kundenservice-Training mit KI-gestützten Simulationen, Gamification und personalisierten Lernpfaden. Über 2.500 aktive Lerner vertrauen uns.",
      "foundingDate": "2024",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "DE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "German"
      },
      "sameAs": [
        "https://twitter.com/SatisTrain",
        "https://linkedin.com/company/satistrain"
      ],
      "offers": {
        "@type": "Offer",
        "category": "Education",
        "name": "Kundenservice-Training",
        "description": "KI-gestützte Simulationen und personalisierte Lernpfade für besseren Kundenservice"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Kurskatalog",
        "itemListElement": [
          {
            "@type": "Course",
            "name": "KI-gestützte Simulationen",
            "description": "Übe realistische Kundengespräche mit fortschrittlicher KI",
            "provider": {
              "@type": "Organization",
              "name": "SatisTrain"
            }
          },
          {
            "@type": "Course", 
            "name": "Personalisierte Lernpfade",
            "description": "Maßgeschneiderte Kurse basierend auf deiner Rolle und deinem Fortschritt",
            "provider": {
              "@type": "Organization",
              "name": "SatisTrain"
            }
          }
        ]
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "2500",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Anonymer Nutzer"
          },
          "reviewBody": "Hervorragende Plattform für Kundenservice-Training mit innovativen KI-Simulationen."
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
        <div className="relative">
          <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="mb-8 flex justify-center">
                <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-white/10 hover:ring-white/20 transition-all">
                  Revolutioniere dein Kundenservice-Training{' '}
                  <a href="#features" className="font-semibold text-primary">
                    <span className="absolute inset-0" aria-hidden="true" />
                    Mehr erfahren <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Meistere{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                  Kundenzufriedenheit
                </span>{' '}
                mit KI
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Unsere moderne Lernplattform kombiniert KI-gestützte Simulationen, 
                Gamification und personalisierte Lernpfade, um deine Kundenservice-Fähigkeiten 
                auf das nächste Level zu bringen.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button 
                  onClick={handleGetStarted}
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Jetzt starten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg">
                  Demo ansehen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Vertrauen von Tausenden
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Unternehmen weltweit nutzen unsere Plattform für besseren Kundenservice
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col bg-white/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="order-first text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mx-auto max-w-7xl px-6 lg:px-8 mb-24">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Alles was du brauchst
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Modernste Lernumgebung für Kundenservice
          </p>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Unsere Plattform bietet alle Werkzeuge, die du benötigst, um deine 
            Kundenservice-Fähigkeiten kontinuierlich zu verbessern und zu perfektionieren.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-border transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold leading-8 text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-base leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </dl>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-blue-900/20 to-purple-900/20">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bereit für besseren Kundenservice?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Starte noch heute und erlebe den Unterschied, den erstklassiges 
              Kundenservice-Training für dein Team machen kann.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button 
                onClick={handleGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Kostenlos starten
              </Button>
              <Button variant="ghost" size="lg" className="text-foreground">
                Kontakt aufnehmen <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">LernHub</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 LernHub. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

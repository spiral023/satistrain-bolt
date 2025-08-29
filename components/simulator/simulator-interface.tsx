'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Mic,
  MicOff,
  Pause,
  Play,
  RotateCcw,
  X,
  User,
  Bot,
  Clock,
  Star,
  Heart,
  Target,
  MessageSquare,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface SimulatorInterfaceProps {
  scenario: any;
  mode: string;
  onEndSimulation: () => void;
}

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  score?: {
    empathy: number;
    clarity: number;
    helpfulness: number;
    overall: number;
  };
  feedback?: string;
}

// Move static data outside component to prevent recreation on every render
const AI_PERSONALITIES = {
  frustrated: {
    name: 'Frustrierter Kunde',
    avatar: '😤',
    mood: 'Verärgert',
    difficulty: 'Hoch',
    traits: ['Ungeduldig', 'Emotional', 'Fordernd'],
    background: 'Ein langjähriger Kunde, der bereits mehrere schlechte Erfahrungen gemacht hat',
    goals: ['Schnelle Lösung', 'Entschädigung', 'Garantie für Zukunft'],
    triggers: ['Lange Wartezeiten', 'Standardantworten', 'Weiterleitungen'],
    communication: 'Direkt, emotional, unterbricht häufig',
  },
  confused: {
    name: 'Verwirrter Kunde',
    avatar: '😕',
    mood: 'Verwirrt',
    difficulty: 'Mittel',
    traits: ['Unsicher', 'Fragend', 'Hilfsbereit'],
    background: 'Neuer Kunde mit wenig technischem Verständnis',
    goals: ['Verständnis erlangen', 'Schritt-für-Schritt Anleitung', 'Sicherheit gewinnen'],
    triggers: ['Komplexe Erklärungen', 'Fachbegriffe', 'Zu schnelle Lösungen'],
    communication: 'Zögerlich, stellt viele Rückfragen, braucht Bestätigung',
  },
  polite: {
    name: 'Höflicher Kunde',
    avatar: '😊',
    mood: 'Freundlich',
    difficulty: 'Niedrig',
    traits: ['Geduldig', 'Verständnisvoll', 'Kooperativ'],
    background: 'Erfahrener Kunde mit realistischen Erwartungen',
    goals: ['Effiziente Lösung', 'Gute Beratung', 'Positive Erfahrung'],
    triggers: ['Unhöflichkeit', 'Inkompetenz', 'Unehrlichkeit'],
    communication: 'Respektvoll, strukturiert, lösungsorientiert',
  },
  anxious: {
    name: 'Ängstlicher Kunde',
    avatar: '😰',
    mood: 'Besorgt',
    difficulty: 'Hoch',
    traits: ['Nervös', 'Übervorsichtig', 'Pessimistisch'],
    background: 'Kunde mit schlechten Erfahrungen bei anderen Anbietern',
    goals: ['Sicherheit', 'Vertrauen aufbauen', 'Risiken minimieren'],
    triggers: ['Unklare Aussagen', 'Druck', 'Schnelle Entscheidungen'],
    communication: 'Zögerlich, stellt viele Sicherheitsfragen, braucht Beruhigung',
  },
  expert: {
    name: 'Technischer Experte',
    avatar: '🤓',
    mood: 'Analytisch',
    difficulty: 'Mittel',
    traits: ['Detailorientiert', 'Kritisch', 'Präzise'],
    background: 'IT-Fachkraft mit tiefem technischen Verständnis',
    goals: ['Detaillierte Informationen', 'Technische Spezifikationen', 'Optimale Lösung'],
    triggers: ['Oberflächliche Antworten', 'Falsche Informationen', 'Vereinfachungen'],
    communication: 'Fachlich, präzise, erwartet kompetente Antworten',
  },
  elderly: {
    name: 'Älterer Kunde',
    avatar: '👴',
    mood: 'Bedächtig',
    difficulty: 'Mittel',
    traits: ['Traditionell', 'Vorsichtig', 'Erfahren'],
    background: 'Langjähriger Kunde mit traditionellen Erwartungen',
    goals: ['Persönlicher Service', 'Einfache Lösungen', 'Vertraute Prozesse'],
    triggers: ['Zu moderne Technologie', 'Unpersönlicher Service', 'Zeitdruck'],
    communication: 'Bedächtig, erzählt gerne, schätzt persönliche Betreuung',
  },
};

// Memoized component to prevent unnecessary re-renders
export const SimulatorInterface = React.memo<SimulatorInterfaceProps>(function SimulatorInterface({ scenario, mode, onEndSimulation }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [currentScore, setCurrentScore] = useState({
    empathy: 85,
    clarity: 78,
    helpfulness: 82,
    overall: 82,
  });
  const [isTyping, setIsTyping] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTip, setCurrentTip] = useState('');
  const [tipMessageCount, setTipMessageCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const abortControllerRef = useRef<AbortController>();

  // Memoize aiPersonality to prevent recreation
  const aiPersonality = useMemo(() => 
    AI_PERSONALITIES[scenario?.personality as keyof typeof AI_PERSONALITIES || 'polite'],
    [scenario?.personality]
  );

  useEffect(() => {
    // Create AbortController for cleanup
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    // Initialize conversation
    const initialMessage: Message = {
      id: '1',
      type: 'system',
      content: `Simulation gestartet: ${scenario?.title}. ${scenario?.description}`,
      timestamp: new Date(),
    };

    const aiGreeting: Message = {
      id: '2',
      type: 'ai',
      content: scenario?.initialMessage || 'Hallo, ich brauche Hilfe mit meinem Problem.',
      timestamp: new Date(),
    };

    if (!signal.aborted) {
      setMessages([initialMessage, aiGreeting]);
      setCurrentTip(getContextualTip(aiPersonality, 0)); // Initial tip
    }

    // Start timer with proper cleanup
    timerRef.current = setInterval(() => {
      if (!signal.aborted) {
        setSessionTime(prev => prev + 1);
      }
    }, 1000);

    return () => {
      // Comprehensive cleanup
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = undefined;
      }
    };
  }, [scenario, aiPersonality]);

  useEffect(() => {
    scrollToBottom();
    // Update tip every 3 messages
    if (messages.length > 2 && (messages.length - 2) % 3 === 0) { // -2 to account for initial system and AI messages
      setCurrentTip(getContextualTip(aiPersonality, messages.length));
    }
  }, [messages, aiPersonality]);

  // Memoize callback functions to prevent unnecessary re-renders
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSendMessage = useCallback(async () => {
    if (!currentMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simulate AI processing and response
    setTimeout(() => {
      const aiResponse = generateAIResponse(currentMessage, scenario);
      const score = calculateMessageScore(currentMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        score,
        feedback: generateFeedback(score),
      };

      setMessages(prev => [...prev, aiMessage]);
      setCurrentScore(score);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }, [currentMessage, scenario]);

  const generateAIResponse = useCallback((userMessage: string, scenario: any) => {
    const responses = {
      frustrated: [
        'Das ist nicht das, was ich hören wollte! Können Sie mir nicht richtig helfen?',
        'Ich bin schon seit Stunden dabei und nichts funktioniert!',
        'Das ist inakzeptabel! Ich verlange eine bessere Lösung!',
        'Hören Sie, ich bin bereits der dritte Mitarbeiter, mit dem ich spreche!',
        'Das kann doch nicht so schwer sein! Warum dauert das so lange?',
        'Ich bin ein langjähriger Kunde und erwarte besseren Service!',
        'Das ist Zeitverschwendung! Ich will sofort mit Ihrem Vorgesetzten sprechen!',
        'Ihre Konkurrenz würde das in 5 Minuten lösen!',
      ],
      confused: [
        'Entschuldigung, ich verstehe das nicht ganz. Können Sie das nochmal erklären?',
        'Hmm, das klingt kompliziert. Gibt es vielleicht einen einfacheren Weg?',
        'Ich bin mir nicht sicher, ob ich das richtig verstanden habe...',
        'Könnten Sie das bitte Schritt für Schritt erklären?',
        'Entschuldigung, aber ich bin nicht so technikaffin. Was bedeutet das genau?',
        'Ich möchte nichts falsch machen. Sind Sie sicher, dass das funktioniert?',
        'Können Sie mir das vielleicht anders erklären? Ich verstehe es noch nicht.',
        'Gibt es eine einfachere Lösung? Das scheint mir zu kompliziert.',
      ],
      polite: [
        'Vielen Dank für Ihre Hilfe! Das klingt nach einer guten Lösung.',
        'Ich schätze Ihre Geduld sehr. Können Sie mir dabei helfen?',
        'Das ist sehr hilfreich, vielen Dank für die Erklärung.',
        'Sie sind sehr kompetent! Ich bin froh, dass Sie mir helfen.',
        'Das verstehe ich gut. Wie gehen wir am besten vor?',
        'Perfekt! Das ist genau das, was ich gebraucht habe.',
        'Sie haben mir sehr geholfen. Gibt es noch etwas zu beachten?',
        'Ausgezeichnet! Ich werde das gleich ausprobieren.',
      ],
      anxious: [
        'Sind Sie sicher, dass das sicher ist? Ich möchte keine Probleme bekommen.',
        'Was passiert, wenn etwas schief geht? Kann das rückgängig gemacht werden?',
        'Ich habe schon schlechte Erfahrungen gemacht... Ist das wirklich die beste Lösung?',
        'Können Sie mir garantieren, dass das funktioniert?',
        'Ich bin sehr vorsichtig bei solchen Dingen. Gibt es Risiken?',
        'Was ist, wenn ich einen Fehler mache? Wer hilft mir dann?',
        'Ich brauche Zeit zum Überlegen. Können Sie mir das schriftlich geben?',
        'Das macht mir Sorgen. Gibt es eine sicherere Alternative?',
      ],
      expert: [
        'Können Sie mir die technischen Spezifikationen dazu geben?',
        'Das ist eine oberflächliche Lösung. Wie sieht es mit der Architektur aus?',
        'Welche API-Endpunkte werden dabei verwendet?',
        'Haben Sie Performance-Benchmarks für diese Lösung?',
        'Das würde ich anders implementieren. Warum haben Sie sich für diesen Ansatz entschieden?',
        'Gibt es Dokumentation zu den verwendeten Algorithmen?',
        'Wie verhält sich das System unter Last?',
        'Welche Sicherheitsmaßnahmen sind implementiert?',
      ],
      elderly: [
        'Das ist mir alles zu modern. Gibt es nicht einen einfacheren Weg?',
        'Früher war das viel unkomplizierter. Warum muss heute alles so kompliziert sein?',
        'Können Sie mir das am Telefon erklären? Ich mag diese neuen Technologien nicht.',
        'Mein Enkel hat mir gesagt, ich soll vorsichtig sein. Ist das wirklich notwendig?',
        'Ich bin seit 30 Jahren Kunde. Können Sie mir nicht persönlich helfen?',
        'Das verstehe ich nicht. Können Sie mir das in einfachen Worten erklären?',
        'Ich brauche Zeit, um das zu verstehen. Können Sie langsamer sprechen?',
        'Gibt es jemanden, der mir das persönlich zeigen kann?',
      ],
    };

    const personalityResponses = responses[scenario?.personality as keyof typeof responses || 'polite'];
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  }, []);

  const calculateMessageScore = useCallback((message: string) => {
    // Erweiterte Bewertungsalgorithmus basierend auf Nachrichteninhalt
    const empathyWords = [
      'verstehe', 'entschuldigung', 'bedauere', 'nachvollziehen', 'tut mir leid',
      'kann ich verstehen', 'fühle mit', 'verständlich', 'berechtigt', 'frustrierend',
      'ärgerlich', 'schwierig', 'herausfordernd', 'geduld', 'zeit lassen'
    ];
    
    const clarityWords = [
      'erklären', 'schritt', 'zunächst', 'dann', 'erstens', 'zweitens', 'anschließend',
      'konkret', 'genau', 'präzise', 'deutlich', 'klar', 'verständlich', 'einfach',
      'übersichtlich', 'strukturiert', 'systematisch', 'punkt für punkt'
    ];
    
    const helpfulnessWords = [
      'helfen', 'lösung', 'unterstützen', 'gemeinsam', 'alternative', 'option',
      'möglichkeit', 'vorschlag', 'empfehlung', 'tipp', 'rat', 'anleitung',
      'führen', 'begleiten', 'zeigen', 'demonstrieren', 'erläutern'
    ];

    const professionalismWords = [
      'gerne', 'selbstverständlich', 'natürlich', 'kompetent', 'erfahrung',
      'expertise', 'qualität', 'service', 'betreuung', 'zuverlässig',
      'professionell', 'sorgfältig', 'gewissenhaft'
    ];

    const messageLower = message.toLowerCase();
    
    // Negative Wörter reduzieren die Punktzahl
    const negativeWords = [
      'nicht möglich', 'geht nicht', 'unmöglich', 'leider nicht', 'kann nicht',
      'problem', 'fehler', 'schwierig', 'kompliziert', 'pech'
    ];

    const empathyScore = empathyWords.filter(word => messageLower.includes(word)).length;
    const clarityScore = clarityWords.filter(word => messageLower.includes(word)).length;
    const helpfulnessScore = helpfulnessWords.filter(word => messageLower.includes(word)).length;
    const professionalismScore = professionalismWords.filter(word => messageLower.includes(word)).length;
    const negativeScore = negativeWords.filter(word => messageLower.includes(word)).length;

    // Längenbonus für ausführliche Antworten
    const lengthBonus = Math.min(10, Math.floor(message.length / 50));
    
    // Fragezeichen-Bonus für nachfragende Kommunikation
    const questionBonus = (message.match(/\?/g) || []).length * 2;

    const empathy = Math.min(100, Math.max(0, 60 + empathyScore * 8 + lengthBonus - negativeScore * 3));
    const clarity = Math.min(100, Math.max(0, 65 + clarityScore * 7 + questionBonus - negativeScore * 2));
    const helpfulness = Math.min(100, Math.max(0, 70 + helpfulnessScore * 6 + professionalismScore * 4 - negativeScore * 4));
    const overall = Math.round((empathy + clarity + helpfulness) / 3);

    return { empathy, clarity, helpfulness, overall };
  }, []);

  const generateFeedback = useCallback((score: any) => {
    const feedbackOptions = {
      excellent: [
        'Ausgezeichnet! Perfekte Balance aus Empathie, Klarheit und Hilfsbereitschaft.',
        'Hervorragend! Sie haben alle wichtigen Aspekte einer professionellen Kundenbetreuung erfüllt.',
        'Exzellente Kommunikation! Der Kunde fühlt sich verstanden und gut betreut.',
        'Perfekt! Ihre Antwort zeigt echte Professionalität und Kundenorientierung.',
      ],
      good: [
        'Sehr gut! Ihre Antwort war hilfreich und professionell.',
        'Gute Arbeit! Sie haben empathisch und lösungsorientiert geantwortet.',
        'Solide Leistung! Der Kunde erhält eine klare und hilfreiche Antwort.',
        'Gut gemacht! Ihre Kommunikation war verständlich und unterstützend.',
      ],
      average: [
        'Solide Antwort. Versuchen Sie, noch empathischer zu kommunizieren.',
        'Guter Ansatz, aber die Antwort könnte strukturierter sein.',
        'Brauchbare Antwort. Mehr Verständnis für die Kundensituation wäre hilfreich.',
        'Okay, aber versuchen Sie, konkreter und hilfreicher zu antworten.',
      ],
      needsImprovement: [
        'Verbesserungspotential. Fokussieren Sie sich mehr auf Empathie und Klarheit.',
        'Die Antwort wirkt zu unpersönlich. Zeigen Sie mehr Verständnis für den Kunden.',
        'Zu oberflächlich. Der Kunde braucht konkretere Hilfe und mehr Aufmerksamkeit.',
        'Arbeiten Sie an Ihrer Kommunikation. Mehr Struktur und Empathie sind nötig.',
      ],
      poor: [
        'Unzureichend. Die Antwort hilft dem Kunden nicht weiter.',
        'Zu wenig hilfreich. Der Kunde benötigt bessere Unterstützung.',
        'Die Kommunikation ist nicht kundenorientiert genug.',
        'Deutlicher Verbesserungsbedarf in allen Bereichen der Kundenbetreuung.',
      ]
    };

    let category: keyof typeof feedbackOptions;
    if (score.overall >= 90) category = 'excellent';
    else if (score.overall >= 80) category = 'good';
    else if (score.overall >= 70) category = 'average';
    else if (score.overall >= 60) category = 'needsImprovement';
    else category = 'poor';

    const options = feedbackOptions[category];
    const baseFeedback = options[Math.floor(Math.random() * options.length)];

    // Spezifisches Feedback basierend auf den niedrigsten Scores
    let specificTips = '';
    if (score.empathy < 70) {
      specificTips += ' Tipp: Zeigen Sie mehr Verständnis für die Gefühle des Kunden.';
    }
    if (score.clarity < 70) {
      specificTips += ' Tipp: Strukturieren Sie Ihre Antwort klarer und verwenden Sie einfache Sprache.';
    }
    if (score.helpfulness < 70) {
      specificTips += ' Tipp: Bieten Sie konkrete Lösungen und nächste Schritte an.';
    }

    return baseFeedback + specificTips;
  }, []);

  const getContextualTip = useCallback((personality: any, messageCount: number) => {
    const generalTips = [
      'Zeigen Sie Verständnis für die Situation des Kunden und bieten Sie konkrete Hilfe an.',
      'Verwenden Sie eine freundliche und professionelle Sprache.',
      'Stellen Sie gezielte Nachfragen, um das Problem besser zu verstehen.',
      'Bieten Sie Schritt-für-Schritt Anleitungen für komplexe Lösungen.',
      'Bestätigen Sie das Verständnis des Kunden, bevor Sie fortfahren.',
    ];

    const personalitySpecificTips = {
      frustrated: [
        'Bleiben Sie ruhig und zeigen Sie Verständnis für die Frustration.',
        'Entschuldigen Sie sich für die Unannehmlichkeiten und bieten Sie schnelle Lösungen.',
        'Vermeiden Sie Standardphrasen und gehen Sie auf die spezifischen Sorgen ein.',
        'Bieten Sie Alternativen an, falls die erste Lösung nicht funktioniert.',
      ],
      confused: [
        'Erklären Sie alles in einfachen, verständlichen Schritten.',
        'Verwenden Sie keine Fachbegriffe ohne Erklärung.',
        'Fragen Sie nach, ob der Kunde alles verstanden hat.',
        'Bieten Sie zusätzliche Ressourcen oder Dokumentation an.',
      ],
      polite: [
        'Nutzen Sie die positive Einstellung und arbeiten Sie effizient.',
        'Bieten Sie umfassende Informationen und Zusatztipps.',
        'Fragen Sie nach weiteren Wünschen oder Anliegen.',
        'Bedanken Sie sich für die Geduld und Kooperationsbereitschaft.',
      ],
      anxious: [
        'Beruhigen Sie den Kunden und versichern Sie ihm die Sicherheit der Lösung.',
        'Erklären Sie jeden Schritt und mögliche Auswirkungen.',
        'Bieten Sie Garantien oder Rückversicherungen an.',
        'Geben Sie dem Kunden Zeit zum Nachdenken und Entscheiden.',
      ],
      expert: [
        'Verwenden Sie präzise technische Begriffe und detaillierte Erklärungen.',
        'Bieten Sie tiefergehende Informationen und Hintergründe.',
        'Seien Sie bereit für kritische Nachfragen und Diskussionen.',
        'Verweisen Sie auf Dokumentation und technische Spezifikationen.',
      ],
      elderly: [
        'Sprechen Sie langsam und verwenden Sie einfache Sprache.',
        'Bieten Sie persönliche Betreuung und traditionelle Lösungswege.',
        'Zeigen Sie Respekt für die Erfahrung des Kunden.',
        'Vermeiden Sie zu moderne oder komplexe technische Lösungen.',
      ],
    };

    // Wähle spezifischen Tipp basierend auf Persönlichkeit und Gesprächsverlauf
    if (messageCount <= 3) {
      return 'Beginnen Sie mit einer warmen Begrüßung und zeigen Sie Interesse am Problem.';
    } else if (messageCount <= 6) {
      const tips = personalitySpecificTips[personality?.name?.toLowerCase().includes('frustriert') ? 'frustrated' :
                                          personality?.name?.toLowerCase().includes('verwirrt') ? 'confused' :
                                          personality?.name?.toLowerCase().includes('höflich') ? 'polite' :
                                          personality?.name?.toLowerCase().includes('ängstlich') ? 'anxious' :
                                          personality?.name?.toLowerCase().includes('experte') ? 'expert' :
                                          personality?.name?.toLowerCase().includes('älter') ? 'elderly' : 'polite'];
      return tips[Math.floor(Math.random() * tips.length)];
    } else {
      return generalTips[Math.floor(Math.random() * generalTips.length)];
    }
  }, []);

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const handleEndSession = useCallback(() => {
    // Clean up resources before ending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
    onEndSimulation();
  }, [onEndSimulation]);

  return (
    <div className="h-full flex flex-col">
      {/* Simulation Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{aiPersonality.avatar}</div>
              <div>
                <h3 className="font-semibold">{aiPersonality.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline" className="text-xs">
                    {aiPersonality.mood}
                  </Badge>
                  <span>•</span>
                  <span>Schwierigkeit: {aiPersonality.difficulty}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              {formatTime(sessionTime)}
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
              </Button>
              
              <Button variant="destructive" size="sm" onClick={handleEndSession}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Current Scores */}
        <div className="mt-4 grid gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-lg font-bold text-red-500">{currentScore.empathy}%</div>
            <p className="text-xs text-muted-foreground">Empathie</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-500">{currentScore.clarity}%</div>
            <p className="text-xs text-muted-foreground">Klarheit</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-500">{currentScore.helpfulness}%</div>
            <p className="text-xs text-muted-foreground">Hilfsbereitschaft</p>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-500">{currentScore.overall}%</div>
            <p className="text-xs text-muted-foreground">Gesamt</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type !== 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {message.type === 'ai' ? aiPersonality.avatar : '🤖'}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[70%] ${
                  message.type === 'user' ? 'order-first' : ''
                }`}>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground ml-auto' 
                      : message.type === 'system'
                        ? 'bg-muted text-muted-foreground text-center'
                        : 'bg-muted'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    
                    {message.score && (
                      <div className="mt-2 pt-2 border-t border-border/20">
                        <div className="flex items-center gap-2 text-xs">
                          <Heart className="h-3 w-3 text-red-500" />
                          <span>{message.score.empathy}%</span>
                          <MessageSquare className="h-3 w-3 text-blue-500" />
                          <span>{message.score.clarity}%</span>
                          <Target className="h-3 w-3 text-green-500" />
                          <span>{message.score.helpfulness}%</span>
                        </div>
                        {message.feedback && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {message.feedback}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                
                {message.type === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{aiPersonality.avatar}</AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border p-4">
          <div className="flex gap-2">
            <div className="flex-1 flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Ihre Antwort eingeben..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isPaused}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={isRecording ? 'bg-red-500 text-white' : ''}
              >
                {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleSendMessage} disabled={!currentMessage.trim() || isPaused}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          {mode === 'guided' && (
            <div className="mt-2 space-y-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <p className="text-sm text-blue-600">
                  💡 <strong>Aktueller Tipp:</strong> {currentTip}
                </p>
              </div>
              
              {aiPersonality && (
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <p className="text-xs text-amber-700">
                    <strong>Kundentyp:</strong> {aiPersonality.communication}
                  </p>
                  <p className="text-xs text-amber-600 mt-1">
                    <strong>Vermeiden Sie:</strong> {aiPersonality.triggers.join(', ')}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

SimulatorInterface.displayName = 'SimulatorInterface';

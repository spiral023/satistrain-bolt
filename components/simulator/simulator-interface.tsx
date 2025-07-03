'use client';

import { useState, useEffect, useRef } from 'react';
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

const aiPersonalities = {
  frustrated: {
    name: 'Frustrierter Kunde',
    avatar: '😤',
    mood: 'Verärgert',
    difficulty: 'Hoch',
    traits: ['Ungeduldig', 'Emotional', 'Fordernd'],
  },
  confused: {
    name: 'Verwirrter Kunde',
    avatar: '😕',
    mood: 'Verwirrt',
    difficulty: 'Mittel',
    traits: ['Unsicher', 'Fragend', 'Hilfsbereit'],
  },
  polite: {
    name: 'Höflicher Kunde',
    avatar: '😊',
    mood: 'Freundlich',
    difficulty: 'Niedrig',
    traits: ['Geduldig', 'Verständnisvoll', 'Kooperativ'],
  },
};

export function SimulatorInterface({ scenario, mode, onEndSimulation }: SimulatorInterfaceProps) {
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  const aiPersonality = aiPersonalities[scenario?.personality as keyof typeof aiPersonalities || 'polite'];

  useEffect(() => {
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

    setMessages([initialMessage, aiGreeting]);

    // Start timer
    timerRef.current = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [scenario]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
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
  };

  const generateAIResponse = (userMessage: string, scenario: any) => {
    const responses = {
      frustrated: [
        'Das ist nicht das, was ich hören wollte! Können Sie mir nicht richtig helfen?',
        'Ich bin schon seit Stunden dabei und nichts funktioniert!',
        'Das ist inakzeptabel! Ich verlange eine bessere Lösung!',
      ],
      confused: [
        'Entschuldigung, ich verstehe das nicht ganz. Können Sie das nochmal erklären?',
        'Hmm, das klingt kompliziert. Gibt es vielleicht einen einfacheren Weg?',
        'Ich bin mir nicht sicher, ob ich das richtig verstanden habe...',
      ],
      polite: [
        'Vielen Dank für Ihre Hilfe! Das klingt nach einer guten Lösung.',
        'Ich schätze Ihre Geduld sehr. Können Sie mir dabei helfen?',
        'Das ist sehr hilfreich, vielen Dank für die Erklärung.',
      ],
    };

    const personalityResponses = responses[scenario?.personality as keyof typeof responses || 'polite'];
    return personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
  };

  const calculateMessageScore = (message: string) => {
    // Simple scoring algorithm based on message content
    const empathyWords = ['verstehe', 'entschuldigung', 'bedauere', 'nachvollziehen'];
    const clarityWords = ['erklären', 'schritt', 'zunächst', 'dann'];
    const helpfulnessWords = ['helfen', 'lösung', 'unterstützen', 'gemeinsam'];

    const empathy = Math.min(100, 60 + empathyWords.filter(word => 
      message.toLowerCase().includes(word)).length * 10);
    const clarity = Math.min(100, 65 + clarityWords.filter(word => 
      message.toLowerCase().includes(word)).length * 8);
    const helpfulness = Math.min(100, 70 + helpfulnessWords.filter(word => 
      message.toLowerCase().includes(word)).length * 7);
    const overall = Math.round((empathy + clarity + helpfulness) / 3);

    return { empathy, clarity, helpfulness, overall };
  };

  const generateFeedback = (score: any) => {
    if (score.overall >= 90) return 'Ausgezeichnet! Sehr empathische und hilfreiche Antwort.';
    if (score.overall >= 80) return 'Gut! Ihre Antwort war hilfreich und verständlich.';
    if (score.overall >= 70) return 'Solide Antwort. Versuchen Sie, noch empathischer zu sein.';
    return 'Verbesserungspotential. Fokussieren Sie sich auf Empathie und Klarheit.';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndSession = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onEndSimulation();
  };

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
            <div className="mt-2 p-2 bg-blue-500/10 rounded-lg">
              <p className="text-sm text-blue-600">
                💡 Tipp: Zeigen Sie Verständnis für die Situation des Kunden und bieten Sie konkrete Hilfe an.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

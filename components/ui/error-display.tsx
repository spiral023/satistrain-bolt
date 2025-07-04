'use client';

import { AlertTriangle, RefreshCw, Wifi, WifiOff, AlertCircle, Info } from 'lucide-react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Alert, AlertDescription, AlertTitle } from './alert';
import { cn } from '@/lib/utils';

interface ErrorDisplayProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
  variant?: 'default' | 'destructive';
  showDetails?: boolean;
}

export function ErrorDisplay({ 
  error, 
  onRetry, 
  className,
  variant = 'destructive',
  showDetails = false 
}: ErrorDisplayProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? undefined : error.stack;

  return (
    <Alert variant={variant} className={className}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Fehler aufgetreten</AlertTitle>
      <AlertDescription className="space-y-3">
        <p>{errorMessage}</p>
        
        {showDetails && errorStack && (
          <details className="mt-2">
            <summary className="cursor-pointer text-sm font-medium">
              Technische Details
            </summary>
            <pre className="mt-2 text-xs overflow-auto p-2 bg-muted rounded">
              {errorStack}
            </pre>
          </details>
        )}
        
        {onRetry && (
          <Button onClick={onRetry} size="sm" className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            Erneut versuchen
          </Button>
        )}
      </AlertDescription>
    </Alert>
  );
}

interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function NetworkErrorDisplay({ onRetry, className }: NetworkErrorProps) {
  return (
    <Card className={cn('border-destructive', className)}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <WifiOff className="h-6 w-6 text-destructive" />
        </div>
        <CardTitle className="text-destructive">Verbindungsfehler</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Es konnte keine Verbindung zum Server hergestellt werden. 
          Bitte überprüfen Sie Ihre Internetverbindung.
        </p>
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Erneut versuchen
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface NotFoundErrorProps {
  title?: string;
  description?: string;
  onGoBack?: () => void;
  className?: string;
}

export function NotFoundErrorDisplay({ 
  title = 'Nicht gefunden',
  description = 'Die angeforderte Ressource konnte nicht gefunden werden.',
  onGoBack,
  className 
}: NotFoundErrorProps) {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">{description}</p>
        {onGoBack && (
          <Button onClick={onGoBack} variant="outline">
            Zurück
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface UnauthorizedErrorProps {
  onLogin?: () => void;
  className?: string;
}

export function UnauthorizedError({ onLogin, className }: UnauthorizedErrorProps) {
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
          <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <CardTitle>Anmeldung erforderlich</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Sie müssen sich anmelden, um auf diese Inhalte zugreifen zu können.
        </p>
        {onLogin && (
          <Button onClick={onLogin}>
            Jetzt anmelden
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

interface InlineErrorProps {
  error: Error | string;
  onRetry?: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function InlineError({ 
  error, 
  onRetry, 
  className,
  size = 'md' 
}: InlineErrorProps) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className={cn(
      'flex items-center gap-2 text-destructive',
      size === 'sm' ? 'text-sm' : 'text-base',
      className
    )}>
      <AlertTriangle className={cn(
        size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
      )} />
      <span className="flex-1">{errorMessage}</span>
      {onRetry && (
        <Button 
          onClick={onRetry} 
          size={size === 'sm' ? 'sm' : 'default'}
          variant="ghost"
          className="h-auto p-1"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}

// Error types for better error handling
export class NetworkError extends Error {
  constructor(message = 'Netzwerkfehler aufgetreten') {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthenticationError extends Error {
  constructor(message = 'Authentifizierung fehlgeschlagen') {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export class ValidationError extends Error {
  constructor(message = 'Validierungsfehler') {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Ressource nicht gefunden') {
    super(message);
    this.name = 'NotFoundError';
  }
}

// Error handler utility
export function getErrorComponent(error: Error, onRetry?: () => void, onLogin?: () => void) {
  if (error instanceof NetworkError || error.message.includes('fetch')) {
    return <NetworkErrorDisplay onRetry={onRetry} />;
  }
  
  if (error instanceof AuthenticationError || error.message.includes('auth')) {
    return <UnauthorizedError onLogin={onLogin} />;
  }
  
  if (error instanceof NotFoundError || error.message.includes('not found')) {
    return <NotFoundErrorDisplay />;
  }
  
  return <ErrorDisplay error={error} onRetry={onRetry} />;
}

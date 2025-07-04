// Custom error types for better error handling

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

export class PermissionError extends Error {
  constructor(message = 'Keine Berechtigung für diese Aktion') {
    super(message);
    this.name = 'PermissionError';
  }
}

export class RateLimitError extends Error {
  constructor(message = 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.') {
    super(message);
    this.name = 'RateLimitError';
  }
}

export class ServerError extends Error {
  constructor(message = 'Serverfehler aufgetreten') {
    super(message);
    this.name = 'ServerError';
  }
}

// Error type guards
export function isNetworkError(error: Error): error is NetworkError {
  return error.name === 'NetworkError';
}

export function isAuthenticationError(error: Error): error is AuthenticationError {
  return error.name === 'AuthenticationError';
}

export function isValidationError(error: Error): error is ValidationError {
  return error.name === 'ValidationError';
}

export function isNotFoundError(error: Error): error is NotFoundError {
  return error.name === 'NotFoundError';
}

export function isPermissionError(error: Error): error is PermissionError {
  return error.name === 'PermissionError';
}

export function isRateLimitError(error: Error): error is RateLimitError {
  return error.name === 'RateLimitError';
}

export function isServerError(error: Error): error is ServerError {
  return error.name === 'ServerError';
}

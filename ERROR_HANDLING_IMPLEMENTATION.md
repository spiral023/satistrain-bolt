# Error Handling & Loading States Implementation

This document outlines the comprehensive error handling and loading states system implemented in the SatisTrain application.

## Overview

The implementation provides:
- **Global Error Boundary** for catching unhandled React errors
- **Custom Error Types** for better error categorization
- **Loading State Components** for consistent UI feedback
- **Async Hooks** for handling API calls with built-in error handling
- **Enhanced API Layer** with proper error handling and validation

## Components

### 1. Error Boundary (`components/ui/error-boundary.tsx`)

A React Error Boundary that catches JavaScript errors anywhere in the component tree.

**Features:**
- Catches and displays errors gracefully
- Provides fallback UI with retry functionality
- Logs errors for debugging
- Prevents app crashes

**Usage:**
```tsx
<ErrorBoundary onError={handleError}>
  <App />
</ErrorBoundary>
```

### 2. Loading States (`components/ui/loading-states.tsx`)

Comprehensive loading state components for different UI scenarios.

**Components:**
- `LoadingOverlay` - Overlay with spinner for async operations
- `PageLoading` - Full page loading state
- `CourseCardSkeleton` - Skeleton for course cards
- `CourseGridSkeleton` - Grid of course card skeletons
- `TableSkeleton` - Skeleton for table data
- `StatCardSkeleton` - Skeleton for statistics cards
- `DashboardSkeleton` - Complete dashboard skeleton
- `InlineLoading` - Small inline loading indicator
- `ButtonLoading` - Loading state for buttons

**Usage:**
```tsx
// Loading overlay
<LoadingOverlay isLoading={loading} loadingText="Lädt Kurse...">
  <CourseList />
</LoadingOverlay>

// Button loading
<Button disabled={loading}>
  <ButtonLoading isLoading={loading} loadingText="Speichern...">
    Speichern
  </ButtonLoading>
</Button>
```

### 3. Error Display (`components/ui/error-display.tsx`)

Various error display components for different error scenarios.

**Components:**
- `ErrorDisplay` - General error display with retry option
- `NetworkErrorDisplay` - Specific for network errors
- `NotFoundErrorDisplay` - For 404/not found errors
- `UnauthorizedError` - For authentication errors
- `InlineError` - Small inline error messages

**Usage:**
```tsx
// General error
<ErrorDisplay 
  error={error} 
  onRetry={handleRetry}
  showDetails={true}
/>

// Network error
<NetworkErrorDisplay onRetry={handleRetry} />

// Inline error
<InlineError error="Validation failed" onRetry={handleRetry} />
```

## Hooks

### 1. useAsync (`hooks/use-async.ts`)

A powerful hook for handling async operations with built-in error handling and loading states.

**Features:**
- Automatic loading state management
- Error handling with retry logic
- Success/error callbacks
- Memory leak prevention
- Retry with exponential backoff

**Usage:**
```tsx
const { data, loading, error, execute, retry } = useAsync(
  () => api.getCourses(),
  {
    onSuccess: (data) => toast.success('Kurse geladen'),
    onError: (error) => toast.error(error.message),
    retryCount: 3,
    retryDelay: 1000
  }
);

// Execute the async function
useEffect(() => {
  execute();
}, []);
```

### 2. useMutation (`hooks/use-async.ts`)

Hook for handling mutations (POST, PUT, DELETE operations).

**Usage:**
```tsx
const { mutate, loading, error } = useMutation(
  (data) => api.createCourse(data),
  {
    onSuccess: () => toast.success('Kurs erstellt'),
    onError: (error) => toast.error(error.message)
  }
);

const handleSubmit = (formData) => {
  mutate(formData);
};
```

### 3. useQuery (`hooks/use-async.ts`)

Hook for data fetching with automatic execution and caching.

**Usage:**
```tsx
const { data, loading, error, refetch } = useQuery(
  'courses',
  () => api.getCourses(),
  {
    enabled: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
    onError: (error) => toast.error(error.message)
  }
);
```

## Error Types

### Custom Error Classes (`lib/error-types.ts`)

Specific error types for better error handling:

- `NetworkError` - Network/connection issues
- `AuthenticationError` - Authentication failures
- `ValidationError` - Data validation errors
- `NotFoundError` - Resource not found
- `PermissionError` - Authorization issues
- `RateLimitError` - Rate limiting
- `ServerError` - Server-side errors

**Usage:**
```tsx
try {
  await api.getCourse(id);
} catch (error) {
  if (error instanceof NetworkError) {
    // Handle network error
  } else if (error instanceof AuthenticationError) {
    // Handle auth error
  }
}
```

## API Layer Enhancement

### Enhanced Error Handling (`lib/api/courses.ts`)

The API layer now includes:
- Proper error transformation
- Input validation
- Consistent error messages in German
- Automatic retry for network errors
- Detailed error logging

**Features:**
- Validates input parameters
- Transforms Supabase errors to custom error types
- Provides German error messages
- Prevents duplicate operations
- Handles edge cases

## Global Configuration

### Providers (`app/providers.tsx`)

Enhanced providers with:
- Global error boundary
- Query client with retry logic
- Error toast notifications
- Proper error logging

**Features:**
- Automatic retry for failed queries (except auth errors)
- Exponential backoff for retries
- Global error toast notifications
- Error logging for monitoring

## Implementation Examples

### 1. Course Grid with Error Handling

```tsx
<CourseGrid 
  courses={courses}
  type="available"
  onEnroll={handleEnroll}
  loading={loading}
  error={error}
  onRetry={handleRetry}
/>
```

### 2. Form with Loading States

```tsx
const { mutate, loading, error } = useMutation(api.createCourse);

return (
  <form onSubmit={(e) => {
    e.preventDefault();
    mutate(formData);
  }}>
    {error && <InlineError error={error} />}
    
    <Button type="submit" disabled={loading}>
      <ButtonLoading isLoading={loading} loadingText="Erstellen...">
        Kurs erstellen
      </ButtonLoading>
    </Button>
  </form>
);
```

### 3. Page with Loading and Error States

```tsx
const { data, loading, error, execute } = useAsync(() => api.getCourses());

if (loading) return <PageLoading title="Kurse werden geladen..." />;
if (error) return <ErrorDisplay error={error} onRetry={execute} />;

return <CourseList courses={data} />;
```

## Best Practices

### 1. Error Handling
- Always provide user-friendly error messages in German
- Use specific error types for different scenarios
- Provide retry functionality where appropriate
- Log errors for debugging and monitoring

### 2. Loading States
- Show loading states for operations > 200ms
- Use skeleton screens for better perceived performance
- Disable interactive elements during loading
- Provide loading text for context

### 3. User Experience
- Show toast notifications for success/error feedback
- Provide clear error messages with actionable steps
- Use consistent loading and error UI patterns
- Handle edge cases gracefully

### 4. Performance
- Implement proper retry logic with exponential backoff
- Cache data to reduce unnecessary API calls
- Use skeleton screens instead of spinners for better UX
- Prevent memory leaks in async operations

## Testing

### Error Scenarios to Test
1. Network connectivity issues
2. Server errors (500, 503)
3. Authentication failures
4. Validation errors
5. Not found errors
6. Rate limiting
7. Timeout scenarios

### Loading State Testing
1. Fast connections (< 200ms)
2. Slow connections (> 2s)
3. Very slow connections (> 10s)
4. Intermittent connectivity
5. Large data sets

## Monitoring

### Error Tracking
- All errors are logged to console
- Ready for integration with error tracking services (Sentry, LogRocket)
- Error context includes user information and stack traces

### Performance Monitoring
- Loading times can be tracked
- Retry attempts are logged
- User interactions during loading states

## Future Enhancements

1. **Offline Support** - Handle offline scenarios gracefully
2. **Progressive Loading** - Load data in chunks for better performance
3. **Error Recovery** - Automatic error recovery strategies
4. **Advanced Caching** - More sophisticated caching strategies
5. **Error Analytics** - Detailed error analytics and reporting

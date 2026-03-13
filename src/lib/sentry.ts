import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

// Initialize Sentry for error monitoring and performance tracking
export const initSentry = () => {
  // Only initialize in production or when explicitly enabled
  if (process.env.NODE_ENV === 'production' || process.env.VITE_SENTRY_ENABLED === 'true') {
    Sentry.init({
      dsn: process.env.VITE_SENTRY_DSN,
      integrations: [
        new BrowserTracing({
          // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
          tracePropagationTargets: [
            'localhost',
            /^https:\/\/your-domain\.com\/api/,
            /^https:\/\/.*\.vercel\.app\/api/,
            /^https:\/\/.*\.netlify\.app\/api/,
          ],
        }),
        new Sentry.Replay({
          // Capture replays for 10% of all sessions
          sessionSampleRate: 0.1,
          // Capture replays for 100% of sessions with an error
          errorSampleRate: 1.0,
        }),
      ],
      // Performance Monitoring
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // Capture 10% of transactions in production
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,

      // Release tracking
      release: process.env.VITE_APP_VERSION || '1.0.0',
      environment: process.env.NODE_ENV || 'development',

      // Error filtering
      beforeSend(event, hint) {
        // Filter out common non-critical errors
        const error = hint.originalException;
        if (error && typeof error === 'string') {
          // Filter out network errors that are expected (like offline)
          if (error.includes('NetworkError') || error.includes('Failed to fetch')) {
            return null;
          }
        }
        return event;
      },

      // User context
      beforeSendTransaction(event) {
        // Add custom tags for better error categorization
        event.tags = {
          ...event.tags,
          component: 'frontend',
          framework: 'react',
        };
        return event;
      },
    });

    console.log('Sentry initialized for error monitoring');
  }
};

// Utility function to set user context
export const setSentryUser = (user: { id: string; email?: string; username?: string }) => {
  Sentry.setUser({
    id: user.id,
    email: user.email,
    username: user.username,
  });
};

// Utility function to clear user context
export const clearSentryUser = () => {
  Sentry.setUser(null);
};

// Utility function to capture custom errors
export const captureError = (error: Error, context?: Record<string, any>) => {
  Sentry.withScope((scope) => {
    if (context) {
      Object.keys(context).forEach((key) => {
        scope.setTag(key, context[key]);
      });
    }
    Sentry.captureException(error);
  });
};

// Utility function to add breadcrumbs for debugging
export const addBreadcrumb = (message: string, category: string, level: Sentry.SeverityLevel = 'info') => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
  });
};

export default Sentry;
'use client';

import { useEffect } from 'react';

// Initialize stagewise toolbar on client side
const StagewiseWrapper = () => {
  useEffect(() => {
    // Only load in development mode
    if (process.env.NODE_ENV === 'development') {
      // Dynamic import to avoid build issues
      import('@stagewise/toolbar').then((toolbarModule) => {
        toolbarModule.initToolbar({
          plugins: [],
        });
      }).catch((error) => {
        console.warn('Failed to load Stagewise toolbar:', error);
      });
    }
  }, []);

  // This component doesn't render anything - it just initializes the toolbar
  return null;
};

export default StagewiseWrapper;

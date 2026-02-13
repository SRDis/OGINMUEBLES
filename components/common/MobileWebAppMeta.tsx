'use client';

import { useEffect } from 'react';

export default function MobileWebAppMeta() {
  useEffect(() => {
    // Agregar el nuevo meta tag mobile-web-app-capable
    const existingTag = document.querySelector('meta[name="mobile-web-app-capable"]');
    if (!existingTag) {
      const meta = document.createElement('meta');
      meta.name = 'mobile-web-app-capable';
      meta.content = 'yes';
      document.head.appendChild(meta);
    }
  }, []);

  return null;
}

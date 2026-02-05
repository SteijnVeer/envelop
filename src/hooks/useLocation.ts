import { useEffect, useState } from 'react';

function extractPathFromWindow() {
  const pathname = window.location.pathname.slice(1);
  const segments = pathname.split('/');
  if (segments[0].startsWith('v') && /^\d+$/.test(segments[0].slice(1)))
    segments.shift();
  return segments.join('/');
}

export default function useLocation() {
  const [path, setPath] = useState(extractPathFromWindow());
  
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(extractPathFromWindow());
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  
  return path;
}

export function getVersionFromLocation() {
  const pathname = window.location.pathname.slice(1);
  const segments = pathname.split('/');
  if (segments[0].startsWith('v') && /^\d+$/.test(segments[0].slice(1)))
    return segments[0].slice(1);
  return null;
}

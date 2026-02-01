import { useEffect, useState } from 'react';

export default function useLocation() {
  const [path, setPath] = useState(window.location.pathname);
  
  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);
  
  return path;
}

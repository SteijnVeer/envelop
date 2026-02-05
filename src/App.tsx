import useLocation from './hooks/useLocation';
import Home from './pages/Home';
import Open from './pages/Open';
import Write from './pages/Write';

export default function App() {
  const path = useLocation();

  return (
    path.startsWith('open/')
    ? <Open />
    : path === 'schrijf'
    ? <Write />
    : <Home />
  );
}

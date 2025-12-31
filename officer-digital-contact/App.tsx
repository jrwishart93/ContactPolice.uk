import React, { ReactNode, useState, useEffect, useMemo, useCallback, Suspense } from 'react';
import { Scene } from './components/Scene';
import { ContactDetails } from './components/ContactDetails';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { Team } from './components/Team';
import { Privacy } from './components/Privacy';
import { Info } from './components/Info';
import { ContactForm } from './components/ContactForm';
import { TEAM_DATA } from './data';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Platform Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center bg-[#050505] text-white">
          <h1 className="text-2xl font-bold mb-4">Platform Error</h1>
          <p className="text-slate-400 mb-8 max-w-md">The 3D engine encountered an unexpected error. Please refresh or return home.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white text-black font-bold rounded-full uppercase tracking-widest text-[10px]"
          >
            Reset Platform
          </button>
        </div>
      );
    }
    return this.props.children || null;
  }
}

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    try {
      return window.location.pathname || '/';
    } catch {
      return '/';
    }
  });
  
  const [showUI, setShowUI] = useState(false);

  const handleNavigate = useCallback((path: string) => {
    if (path === currentPath) return;

    try {
      window.history.pushState({}, '', path);
    } catch (e) {
      console.debug("Navigation history update blocked by environment (sandbox). Proceeding with virtual navigation.", e);
    }
    
    setCurrentPath(path);
    setShowUI(false);
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  useEffect(() => {
    const handlePopState = () => {
      try {
        setCurrentPath(window.location.pathname);
      } catch {
        setCurrentPath('/');
      }
      setShowUI(false);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    const timeout = setTimeout(() => setShowUI(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const officer = useMemo(() => {
    const pathParts = currentPath.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1]?.toUpperCase() || '';
    return TEAM_DATA[lastPart] || null;
  }, [currentPath]);

  const isContactPage = useMemo(() => {
    return currentPath.includes('/contact/');
  }, [currentPath]);

  const renderContent = () => {
    if (isContactPage && officer) {
      return (
        <ContactForm 
          officer={officer} 
          onBack={() => handleNavigate(`/${officer.shoulderNumber}`)} 
        />
      );
    }

    if (officer) {
      return (
        <div key={`officer-view-${officer.shoulderNumber}`} className="relative w-full h-full">
          <Scene 
            key={`scene-${officer.shoulderNumber}`}
            onIntroComplete={handleAnimationComplete} 
            isHidden={showUI} 
            data={officer}
          />
          <ContactDetails 
            key={`details-${officer.shoulderNumber}`}
            data={officer} 
            visible={showUI} 
            onNavigate={handleNavigate}
          />
        </div>
      );
    }

    const normalizedPath = currentPath.replace(/\/$/, '') || '/';
    
    switch (normalizedPath) {
      case '/': return <Home onNavigate={handleNavigate} />;
      case '/team': return <Team onNavigate={handleNavigate} />;
      case '/privacy': return <Privacy />;
      case '/info': return <Info />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full h-full overflow-hidden flex flex-col bg-[#050505]">
        <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-slate-600 text-[10px] uppercase tracking-[0.5em] animate-pulse font-bold">Loading Experience</div>
            </div>
          }>
            {renderContent()}
          </Suspense>
        </main>
        <Navigation currentPath={currentPath} onNavigate={handleNavigate} />
      </div>
    </ErrorBoundary>
  );
};

export default App;
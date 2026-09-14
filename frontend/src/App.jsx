import { useState } from 'react';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import AnalysisView from './pages/AnalysisView';
import ProfileView from './pages/ProfileView';
import LandingPage from './pages/LandingPage';
import NewInterviewModal from './components/NewInterviewModal';
import InterviewReportPage from './pages/InterviewReportPage';

export default function App() {
  // Navigation tabs: 'home' | 'analysis' | 'profile' | 'landing' | 'interview-report'
  const [currentView, setCurrentView] = useState('home');
  const [isNewInterviewOpen, setIsNewInterviewOpen] = useState(false);
  const [interviewInitialData, setInterviewInitialData] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleOpenNewInterview = (data = null) => {
    setInterviewInitialData(data);
    setIsNewInterviewOpen(true);
  };

  const handleStartSession = (config) => {
    // Switch to home and notify
    setCurrentView('home');
  };

  const handleViewReport = (interview) => {
    setSelectedReport(interview);
    setCurrentView('interview-report');
  };

  const handleBackFromReport = () => {
    setCurrentView('home');
    setSelectedReport(null);
  };

  // If viewing the Landing Page
  if (currentView === 'landing') {
    return (
      <div className="relative">
        {/* Quick floating button to return to app homepage */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentView('home')}
            className="px-5 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer border border-white active:scale-95"
          >
            <span>Open Praxis App</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
        <LandingPage onGoToApp={() => setCurrentView('home')} />
      </div>
    );
  }

  // If viewing a full interview report
  if (currentView === 'interview-report' && selectedReport) {
    return (
      <>
        <AppNavbar
          activeTab="home"
          onTabChange={(tab) => { setCurrentView(tab); setSelectedReport(null); }}
          onOpenNewInterview={() => handleOpenNewInterview()}
          onViewLanding={() => setCurrentView('landing')}
        />
        <InterviewReportPage
          interview={selectedReport}
          onBack={handleBackFromReport}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-white/20 selection:text-white relative">
      {/* Praxis App Navigation with Logo, Symbol, 3 tabs (Home, Analysis, Profile) */}
      <AppNavbar
        activeTab={currentView}
        onTabChange={(tab) => setCurrentView(tab)}
        onOpenNewInterview={() => handleOpenNewInterview()}
        onViewLanding={() => setCurrentView('landing')}
      />

      {/* Main Views */}
      <main>
        {currentView === 'home' && (
          <HomePage
            userName="Alex"
            onOpenNewInterview={(item) => handleOpenNewInterview(item)}
            onViewReport={handleViewReport}
          />
        )}
        {currentView === 'analysis' && (
          <AnalysisView
            onStartPractice={() => handleOpenNewInterview()}
          />
        )}
        {currentView === 'profile' && (
          <ProfileView
            onOpenNewInterview={() => handleOpenNewInterview()}
          />
        )}
      </main>

      {/* New Interview Configuration Modal */}
      <NewInterviewModal
        isOpen={isNewInterviewOpen}
        onClose={() => setIsNewInterviewOpen(false)}
        initialData={interviewInitialData}
        onStartSession={handleStartSession}
      />
    </div>
  );
}

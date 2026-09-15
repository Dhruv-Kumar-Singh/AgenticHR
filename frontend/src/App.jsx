import { useState } from 'react';
import AppNavbar from './components/AppNavbar';
import HomePage from './pages/HomePage';
import AnalysisView from './pages/AnalysisView';
import ProfileView from './pages/ProfileView';
import LandingPage from './pages/LandingPage';
import PremiumPlanPage from './pages/PremiumPlanPage';
import NewInterviewModal from './components/NewInterviewModal';
import InterviewReportPage from './pages/InterviewReportPage';
import ProHomeView from './pages/ProHomeView';
import ProfInterviewSessionPage from './pages/ProfInterviewSessionPage';
import ProfCandidateDetailPage from './pages/ProfCandidateDetailPage';
import ProfAnalysisView from './pages/ProfAnalysisView';
import ProfProfileView from './pages/ProfProfileView';

export default function App() {
  // plan: 'personal' | 'professional'
  const [plan, setPlan] = useState('personal');

  // Navigation views: 'home' | 'analysis' | 'profile' | 'landing' | 'interview-report' | 'prof-session' | 'prof-candidate'
  const [currentView, setCurrentView] = useState('home');
  // Plan mode: 'free' | 'premium'
  const [currentPlan, setCurrentPlan] = useState('free');
  const [isNewInterviewOpen, setIsNewInterviewOpen] = useState(false);
  const [interviewInitialData, setInterviewInitialData] = useState(null);

  // Personal plan state
  const [selectedReport, setSelectedReport] = useState(null);

  // Professional plan state
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [selectedCandidateSession, setSelectedCandidateSession] = useState(null);

  const handleOpenNewInterview = (data = null) => {
    setInterviewInitialData(data);
    setIsNewInterviewOpen(true);
  };

  const handleStartSession = (_config) => {
    // Switch to home and notify
    setCurrentView('home');
  };

  // Personal plan
  const handleViewReport = (interview) => {
    setSelectedReport(interview);
    setCurrentView('interview-report');
  };
  const handleBackFromReport = () => {
    setCurrentView('home');
    setSelectedReport(null);
  };

  // Professional plan
  const handleViewSession = (session) => {
    setSelectedSession(session);
    setCurrentView('prof-session');
  };
  const handleBackFromSession = () => {
    setCurrentView('home');
    setSelectedSession(null);
  };
  const handleViewCandidate = (candidate, session) => {
    setSelectedCandidate(candidate);
    setSelectedCandidateSession(session);
    setCurrentView('prof-candidate');
  };
  const handleBackFromCandidate = () => {
    setCurrentView('prof-session');
    setSelectedCandidate(null);
  };

  // Switch to professional plan
  const handleContactSales = () => {
    setPlan('professional');
    setCurrentView('home');
  };

  // ── Landing Page ─────────────────────────────────────────────────────────────
  if (currentView === 'landing') {
    return (
      <div className="relative">
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setCurrentView('home')}
            className="px-5 py-3 rounded-full bg-white text-neutral-950 font-semibold text-xs shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:bg-neutral-200 transition-all flex items-center gap-2 cursor-pointer border border-white active:scale-95"
          >
            <span>Open Praxis App</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </button>
        </div>
        <LandingPage
          onGoToApp={() => {
            setPlan('personal');
            setCurrentPlan('free');
            setCurrentView('home');
          }}
          onGoToPremium={() => {
            setPlan('personal');
            setCurrentPlan('premium');
            setCurrentView('home');
          }}
          onContactSales={handleContactSales}
        />
      </div>
    );
  }

  // ── Personal: Full Interview Report ──────────────────────────────────────────
  if (plan === 'personal' && currentView === 'interview-report' && selectedReport) {
    return (
      <>
        <AppNavbar
          activeTab="home"
          plan={plan}
          onTabChange={(tab) => { setCurrentView(tab); setSelectedReport(null); }}
          onViewLanding={() => setCurrentView('landing')}
          onPlanChange={setPlan}
        />
        <InterviewReportPage interview={selectedReport} onBack={handleBackFromReport} />
      </>
    );
  }

  // ── Professional: Session Detail ─────────────────────────────────────────────
  if (plan === 'professional' && currentView === 'prof-session' && selectedSession) {
    return (
      <>
        <AppNavbar
          activeTab="home"
          plan={plan}
          onTabChange={(tab) => { setCurrentView(tab); setSelectedSession(null); }}
          onViewLanding={() => setCurrentView('landing')}
          onPlanChange={setPlan}
        />
        <ProfInterviewSessionPage
          session={selectedSession}
          onBack={handleBackFromSession}
          onViewCandidate={handleViewCandidate}
        />
      </>
    );
  }

  // ── Professional: Candidate Detail ───────────────────────────────────────────
  if (plan === 'professional' && currentView === 'prof-candidate' && selectedCandidate) {
    return (
      <>
        <AppNavbar
          activeTab="home"
          plan={plan}
          onTabChange={(tab) => { setCurrentView(tab); setSelectedCandidate(null); }}
          onViewLanding={() => setCurrentView('landing')}
          onPlanChange={setPlan}
        />
        <ProfCandidateDetailPage
          candidate={selectedCandidate}
          session={selectedCandidateSession}
          onBack={handleBackFromCandidate}
        />
      </>
    );
  }

  // ── Main App Shell ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-white/20 selection:text-white relative">
      {/* Praxis App Navigation with 3 tabs (Home, Analysis, Profile) */}
      <AppNavbar
        activeTab={currentView}
        plan={plan}
        onTabChange={(tab) => setCurrentView(tab)}
        onOpenNewInterview={() => handleOpenNewInterview()}
        onViewLanding={() => setCurrentView('landing')}
        onPlanChange={setPlan}
      />

      {/* Main Views: Home, Analysis, Profile for both Free & Premium & Professional */}
      <main>
        {/* ── Personal Plan Views ── */}
        {plan === 'personal' && currentView === 'home' && (
          currentPlan === 'premium' ? (
            <PremiumPlanPage
              userName="Alex"
              onOpenNewInterview={(item) => handleOpenNewInterview(item)}
              onViewReport={handleViewReport}
              onSwitchToFree={() => setCurrentPlan('free')}
            />
          ) : (
            <HomePage
              userName="Alex"
              onOpenNewInterview={(item) => handleOpenNewInterview(item)}
              onViewReport={handleViewReport}
            />
          )
        )}
        {plan === 'personal' && currentView === 'analysis' && (
          <AnalysisView onStartPractice={() => handleOpenNewInterview()} />
        )}
        {plan === 'personal' && currentView === 'profile' && (
          <ProfileView
            currentPlan={currentPlan}
            onOpenNewInterview={() => handleOpenNewInterview()}
            onViewReport={handleViewReport}
            onGoToPremium={() => {
              setCurrentPlan('premium');
              setCurrentView('home');
            }}
          />
        )}

        {/* ── Professional Plan Views ── */}
        {plan === 'professional' && currentView === 'home' && (
          <ProHomeView companyName="TechCorp" onViewSession={handleViewSession} />
        )}
        {plan === 'professional' && currentView === 'analysis' && (
          <ProfAnalysisView />
        )}
        {plan === 'professional' && currentView === 'profile' && (
          <ProfProfileView />
        )}
      </main>

      <NewInterviewModal
        isOpen={isNewInterviewOpen}
        onClose={() => setIsNewInterviewOpen(false)}
        initialData={interviewInitialData}
        onStartSession={handleStartSession}
      />
    </div>
  );
}


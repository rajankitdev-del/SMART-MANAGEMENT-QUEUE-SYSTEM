import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';

// Lazy load pages for better performance
const Splash = React.lazy(() => import('./pages/Splash'));
const Home = React.lazy(() => import('./pages/Home'));
const LanguageSelection = React.lazy(() => import('./pages/LanguageSelection'));
const QRScan = React.lazy(() => import('./pages/QRScan'));
const TokenGenerated = React.lazy(() => import('./pages/TokenGenerated'));
const LiveTracking = React.lazy(() => import('./pages/LiveTracking'));
const Notifications = React.lazy(() => import('./pages/Notifications'));
const PriorityAssistance = React.lazy(() => import('./pages/PriorityAssistance'));
const HelpSupport = React.lazy(() => import('./pages/HelpSupport'));
const ConfirmService = React.lazy(() => import('./pages/ConfirmService'));
const GiveFeedback = React.lazy(() => import('./pages/GiveFeedback'));
const TokenHistory = React.lazy(() => import('./pages/TokenHistory'));
const ErrorState = React.lazy(() => import('./pages/ErrorState'));

const Loading = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-primary"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/splash" element={<Splash />} />
          <Route path="/" element={<Navigate to="/splash" replace />} />
          
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/language" element={<LanguageSelection />} />
                <Route path="/qr-scan" element={<QRScan />} />
                <Route path="/token-generated" element={<TokenGenerated />} />
                <Route path="/live-tracking" element={<LiveTracking />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/priority" element={<PriorityAssistance />} />
                <Route path="/help" element={<HelpSupport />} />
                <Route path="/confirm" element={<ConfirmService />} />
                <Route path="/feedback" element={<GiveFeedback />} />
                <Route path="/history" element={<TokenHistory />} />
                <Route path="/error" element={<ErrorState />} />
                <Route path="*" element={<ErrorState />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;

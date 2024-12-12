import React from 'react';
import AppLayout from './components/Layout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';
import ProgramBuilder from './components/ProgramBuilder/ProgramBuilder';
import TemplatesGallery from './components/Templates/TemplatesGallery';
import AnalyticsDashboard from './components/Analytics/AnalyticsDashboard';
import Settings from './components/Settings/Settings';

const App = () => {
  // In a real app, you'd use react-router for navigation
  const [currentPage, setCurrentPage] = React.useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'builder':
        return <ProgramBuilder />;
      case 'templates':
        return <TemplatesGallery />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppLayout onNavigate={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
};

export default App;
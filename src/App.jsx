import React from 'react';
import { ThemeProvider } from '@radix-ui/themes';
import LoyaltyBuilder from './components/LoyaltyBuilder';
import '@radix-ui/themes/styles.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50">
        <LoyaltyBuilder />
      </div>
    </ThemeProvider>
  );
}

export default App;
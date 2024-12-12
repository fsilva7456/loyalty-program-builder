import React from 'react';
import { ThemeProvider } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold mb-8">Loyalty Program Builder</h1>
        {/* Add your components here */}
      </div>
    </ThemeProvider>
  );
}

export default App;
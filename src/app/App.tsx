import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { Loader } from '../components/features/Loader';
import { useAssetLoader } from '../hooks/useAssetLoader';
import '../styles/fonts.css';
import '../styles/globals.css';

// Define the critical assets that must load before the app is shown.
// Add your heaviest initial images here.
const CRITICAL_ASSETS = [
  '/profile_pic.png',
  // Add any other large background images or hero assets here
];

function App() {
  // The hook returns the real loading status based on the assets array
  const { isLoaded, progress } = useAssetLoader(CRITICAL_ASSETS);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {!isLoaded ? (
          <Loader progress={progress} />
        ) : (
          <div className="animate-in fade-in duration-700">
            <RouterProvider router={router} />
          </div>
        )}
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
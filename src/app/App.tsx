import { RouterProvider } from 'react-router';
import { MotionConfig } from 'motion/react';
import { router } from './routes';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';
import { Loader } from '../components/features/Loader';
import { useAssetLoader } from '../hooks/useAssetLoader';

// Critical assets that must load before the app is shown.
const CRITICAL_ASSETS = ['/profile_pic.png'];

function App() {
  const { isLoaded, progress } = useAssetLoader(CRITICAL_ASSETS);

  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Honour the OS "reduce motion" setting for every motion component */}
        <MotionConfig reducedMotion="user">
          {!isLoaded ? (
            <Loader progress={progress} />
          ) : (
            <div className="animate-in fade-in duration-500">
              <RouterProvider router={router} />
            </div>
          )}
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

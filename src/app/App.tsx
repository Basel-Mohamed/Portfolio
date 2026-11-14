import { RouterProvider } from 'react-router';
import { MotionConfig } from 'motion/react';
import { router } from './routes';
import { ThemeProvider } from '../context/ThemeContext';
import { LanguageProvider } from '../context/LanguageContext';

/**
 * The loading splash lives in index.html so it shows before any script runs.
 * Layout fades it out once the first page has mounted.
 */
function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        {/* Honour the OS "reduce motion" setting for every motion component */}
        <MotionConfig reducedMotion="user">
          <RouterProvider router={router} />
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

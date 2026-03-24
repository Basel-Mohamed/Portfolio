// Vite Image Registry
// This file maps string keys to Vite-processed image imports.
// The database stores only the key (e.g., "ocr"), and React resolves
// the optimized, hashed URL at render time.

// Project Images
import ocrProject from '../assets/projects/ocr.jpg';
import ragProject from '../assets/projects/rag.jpg';
import odaProject from '../assets/projects/oda.jpg';
import safetyProject from '../assets/projects/safety.jpg';
import project1 from '../assets/projects/project-1.png';
import project2 from '../assets/projects/project-2.png';
import project3 from '../assets/projects/project-3.png';
import project4 from '../assets/projects/project-4.png';
import project7 from '../assets/projects/project-7.png';
import oilSalesImage from '../assets/projects/oil-sales.jpg';
import churnImage from '../assets/projects/churn-prediction.jpg';
import roomImage from '../assets/projects/Room.png';

// Certificate Images
import certAppliedDeepLearning from '../assets/certificates/applied-deep-learning.jpg';
import certPythonBasics from '../assets/certificates/python-basics.jpg';
import certAiDiplomaNeurotech from '../assets/certificates/ai-diploma-neurotech.jpg';
import certOracleAiFoundations from '../assets/certificates/oracle-ai-foundations.jpg';
import certElementsOfAi from '../assets/certificates/elements-of-ai.jpg';
import certPythonDataScienceCoursera from '../assets/certificates/python-data-science-coursera.jpg';
import certPromptEngineering from '../assets/certificates/prompt-engineering.jpg';
import certGenAiEssentials from '../assets/certificates/gen-ai-essentials.jpg';
import certSprintsAiMl from '../assets/certificates/sprints-ai-ml.png';
import certAiEssentialsV2 from '../assets/certificates/ai-essentials-v2.jpg';
import certReactNativeUdemy from '../assets/certificates/react-native-udemy.jpg';
import certCleanCode from '../assets/certificates/clean-code.jpg';
import certReactBasicsHackerrank from '../assets/certificates/react-basics-hackerrank.jpg';
import certReactJsMaharatech from '../assets/certificates/react-js-maharatech.jpg';
import certFrontendDiplomaRoute from '../assets/certificates/frontend-diploma-route.jpg';
import certDatabaseFundamentals from '../assets/certificates/database-fundamentals.jpg';
import certHtmlCss from '../assets/certificates/html-css.jpg';
import certUxDesign from '../assets/certificates/ux-design.jpg';

const IMAGE_REGISTRY: Record<string, string> = {
  // Projects
  'ocr': ocrProject,
  'rag': ragProject,
  'oda': odaProject,
  'safety': safetyProject,
  'project-1': project1,
  'project-2': project2,
  'project-3': project3,
  'project-4': project4,
  'project-7': project7,
  'oil-sales': oilSalesImage,
  'churn-prediction': churnImage,
  'room': roomImage,

  // Certificates
  'applied-deep-learning': certAppliedDeepLearning,
  'python-basics': certPythonBasics,
  'ai-diploma-neurotech': certAiDiplomaNeurotech,
  'oracle-ai-foundations': certOracleAiFoundations,
  'elements-of-ai': certElementsOfAi,
  'python-data-science-coursera': certPythonDataScienceCoursera,
  'prompt-engineering': certPromptEngineering,
  'gen-ai-essentials': certGenAiEssentials,
  'sprints-ai-ml': certSprintsAiMl,
  'ai-essentials-v2': certAiEssentialsV2,
  'react-native-udemy': certReactNativeUdemy,
  'clean-code': certCleanCode,
  'react-basics-hackerrank': certReactBasicsHackerrank,
  'react-js-maharatech': certReactJsMaharatech,
  'frontend-diploma-route': certFrontendDiplomaRoute,
  'database-fundamentals': certDatabaseFundamentals,
  'html-css': certHtmlCss,
  'ux-design': certUxDesign,
};

/**
 * Resolves an image key or path to a Vite-optimized URL.
 * - If it's a registry key (e.g., "ocr"), returns the hashed import.
 * - If it starts with "http" or "/", it's already an absolute URL, so return as-is.
 * - Falls back to the raw string if no match is found.
 */
export function resolveImage(keyOrPath: string): string {
  if (!keyOrPath) return '';
  
  // Already a full URL or absolute path
  if (keyOrPath.startsWith('http') || keyOrPath.startsWith('/')) {
    return keyOrPath;
  }
  
  // Direct registry key match
  if (IMAGE_REGISTRY[keyOrPath]) {
    return IMAGE_REGISTRY[keyOrPath];
  }

  // Fallback: return as-is
  return keyOrPath;
}

export default IMAGE_REGISTRY;

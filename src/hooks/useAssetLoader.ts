import { useState, useEffect } from 'react';

export function useAssetLoader(imageUrls: string[]) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (imageUrls.length === 0) {
      setIsLoaded(true);
      setProgress(100);
      return;
    }

    let loadedCount = 0;
    let isMounted = true;

    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = () => reject(url);
      });
    };

    const loadAssets = async () => {
      try {
        await Promise.all(
          imageUrls.map(async (url) => {
            await loadImage(url);
            if (isMounted) {
              loadedCount += 1;
              setProgress(Math.round((loadedCount / imageUrls.length) * 100));
            }
          })
        );
      } catch (error) {
        console.error("Some assets failed to load", error);
      } finally {
        if (isMounted) {
          // Add a tiny 500ms buffer at 100% so the user sees the completed bar 
          // before the screen instantly disappears
          setTimeout(() => setIsLoaded(true), 500);
        }
      }
    };

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, [imageUrls]);

  return { isLoaded, progress };
}
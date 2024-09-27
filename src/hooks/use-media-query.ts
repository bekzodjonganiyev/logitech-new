import { useState, useEffect, useLayoutEffect } from "react";

/**
 * Custom hook to determine if the screen matches a media query.
 *
 * @param query - The media query string.
 * @returns Whether the media query matches the current screen size.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useLayoutEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    // Set the initial state
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener('change', documentChangeHandler);

    // Cleanup on unmount
    return () => {
      mediaQueryList.removeEventListener('change', documentChangeHandler);
    };
  }, [query]);

  return matches;
};

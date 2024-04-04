import React from 'react';

const useIsScrollingUp = () => {
  const [isScrollingUp, setIsScrollingUp] = React.useState(false);
  const [scrollPos, setScrollPos] = React.useState(0);

  React.useLayoutEffect(() => {
    let animationFrameId: number | null = null;

    const handleScroll = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      animationFrameId = requestAnimationFrame(() => {
        const currentScrollPos = window.scrollY;

        if (currentScrollPos === 0) {
          setIsScrollingUp(false);
        } else {
          // Check if the current scroll position is greater than the previous scroll position
          setIsScrollingUp(currentScrollPos < scrollPos);
        }

        // Update the previous scroll position
        setScrollPos(currentScrollPos);
      });
    };

    // Attach the throttled scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [scrollPos]);

  return isScrollingUp;
};

export default useIsScrollingUp;

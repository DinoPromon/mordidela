import { useEffect, useState } from "react";

import { fadeDuration } from "@utils/animations";

const useFadeAnimation = (shouldShow: boolean) => {
  const [showComponent, setShowComponent] = useState(shouldShow);

  useEffect(() => {
    if (!shouldShow) {
      const timer = setTimeout(() => {
        setShowComponent(false);
        return () => clearTimeout(timer);
      }, fadeDuration);
    } else {
      setShowComponent(true);
    }
  }, [shouldShow]);

  return showComponent;
};

export default useFadeAnimation;

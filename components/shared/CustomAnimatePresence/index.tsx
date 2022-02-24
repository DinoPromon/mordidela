import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import type { AnimatePresenceProps } from "framer-motion";

const CustomAnimatePresence: React.FC<AnimatePresenceProps> = ({ children, ...props }) => {
  const [showAnimatedPresence, setShowAnimatedPresence] = useState(false);

  useEffect(() => {
    setShowAnimatedPresence(true);
  }, []);

  if (!showAnimatedPresence) return null;

  return <AnimatePresence {...props}>{children}</AnimatePresence>;
};

export default CustomAnimatePresence;

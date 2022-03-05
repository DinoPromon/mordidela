import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

import { motion } from "framer-motion";

import type { TooltipProps } from "@material-ui/core/Tooltip";

type ClickableItemProps = TooltipProps & {
  scale: number;
};

const ClickableItem: React.FC<ClickableItemProps> = ({ scale, children, ...tooltipProps }) => {
  return (
    <Tooltip {...tooltipProps}>
      <motion.div whileHover={{ cursor: "pointer", scale }}>{children}</motion.div>
    </Tooltip>
  );
};

export default ClickableItem;

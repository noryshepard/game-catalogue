// src/components/MotionDiv.tsx
import { motion } from "framer-motion";
import React from "react";

// Props: any regular div props + optional 'layout'
type MotionDivProps = React.HTMLAttributes<HTMLDivElement> & {
  layout?: boolean;
};

export const MotionDiv: React.FC<MotionDivProps> = (props) => (
  <motion.div {...(props as any)} />
);

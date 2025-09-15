import React from "react";
import { skeletonCss } from "./Skeleton.styles";

interface SkeletonProps {
  width?: number;
  height: number;
}

const Skeleton = ({ width = 0, height }: SkeletonProps) => {
  return <div className="sr-only" css={skeletonCss.skeleton(width, height)} />;
};

export default Skeleton;
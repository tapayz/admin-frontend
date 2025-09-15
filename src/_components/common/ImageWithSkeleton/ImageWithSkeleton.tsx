import React, { useState } from "react";
import { imageWithSkeletonCss } from "./ImageWithSkeleton.styles";
import Skeleton from "../Skeleton/Skeleton";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  fallbackSrc?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImageWithSkeleton = ({
  src,
  alt,
  width,
  height,
  fill = false,
  fallbackSrc = "/assets/images/common/hustler_footer_logo.svg",
  className,
  onLoad,
  onError,
}: ImageWithSkeletonProps) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleImageError = () => {
    setImgError(true);
    setImgSrc(fallbackSrc);
    onError?.();
  };

  return (
    <div
      css={imageWithSkeletonCss.container(
        fill ? undefined : width,
        fill ? undefined : height
      )}
      className={className}
    >
      {isLoading && (
        <Skeleton
          width={fill ? 0 : width || 0}
          height={fill ? 0 : height || 0}
        />
      )}
      <img
        src={imgSrc}
        alt={alt}
        onLoad={handleImageLoad}
        onError={handleImageError}
        css={[
          fill ? imageWithSkeletonCss.fill : imageWithSkeletonCss.image,
          isLoading && imageWithSkeletonCss.hidden,
        ]}
      />
    </div>
  );
};

export default ImageWithSkeleton;
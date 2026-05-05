"use client";

import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  productName: string;
  unit?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Renders a product image with a styled placeholder underneath.
 * If the image file exists, it covers the placeholder.
 * If it fails to load, onError hides it and the placeholder shows through.
 *
 * Uses native <img> (not next/image) so missing files fail silently
 * instead of triggering Next.js image-optimizer 404s.
 */
export default function ProductImage({
  src,
  alt,
  productName,
  unit,
  fill = false,
  width,
  height,
  priority = false,
  className = "",
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const placeholder = (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-brand-grey-50 to-brand-grey-100 p-4 text-center">
      <span className="text-2xl font-bold text-brand-navy/20 sm:text-3xl lg:text-4xl">
        {productName}
      </span>
      {unit && <span className="mt-2 text-[10px] text-brand-grey-400 sm:text-xs">{unit}</span>}
    </div>
  );

  if (fill) {
    return (
      <>
        {placeholder}
        {!errored && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
            className={`absolute inset-0 h-full w-full object-cover ${className}`}
          />
        )}
      </>
    );
  }

  return (
    <div className="relative" style={{ width: width ?? 600, height: height ?? 600 }}>
      {placeholder}
      {!errored && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={width ?? 600}
          height={height ?? 600}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
          className={`relative ${className}`}
        />
      )}
    </div>
  );
}

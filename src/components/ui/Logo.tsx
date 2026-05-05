"use client";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface LogoProps {
  height?: number;
  className?: string;
}

export default function Logo({ height = 40, className = "" }: LogoProps) {
  const src = `${BASE_PATH}/images/brand/logo.png`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="9X Pharma"
      height={height}
      style={{ height, width: "auto" }}
      className={className}
    />
  );
}

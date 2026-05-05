"use client";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface LogoProps {
  /** Optional explicit pixel height. If a className with height utilities (e.g. h-16) is given, prefer that. */
  height?: number;
  className?: string;
}

export default function Logo({ height, className = "" }: LogoProps) {
  const src = `${BASE_PATH}/images/brand/logo.png`;
  // If no className height is provided and height prop is set, use inline style.
  const inlineStyle =
    height !== undefined && !/\bh-/.test(className)
      ? { height, width: "auto" }
      : undefined;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="9X Pharma"
      style={inlineStyle}
      className={className || "h-12 w-auto"}
    />
  );
}

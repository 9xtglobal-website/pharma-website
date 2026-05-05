import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-brand-grey-100">
        <span className="text-4xl font-bold text-brand-grey-300">?</span>
      </div>
      <h1 className="mt-6 text-2xl font-bold text-brand-navy">Page Not Found</h1>
      <p className="mt-2 text-brand-grey-500">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/products" className="btn-secondary">
          Browse Products
        </Link>
      </div>
    </div>
  );
}

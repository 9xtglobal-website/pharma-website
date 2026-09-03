import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";
import { getWellnessGoalBySlug, wellnessGoals } from "@/data/goals";
import ProductCard from "@/components/product/ProductCard";
import TrustBadges from "@/components/ui/TrustBadges";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return wellnessGoals.map((goal) => ({ slug: goal.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const goal = getWellnessGoalBySlug(params.slug);
  if (!goal) return { title: "Wellness Goal Not Found" };

  return {
    title: `${goal.title} | 9X Pharma`,
    description: `${goal.description} Explore ${goal.productName} from 9X Pharma.`,
  };
}

export default function WellnessGoalPage({ params }: PageProps) {
  const goal = getWellnessGoalBySlug(params.slug);
  if (!goal) notFound();

  const product = getProductBySlug(goal.productSlug);
  if (!product) notFound();

  return (
    <div className="py-8 sm:py-12">
      <div className="container-main">
        <nav className="mb-6 flex items-center gap-2 text-sm text-brand-grey-400">
          <Link href="/" className="transition-colors hover:text-brand-navy">Home</Link>
          <span>/</span>
          <Link href="/products" className="transition-colors hover:text-brand-navy">Products</Link>
          <span>/</span>
          <span className="text-brand-grey-700">{goal.shortTitle}</span>
        </nav>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-brand-green">
              Wellness Goal
            </span>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-brand-navy sm:text-4xl">
              {goal.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-brand-grey-600 sm:text-lg">
              {goal.description}
            </p>

            <div className="mt-8 rounded-2xl border border-brand-grey-100 bg-brand-grey-50 p-6">
              <h2 className="text-lg font-bold text-brand-grey-900">What to look for</h2>
              <ul className="mt-4 space-y-3">
                {goal.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-brand-grey-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <TrustBadges />
            </div>
          </div>

          <div>
            <ProductCard product={product} />
          </div>
        </section>
      </div>
    </div>
  );
}

import Link from "next/link";
import { wellnessGoals } from "@/data/goals";

export default function GoalNavigation() {
  return (
    <section className="border-b border-brand-grey-100 bg-white py-12 sm:py-14">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-brand-navy sm:text-3xl">Shop by wellness goal</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-grey-500 sm:text-base">
              Start with what you want support for, then compare the matching product.
            </p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-brand-green-dark hover:text-brand-navy">
            View all products
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wellnessGoals.map((goal) => (
            <Link
              key={goal.slug}
              href={`/goals/${goal.slug}`}
              className="rounded-2xl border border-brand-grey-100 bg-brand-grey-50 p-5 transition-colors hover:border-brand-green/40 hover:bg-brand-green-pale/50"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-green">
                {goal.productName}
              </span>
              <h3 className="mt-2 text-lg font-bold text-brand-grey-900">{goal.shortTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-grey-500">{goal.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

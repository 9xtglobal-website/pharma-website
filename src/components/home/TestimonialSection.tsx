import { getFeaturedReviews } from "@/data/reviews";
import ReviewCard from "@/components/ui/ReviewCard";

export default function TestimonialSection() {
  const reviews = getFeaturedReviews();

  return (
    <section className="border-t border-brand-grey-100 bg-brand-grey-50 py-16 sm:py-20">
      <div className="container-main">
        <div className="text-center">
          <h2 className="section-heading">Trusted by Wellness Enthusiasts</h2>
          <p className="section-subheading mx-auto max-w-2xl">
            See what our customers are saying about their experience with 9X Pharma products.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Social proof bar */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-brand-grey-500">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Verified Purchases</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>4.5+ Average Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-brand-navy" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
            <span>Growing Community</span>
          </div>
        </div>
      </div>
    </section>
  );
}

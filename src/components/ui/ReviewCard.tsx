import { Review } from "@/types";
import StarRating from "./StarRating";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const date = new Date(review.date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="rounded-2xl border border-brand-grey-100 bg-white p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-semibold text-white">
              {review.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-grey-800">{review.name}</p>
              {review.location && (
                <p className="text-xs text-brand-grey-400">{review.location}</p>
              )}
            </div>
          </div>
        </div>
        {review.verified && (
          <span className="flex items-center gap-1 rounded-full bg-brand-green-pale px-2 py-0.5 text-xs font-medium text-brand-green-dark">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>
      <StarRating rating={review.rating} size="sm" />
      <p className="mt-3 text-sm leading-relaxed text-brand-grey-600">{review.text}</p>
      <p className="mt-3 text-xs text-brand-grey-400">{date}</p>
    </div>
  );
}

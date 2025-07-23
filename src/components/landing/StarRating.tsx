import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating?: number;
  totalStars?: number;
  className?: string;
};

export function StarRating({ rating = 5, totalStars = 5, className }: StarRatingProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: totalStars }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-5 w-5",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/50"
          )}
        />
      ))}
    </div>
  );
}

import { RecipeCardSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <div className="h-10 bg-muted rounded animate-pulse mb-2 w-48" />
          <div className="h-5 bg-muted rounded animate-pulse w-64" />
        </div>
        <div className="h-10 bg-muted rounded animate-pulse w-40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}


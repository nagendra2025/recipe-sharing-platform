import { RecipeCardSkeleton } from "@/components/skeletons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-10 bg-muted rounded animate-pulse mb-4 w-64" />
        <div className="h-5 bg-muted rounded animate-pulse mb-6 w-96" />

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="h-10 bg-muted rounded animate-pulse" />
          </div>
          <div className="h-10 bg-muted rounded animate-pulse w-24" />
        </div>

        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-9 bg-muted rounded animate-pulse w-20" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}


import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export function RecipeCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <div className="relative w-full h-48 bg-muted animate-pulse rounded-t-lg" />
      <CardHeader>
        <div className="h-6 bg-muted rounded animate-pulse mb-2" />
        <div className="h-4 bg-muted rounded animate-pulse w-3/4 mb-2" />
        <div className="h-4 bg-muted rounded animate-pulse w-1/2" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-5 bg-muted rounded animate-pulse w-20" />
      </CardContent>
      <CardFooter>
        <div className="h-10 bg-muted rounded animate-pulse w-full" />
      </CardFooter>
    </Card>
  );
}

export function RecipeDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="h-10 bg-muted rounded animate-pulse w-32" />
      </div>

      <article>
        <div className="relative w-full h-96 bg-muted animate-pulse rounded-lg mb-6" />

        <div className="mb-6">
          <div className="h-10 bg-muted rounded animate-pulse mb-4 w-3/4" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            <div>
              <div className="h-5 bg-muted rounded animate-pulse w-32 mb-2" />
              <div className="h-4 bg-muted rounded animate-pulse w-24" />
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 bg-muted rounded animate-pulse w-24" />
            <div className="h-4 bg-muted rounded animate-pulse w-24" />
            <div className="h-6 bg-muted rounded animate-pulse w-20" />
          </div>

          <div className="flex gap-2 mt-4">
            <div className="h-10 bg-muted rounded animate-pulse w-32" />
            <div className="h-10 bg-muted rounded animate-pulse w-32" />
          </div>
        </div>

        <div className="h-24 bg-muted rounded animate-pulse mb-6" />

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse w-24" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse w-28" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-4 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}

export function FormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-24" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>
      
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-32" />
        <div className="h-24 bg-muted rounded animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-28" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-32" />
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="h-10 bg-muted rounded animate-pulse w-24" />
        <div className="h-10 bg-muted rounded animate-pulse w-32" />
      </div>
    </div>
  );
}

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-24 w-24 bg-muted rounded-full animate-pulse" />
        <div className="space-y-2">
          <div className="h-10 bg-muted rounded animate-pulse w-32" />
          <div className="h-4 bg-muted rounded animate-pulse w-48" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-24" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>

      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse w-28" />
        <div className="h-10 bg-muted rounded animate-pulse" />
      </div>

      <div className="flex gap-2">
        <div className="h-10 bg-muted rounded animate-pulse w-32" />
        <div className="h-10 bg-muted rounded animate-pulse w-24" />
      </div>
    </div>
  );
}


import { ProfileFormSkeleton } from "@/components/skeletons";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="h-9 bg-muted rounded animate-pulse mb-6 w-48" />
      <ProfileFormSkeleton />
    </div>
  );
}


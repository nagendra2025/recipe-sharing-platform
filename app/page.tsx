import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

async function getRecipes(search?: string, category?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("recipes")
    .select("*, profiles(display_name, avatar_url)")
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(20);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  return data || [];
}

async function getCategories() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("recipes")
    .select("category")
    .eq("is_public", true)
    .not("category", "is", null);

  if (!data) return [];

  const categories = Array.from(
    new Set(data.map((r) => r.category).filter(Boolean))
  ) as string[];

  return categories.sort();
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const recipes = await getRecipes(params.search, params.category);
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Discover Recipes</h1>
        <p className="text-muted-foreground mb-6">
          Explore delicious recipes shared by our community
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form
            action="/"
            method="get"
            className="flex-1 flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                name="search"
                type="search"
                placeholder="Search recipes..."
                defaultValue={params.search}
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Link href="/">
              <Button
                variant={!params.category ? "default" : "outline"}
                size="sm"
              >
                All
              </Button>
            </Link>
            {categories.map((category) => (
              <Link key={category} href={`/?category=${encodeURIComponent(category)}`}>
                <Button
                  variant={params.category === category ? "default" : "outline"}
                  size="sm"
                >
                  {category}
                </Button>
              </Link>
            ))}
          </div>
        )}
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">
            {params.search || params.category
              ? "No recipes found matching your criteria."
              : "No recipes yet. Be the first to share one!"}
          </p>
          <Link href="/recipes/new">
            <Button className="mt-4">Create Recipe</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="flex flex-col">
              {recipe.image_url && (
                <div className="relative w-full h-48">
                  <Image
                    src={recipe.image_url}
                    alt={recipe.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">{recipe.title}</CardTitle>
                <CardDescription>
                  {recipe.description && (
                    <p className="line-clamp-2">{recipe.description}</p>
                  )}
                  <div className="mt-2 flex items-center gap-4 text-sm">
                    {recipe.prep_time_mins && (
                      <span>Prep: {recipe.prep_time_mins}m</span>
                    )}
                    {recipe.cook_time_mins && (
                      <span>Cook: {recipe.cook_time_mins}m</span>
                    )}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {recipe.category && (
                  <span className="inline-block px-2 py-1 text-xs bg-secondary rounded">
                    {recipe.category}
                  </span>
                )}
              </CardContent>
              <CardFooter>
                <Link href={`/recipes/${recipe.id}`} className="w-full">
                  <Button className="w-full">View Recipe</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteRecipe } from "@/lib/actions/recipes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

async function getMyRecipes() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }

  return data || [];
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const recipes = await getMyRecipes();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">My Recipes</h1>
          <p className="text-muted-foreground">
            Manage your recipes and create new ones
          </p>
        </div>
        <Link href="/recipes/new">
          <Button>Create New Recipe</Button>
        </Link>
      </div>

      {recipes.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg mb-4">
            You haven't created any recipes yet.
          </p>
          <Link href="/recipes/new">
            <Button>Create Your First Recipe</Button>
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
                  <div className="mt-2 text-xs text-muted-foreground">
                    {recipe.is_public ? (
                      <span className="text-green-600">Public</span>
                    ) : (
                      <span className="text-muted-foreground">Private</span>
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
              <CardFooter className="flex gap-2">
                <Link href={`/recipes/${recipe.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View
                  </Button>
                </Link>
                <Link href={`/recipes/${recipe.id}/edit`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Edit
                  </Button>
                </Link>
                <form action={deleteRecipe.bind(null, recipe.id)} className="flex-1">
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full"
                  >
                    Delete
                  </Button>
                </form>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


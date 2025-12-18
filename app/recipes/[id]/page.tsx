import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteRecipe } from "@/lib/actions/recipes";

async function getRecipe(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from("recipes")
    .select("*, profiles(display_name, avatar_url)")
    .eq("id", id);

  // If user is logged in, they can see their own recipes even if private
  // Otherwise, only show public recipes
  if (!user) {
    query = query.eq("is_public", true);
  } else {
    // RLS will handle showing public recipes or user's own recipes
  }

  const { data, error } = await query.single();

  if (error || !data) {
    return null;
  }

  return data;
}

async function canEditRecipe(recipeId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("recipes")
    .select("user_id")
    .eq("id", recipeId)
    .eq("user_id", user.id)
    .single();

  return !!data;
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);
  const canEdit = await canEditRecipe(id);

  if (!recipe) {
    notFound();
  }

  const profile = recipe.profiles as { display_name: string; avatar_url: string | null } | null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Link href="/">
          <Button variant="ghost">← Back to Feed</Button>
        </Link>
      </div>

      <article>
        {recipe.image_url && (
          <div className="relative w-full h-96 mb-6 rounded-lg overflow-hidden">
            <Image
              src={recipe.image_url}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || undefined} />
              <AvatarFallback>
                {profile?.display_name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{profile?.display_name || "Anonymous"}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(recipe.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            {recipe.prep_time_mins && (
              <span className="text-sm text-muted-foreground">
                Prep: {recipe.prep_time_mins} min
              </span>
            )}
            {recipe.cook_time_mins && (
              <span className="text-sm text-muted-foreground">
                Cook: {recipe.cook_time_mins} min
              </span>
            )}
            {recipe.category && (
              <span className="inline-block px-3 py-1 text-sm bg-secondary rounded">
                {recipe.category}
              </span>
            )}
          </div>

          {canEdit && (
            <div className="flex gap-2 mt-4">
              <Link href={`/recipes/${id}/edit`}>
                <Button variant="outline">Edit Recipe</Button>
              </Link>
              <form action={deleteRecipe.bind(null, id)}>
                <Button type="submit" variant="destructive">
                  Delete Recipe
                </Button>
              </form>
            </div>
          )}
        </div>

        {recipe.description && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <p className="text-lg">{recipe.description}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>
      </article>
    </div>
  );
}


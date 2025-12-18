import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecipeForm } from "@/components/recipe-form";

async function getRecipe(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Edit Recipe</h1>
      <RecipeForm recipe={recipe} />
    </div>
  );
}


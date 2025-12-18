import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { RecipeForm } from "@/components/recipe-form";

export default async function NewRecipePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Create New Recipe</h1>
      <RecipeForm />
    </div>
  );
}


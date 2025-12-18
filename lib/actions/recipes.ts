"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { RecipeInsert, RecipeUpdate } from "@/types/database";

export async function createRecipe(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to create a recipe" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ingredients = JSON.parse(formData.get("ingredients") as string) as string[];
  const steps = JSON.parse(formData.get("steps") as string) as string[];
  const prepTime = formData.get("prep_time_mins");
  const cookTime = formData.get("cook_time_mins");
  const category = formData.get("category") as string;
  const imageUrl = formData.get("image_url") as string;

  const recipeData: RecipeInsert = {
    user_id: user.id,
    title,
    description: description || null,
    ingredients,
    steps,
    prep_time_mins: prepTime ? parseInt(prepTime as string) : null,
    cook_time_mins: cookTime ? parseInt(cookTime as string) : null,
    category: category || null,
    image_url: imageUrl || null,
    is_public: true,
  };

  const { data, error } = await supabase
    .from("recipes")
    .insert(recipeData)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  redirect(`/recipes/${data.id}`);
}

export async function updateRecipe(recipeId: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to update a recipe" };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const ingredients = JSON.parse(formData.get("ingredients") as string) as string[];
  const steps = JSON.parse(formData.get("steps") as string) as string[];
  const prepTime = formData.get("prep_time_mins");
  const cookTime = formData.get("cook_time_mins");
  const category = formData.get("category") as string;
  const imageUrl = formData.get("image_url") as string;

  const recipeData: RecipeUpdate = {
    title,
    description: description || null,
    ingredients,
    steps,
    prep_time_mins: prepTime ? parseInt(prepTime as string) : null,
    cook_time_mins: cookTime ? parseInt(cookTime as string) : null,
    category: category || null,
    image_url: imageUrl || null,
  };

  const { error } = await supabase
    .from("recipes")
    .update(recipeData)
    .eq("id", recipeId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  revalidatePath(`/recipes/${recipeId}`);
  redirect(`/recipes/${recipeId}`);
}

export async function deleteRecipe(recipeId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to delete a recipe" };
  }

  const { error } = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipeId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  revalidatePath("/dashboard");
  redirect("/dashboard");
}


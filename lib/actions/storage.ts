"use server";

import { createClient } from "@/lib/supabase/server";

export async function uploadRecipeImage(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to upload images" };
  }

  const file = formData.get("file") as File;

  if (!file) {
    return { error: "No file provided" };
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${user.id}/${Date.now()}.${fileExt}`;
  const filePath = `recipes/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("recipe-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("recipe-images").getPublicUrl(filePath);

  return { url: publicUrl };
}


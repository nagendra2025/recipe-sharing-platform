"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createRecipe, updateRecipe } from "@/lib/actions/recipes";
import { uploadRecipeImage } from "@/lib/actions/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Recipe } from "@/types/database";
import { Plus, X } from "lucide-react";

interface RecipeFormProps {
  recipe?: Recipe;
}

const CATEGORIES = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Snack",
  "Appetizer",
  "Beverage",
  "Other",
];

export function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState(recipe?.image_url || "");
  const [isUploading, setIsUploading] = useState(false);
  const [category, setCategory] = useState(recipe?.category || "");

  const [ingredients, setIngredients] = useState<string[]>(
    recipe?.ingredients || [""]
  );
  const [steps, setSteps] = useState<string[]>(recipe?.steps || [""]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadRecipeImage(formData);
      if (result.url) {
        setImageUrl(result.url);
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      alert("Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (formData: FormData) => {
    const validIngredients = ingredients.filter((ing) => ing.trim() !== "");
    const validSteps = steps.filter((step) => step.trim() !== "");

    if (validIngredients.length === 0) {
      alert("Please add at least one ingredient");
      return;
    }

    if (validSteps.length === 0) {
      alert("Please add at least one step");
      return;
    }

    formData.append("ingredients", JSON.stringify(validIngredients));
    formData.append("steps", JSON.stringify(validSteps));
    if (imageUrl) {
      formData.append("image_url", imageUrl);
    }
    if (category) {
      formData.append("category", category);
    }

    startTransition(async () => {
      if (recipe) {
        const result = await updateRecipe(recipe.id, formData);
        if (result?.error) {
          alert(result.error);
        }
      } else {
        const result = await createRecipe(formData);
        if (result?.error) {
          alert(result.error);
        }
      }
    });
  };

  return (
    <form action={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              defaultValue={recipe?.title}
              required
              placeholder="e.g., Chocolate Chip Cookies"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={recipe?.description || ""}
              placeholder="A brief description of your recipe..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="prep_time_mins">Prep Time (minutes)</Label>
              <Input
                id="prep_time_mins"
                name="prep_time_mins"
                type="number"
                min="0"
                defaultValue={recipe?.prep_time_mins || ""}
                placeholder="15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cook_time_mins">Cook Time (minutes)</Label>
              <Input
                id="cook_time_mins"
                name="cook_time_mins"
                type="number"
                min="0"
                defaultValue={recipe?.cook_time_mins || ""}
                placeholder="30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <input type="hidden" name="category" value={category} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {imageUrl && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={imageUrl}
                alt="Recipe preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="image">Recipe Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUploading}
            />
            {isUploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ingredients *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                placeholder="e.g., 2 cups flour"
              />
              {ingredients.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeIngredient(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addIngredient}>
            <Plus className="h-4 w-4 mr-2" />
            Add Ingredient
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Instructions *</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <Textarea
                value={step}
                onChange={(e) => updateStep(index, e.target.value)}
                placeholder={`Step ${index + 1}...`}
                rows={2}
                className="flex-1"
              />
              {steps.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeStep(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addStep}>
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isPending || isUploading}>
          {isPending ? "Saving..." : recipe ? "Update Recipe" : "Create Recipe"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}


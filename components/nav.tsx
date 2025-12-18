import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function Nav() {
  let user = null;
  let profile = null;

  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    user = authUser;

    if (user) {
      const profileResult = await supabase
        .from("profiles")
        .select("display_name, avatar_url")
        .eq("id", user.id)
        .single();
      profile = profileResult;
    }
  } catch (error) {
    // If Supabase is not configured, show a message in development
    if (process.env.NODE_ENV === "development") {
      console.error("Supabase configuration error:", error);
    }
    // Continue rendering without user data
  }

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            RecipeShare
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost">Browse</Button>
            </Link>

            {user ? (
              <>
                <Link href="/recipes/new">
                  <Button>Create Recipe</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost">My Recipes</Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={profile?.data?.avatar_url || undefined}
                          alt={profile?.data?.display_name || "User"}
                        />
                        <AvatarFallback>
                          {profile?.data?.display_name
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link href="/profile">
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <form action={signOut}>
                      <DropdownMenuItem asChild>
                        <button type="submit" className="w-full text-left">
                          Sign Out
                        </button>
                      </DropdownMenuItem>
                    </form>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


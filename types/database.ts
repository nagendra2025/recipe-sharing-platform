export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          display_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          display_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      recipes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string | null;
          ingredients: string[];
          steps: string[];
          prep_time_mins: number | null;
          cook_time_mins: number | null;
          category: string | null;
          image_url: string | null;
          is_public: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description?: string | null;
          ingredients: string[];
          steps: string[];
          prep_time_mins?: number | null;
          cook_time_mins?: number | null;
          category?: string | null;
          image_url?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          description?: string | null;
          ingredients?: string[];
          steps?: string[];
          prep_time_mins?: number | null;
          cook_time_mins?: number | null;
          category?: string | null;
          image_url?: string | null;
          is_public?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Recipe = Database["public"]["Tables"]["recipes"]["Row"];
export type RecipeInsert = Database["public"]["Tables"]["recipes"]["Insert"];
export type RecipeUpdate = Database["public"]["Tables"]["recipes"]["Update"];


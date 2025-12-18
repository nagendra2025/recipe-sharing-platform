# Recipe Sharing Platform

A modern, full-stack recipe sharing platform built with Next.js 15, React 19, TypeScript, and Supabase.

## Features

- 🔐 **Authentication** - Secure user authentication with Supabase Auth
- 📝 **Recipe Management** - Create, edit, and delete recipes
- 🖼️ **Image Upload** - Upload recipe images to Supabase Storage
- 🔍 **Search & Filter** - Search recipes by title and filter by category
- 👤 **User Profiles** - Customizable user profiles with avatars
- 📱 **Responsive Design** - Beautiful, mobile-first UI with Tailwind CSS and Shadcn UI
- 🔒 **Row Level Security** - Secure data access with Supabase RLS policies

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: Shadcn UI (Radix UI)
- **Backend**: Supabase
  - PostgreSQL Database
  - Supabase Auth
  - Supabase Storage
  - Row Level Security (RLS)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account ([sign up here](https://supabase.com))

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd recipe-sharing-platform
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings** → **API** to get your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Set Up Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL script from `supabase/schema.sql` to create:
   - `profiles` table
   - `recipes` table
   - Row Level Security policies
   - Indexes for performance
   - Triggers for automatic profile creation

### 4. Set Up Storage Buckets

1. Go to **Storage** in your Supabase dashboard
2. Create two storage buckets:
   - `recipe-images` (public)
   - `avatars` (public)

3. Set up storage policies (optional, for additional security):

```sql
-- Allow authenticated users to upload recipe images
CREATE POLICY "Users can upload recipe images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'recipe-images');

-- Allow authenticated users to upload avatars
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');

-- Allow public read access
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id IN ('recipe-images', 'avatars'));
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
recipe-sharing-platform/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # User dashboard (my recipes)
│   ├── login/            # Sign in page
│   ├── signup/           # Sign up page
│   ├── profile/          # User profile settings
│   └── recipes/          # Recipe pages
│       ├── [id]/         # Recipe detail page
│       ├── [id]/edit/    # Edit recipe page
│       └── new/          # Create recipe page
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── nav.tsx           # Navigation component
│   ├── recipe-form.tsx  # Recipe creation/edit form
│   └── profile-form.tsx  # Profile settings form
├── lib/                  # Utility functions
│   ├── actions/          # Server actions
│   │   ├── auth.ts      # Authentication actions
│   │   ├── recipes.ts   # Recipe CRUD actions
│   │   └── storage.ts   # Image upload actions
│   └── supabase/        # Supabase client utilities
├── supabase/             # Database schema
│   └── schema.sql       # SQL schema and RLS policies
├── types/                # TypeScript types
│   └── database.ts      # Database type definitions
└── middleware.ts         # Next.js middleware for auth
```

## Key Features Implementation

### Authentication

- Email/password authentication via Supabase Auth
- Automatic profile creation on signup
- Protected routes with middleware
- Password reset functionality

### Recipe Management

- Create recipes with title, description, ingredients, steps, and images
- Edit and delete your own recipes
- Public recipe browsing
- Search by title
- Filter by category

### Image Upload

- Upload recipe images to Supabase Storage
- Avatar upload for user profiles
- Optimized image display with Next.js Image component

### Security

- Row Level Security (RLS) policies enforce data access
- Users can only edit/delete their own recipes
- Public recipes are viewable by everyone
- Private recipes are only visible to the owner

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for password reset links) |

## Database Schema

### Profiles Table

- `id` (UUID, Primary Key) - References auth.users
- `display_name` (Text) - User's display name
- `avatar_url` (Text) - URL to user's avatar image
- `created_at` (Timestamp) - Account creation date

### Recipes Table

- `id` (UUID, Primary Key)
- `user_id` (UUID, Foreign Key) - References profiles.id
- `title` (Text, Required) - Recipe title
- `description` (Text) - Recipe description
- `ingredients` (Text Array, Required) - List of ingredients
- `steps` (Text Array, Required) - Cooking instructions
- `prep_time_mins` (Integer) - Preparation time in minutes
- `cook_time_mins` (Integer) - Cooking time in minutes
- `category` (Text) - Recipe category
- `image_url` (Text) - URL to recipe image
- `is_public` (Boolean) - Whether recipe is publicly visible
- `created_at` (Timestamp) - Creation date
- `updated_at` (Timestamp) - Last update date

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Update Supabase Redirect URLs

After deployment, update your Supabase project settings:

1. Go to **Authentication** → **URL Configuration**
2. Add your production URL to **Site URL** and **Redirect URLs**

## Future Enhancements (Post-MVP)

- [ ] Favorites/bookmarks
- [ ] Comments and ratings
- [ ] Advanced filters (cuisine, difficulty, cook time)
- [ ] AI-assisted recipe formatting
- [ ] Meal planner
- [ ] Grocery list generator
- [ ] Recipe sharing via social media
- [ ] Recipe collections/meal plans

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

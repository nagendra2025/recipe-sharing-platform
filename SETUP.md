# Setup Guide

This guide will walk you through setting up the Recipe Sharing Platform step by step.

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Name: `recipe-sharing-platform` (or your choice)
   - Database Password: (save this securely)
   - Region: Choose closest to you
4. Wait for the project to be created (takes ~2 minutes)

## Step 3: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon public** key (under "Project API keys")

## Step 4: Create Environment Variables

1. Create a `.env.local` file in the root directory
2. Add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Replace `your_project_url_here` and `your_anon_key_here` with the values from Step 3.

## Step 5: Set Up Database

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase/schema.sql`
4. Click "Run" (or press Ctrl+Enter)
5. You should see "Success. No rows returned"

This creates:
- `profiles` table
- `recipes` table
- Row Level Security policies
- Indexes for performance
- Triggers for automatic profile creation

## Step 6: Set Up Storage Buckets

### Create Recipe Images Bucket

1. Go to **Storage** in Supabase dashboard
2. Click "New bucket"
3. Name: `recipe-images`
4. Make it **Public** (toggle ON)
5. Click "Create bucket"

### Create Avatars Bucket

1. Click "New bucket" again
2. Name: `avatars`
3. Make it **Public** (toggle ON)
4. Click "Create bucket"

### Set Up Storage Policies (Optional but Recommended)

1. Go to **Storage** → **Policies**
2. For `recipe-images` bucket:
   - Click "New Policy"
   - Policy name: "Users can upload recipe images"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - Policy definition:
     ```sql
     (bucket_id = 'recipe-images')
     ```
   - Click "Review" then "Save policy"

3. For `avatars` bucket:
   - Click "New Policy"
   - Policy name: "Users can upload avatars"
   - Allowed operation: INSERT
   - Target roles: authenticated
   - Policy definition:
     ```sql
     (bucket_id = 'avatars')
     ```
   - Click "Review" then "Save policy"

4. For both buckets (public read):
   - Click "New Policy" on `recipe-images`
   - Policy name: "Public read access"
   - Allowed operation: SELECT
   - Target roles: anon, authenticated
   - Policy definition:
     ```sql
     (bucket_id = 'recipe-images')
     ```
   - Repeat for `avatars` bucket

## Step 7: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 8: Test the Application

1. **Sign Up**: Go to `/signup` and create an account
2. **Create Recipe**: Go to `/recipes/new` and create your first recipe
3. **Browse**: Go to home page `/` to see all recipes
4. **Search**: Try searching for recipes
5. **Edit**: Go to your dashboard `/dashboard` to edit/delete recipes

## Troubleshooting

### "Invalid API key" error

- Make sure your `.env.local` file has the correct values
- Restart your dev server after changing `.env.local`

### "relation does not exist" error

- Make sure you ran the SQL schema in Step 5
- Check that tables exist in **Table Editor** in Supabase dashboard

### Images not uploading

- Verify storage buckets are created and public
- Check storage policies are set up correctly
- Make sure you're logged in (images require authentication)

### "Row Level Security policy violation"

- Verify RLS policies were created in Step 5
- Check that you're logged in when trying to create/edit recipes

### Can't see recipes on home page

- Make sure recipes have `is_public = true`
- Check that you're not filtering by a category that doesn't exist

## Next Steps

- Customize the categories in `components/recipe-form.tsx`
- Add more features from the post-MVP list
- Deploy to Vercel for production

## Production Deployment

When deploying to production:

1. Update `NEXT_PUBLIC_SITE_URL` in `.env.local` to your production URL
2. In Supabase dashboard, go to **Authentication** → **URL Configuration**
3. Add your production URL to:
   - **Site URL**
   - **Redirect URLs** (add both `https://yourdomain.com` and `https://yourdomain.com/auth/callback`)


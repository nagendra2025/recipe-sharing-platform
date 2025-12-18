# Quick Setup Checklist

Use this checklist to track your setup progress.

## Authentication Setup
- [ ] Go to Authentication → Sign In / Providers (in CONFIGURATION section)
- [ ] Click on Email provider
- [ ] Note: Email is enabled by default - no toggle needed ✅
- [ ] Verify "Secure email change" is ON (green toggle)
- [ ] Review other settings (defaults are fine)
- [ ] Click **Save** button
- [ ] Go to Authentication → URL Configuration
  - [ ] Set Site URL: `http://localhost:3000`
  - [ ] Add Redirect URLs:
    - [ ] `http://localhost:3000`
    - [ ] `http://localhost:3000/dashboard`
    - [ ] `http://localhost:3000/auth/callback`
  - [ ] Click Save

## Database Setup
- [ ] Go to SQL Editor → New Query
- [ ] Copy entire `supabase/schema.sql` file
- [ ] Paste into SQL Editor
- [ ] Click Run (or Ctrl+Enter)
- [ ] Verify success message: "Success. No rows returned"
- [ ] Go to Table Editor → Verify tables exist:
  - [ ] `profiles` table
  - [ ] `recipes` table
- [ ] Verify RLS Policies:
  - [ ] `profiles` table has 3 policies
  - [ ] `recipes` table has 4 policies

## Storage Setup
- [ ] Create `recipe-images` bucket:
  - [ ] Name: `recipe-images` (exact)
  - [ ] Public bucket: ON ✅
  - [ ] Created successfully
- [ ] Create `avatars` bucket:
  - [ ] Name: `avatars` (exact)
  - [ ] Public bucket: ON ✅
  - [ ] Created successfully

## Storage Policies (Optional but Recommended)
- [ ] `recipe-images` bucket:
  - [ ] Policy: "Users can upload recipe images" (INSERT, authenticated)
  - [ ] Policy: "Public read access" (SELECT, anon + authenticated)
- [ ] `avatars` bucket:
  - [ ] Policy: "Users can upload avatars" (INSERT, authenticated)
  - [ ] Policy: "Public read access" (SELECT, anon + authenticated)

## Testing
- [ ] Restart dev server: `npm run dev`
- [ ] App loads without errors
- [ ] Test signup: Create account at `/signup`
- [ ] Test login: Log in at `/login`
- [ ] Test recipe creation: Create recipe at `/recipes/new`
- [ ] Test image upload: Upload image with recipe
- [ ] Test profile: Edit profile at `/profile`
- [ ] Test search: Search recipes on home page
- [ ] Test filter: Filter by category

## Verification in Supabase Dashboard
- [ ] Authentication → Users: See your test user
- [ ] Table Editor → profiles: See your profile
- [ ] Table Editor → recipes: See your test recipe
- [ ] Storage → recipe-images: See uploaded image
- [ ] Storage → avatars: (if you uploaded avatar)

---

**All checked? You're ready to go! 🚀**


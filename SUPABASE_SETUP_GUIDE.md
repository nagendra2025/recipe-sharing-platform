# Complete Supabase Setup Guide

This guide will walk you through setting up your Supabase backend step by step.

## Prerequisites

- ✅ Supabase project created
- ✅ Environment variables configured in `.env.local`
- ✅ Supabase credentials available

---

## Step 1: Configure Authentication in Supabase

### 1.1 Configure Email Authentication

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** (in the left sidebar)
4. In the **CONFIGURATION** section, click on **Sign In / Providers**
5. You'll see a list of authentication providers
6. Click on **Email** provider
7. **Note**: Email provider is enabled by default - no toggle needed!
8. Configure the following settings (these are what you'll see):
   - ✅ **Secure email change** - Keep this ON (green) for security
   - **Secure password change** - Can be ON or OFF (your preference)
   - **Minimum password length** - Default is 8 (recommended)
   - **Password Requirements** - Default is fine
   - **Email OTP Expiration** - Default 3600 seconds is fine
   - **Email OTP Length** - Default 8 is fine
9. Click **Save** at the bottom right

**Important Note**: In the current Supabase UI, email confirmation is handled automatically. For development, users can sign up immediately. Email confirmation emails are sent if configured in Email Templates section.

### 1.2 Configure URL Settings (Important!)

1. Still in **Authentication**, go to **URL Configuration**
2. Set the following:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add these URLs (one per line):
     ```
     http://localhost:3000
     http://localhost:3000/dashboard
     http://localhost:3000/auth/callback
     ```
3. Click **Save**

### 1.3 Email Templates (Optional - for development you can skip this!)

**Important**: For development, you don't need to configure email templates. Users can sign up and use the app immediately without email confirmation.

If you want to see or customize email templates:

1. Go to **Authentication** → **Email** (in NOTIFICATIONS section, left sidebar)
2. You should see the **Templates** tab (default view)
3. Under **Authentication** section, you'll see a list of email templates:
   - **Confirm sign up** - This is where email confirmation is managed
   - **Invite user**
   - **Magic link**
   - **Change email address**
   - **Reset password**
   - **Reauthentication**

**For Development**:

- You can skip email confirmation entirely - the app works fine without it
- Users can sign up and immediately use the app
- No email templates need to be configured

**For Production** (later):

- You may want to enable email confirmation
- Click on "Confirm sign up" template to customize it
- Set up custom SMTP (see the warning banner on the page)

### 1.4 Email Confirmation - SKIP FOR NOW! ✅

**For Development**: Email confirmation is **NOT required**. Your app will work perfectly without it!

**How it works**:

- Users can sign up immediately
- They can use the app right away
- No email confirmation needed for development

**If you want to see email templates** (optional, not needed for now):

1. Go to **Authentication** → **Email** (in NOTIFICATIONS section)
2. Click on **Templates** tab
3. Scroll down to see "Confirm sign up" template (if you want to customize it later)

**Bottom line**: Skip email confirmation setup for now. Focus on getting the database and storage set up first. You can always add email confirmation later if needed for production.

**✅ Authentication Setup Complete!**

---

## Step 2: Set Up Database Schema

### 2.1 Run the SQL Schema

1. In Supabase Dashboard, go to **SQL Editor** (in the left sidebar)
2. Click **New Query** button (top right)
3. Open the `supabase/schema.sql` file from your project
4. **Copy the ENTIRE contents** of the file (all 108 lines)
5. Paste it into the SQL Editor in Supabase
6. Click **Run** button (or press `Ctrl+Enter` / `Cmd+Enter`)
7. Wait for execution to complete
8. You should see: **"Success. No rows returned"** ✅

### 2.2 Verify Tables Were Created

1. Go to **Table Editor** (in the left sidebar)
2. You should see two tables:
   - ✅ `profiles`
   - ✅ `recipes`
3. Click on each table to verify the columns are correct

### 2.3 Verify RLS Policies

1. In **Table Editor**, click on the `profiles` table
2. Click on the **Policies** tab
3. You should see 3 policies:
   - ✅ "Public profiles are viewable by everyone"
   - ✅ "Users can update own profile"
   - ✅ "Users can insert own profile"
4. Click on the `recipes` table
5. Check the **Policies** tab - you should see 4 policies:
   - ✅ "Public recipes are viewable by everyone"
   - ✅ "Users can insert own recipes"
   - ✅ "Users can update own recipes"
   - ✅ "Users can delete own recipes"

**✅ Database Setup Complete!**

---

## Step 3: Set Up Storage Buckets

### 3.1 Create Recipe Images Bucket

1. Go to **Storage** (in the left sidebar)
2. Click **New bucket** button
3. Fill in the form:
   - **Name**: `recipe-images` (must be exact)
   - **Public bucket**: Toggle **ON** ✅ (important!)
   - **File size limit**: Leave default or set to 5MB
   - **Allowed MIME types**: Leave empty (allows all image types)
4. Click **Create bucket**
5. Wait for confirmation

### 3.2 Create Avatars Bucket

1. Still in **Storage**, click **New bucket** again
2. Fill in the form:
   - **Name**: `avatars` (must be exact)
   - **Public bucket**: Toggle **ON** ✅ (important!)
   - **File size limit**: Leave default or set to 2MB
   - **Allowed MIME types**: Leave empty
3. Click **Create bucket**
4. Wait for confirmation

### 3.3 Verify Buckets

You should now see two buckets in your Storage:

- ✅ `recipe-images` (Public)
- ✅ `avatars` (Public)

**✅ Storage Buckets Created!**

---

## Step 4: Set Up Storage Policies (Recommended)

Storage policies control who can upload, read, and delete files. Let's set them up properly.

### 4.1 Policy for Recipe Images Upload

1. Go to **Storage** → Click on `recipe-images` bucket
2. Click on the **Policies** tab
3. Click **New Policy** button
4. Choose **For full customization** (or use template)
5. Fill in:
   - **Policy name**: `Users can upload recipe images`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **Policy definition** (USING expression): Leave empty
   - **Policy definition** (WITH CHECK expression):
     ```sql
     bucket_id = 'recipe-images'
     ```
6. Click **Review** then **Save policy**

### 4.2 Policy for Avatars Upload

1. Click on `avatars` bucket
2. Click **Policies** tab → **New Policy**
3. Fill in:
   - **Policy name**: `Users can upload avatars`
   - **Allowed operation**: `INSERT`
   - **Target roles**: `authenticated`
   - **WITH CHECK expression**:
     ```sql
     bucket_id = 'avatars'
     ```
4. Click **Review** then **Save policy**

### 4.3 Public Read Access for Recipe Images

1. Still in `recipe-images` bucket → **Policies** tab
2. Click **New Policy**
3. Fill in:
   - **Policy name**: `Public read access for recipe images`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `anon, authenticated` (select both)
   - **USING expression**:
     ```sql
     bucket_id = 'recipe-images'
     ```
4. Click **Review** then **Save policy**

### 4.4 Public Read Access for Avatars

1. Click on `avatars` bucket → **Policies** tab
2. Click **New Policy**
3. Fill in:
   - **Policy name**: `Public read access for avatars`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `anon, authenticated`
   - **USING expression**:
     ```sql
     bucket_id = 'avatars'
     ```
4. Click **Review** then **Save policy**

**✅ Storage Policies Complete!**

---

## Step 5: Verify Everything Works

### 5.1 Test Database Connection

1. Restart your dev server:
   ```bash
   npm run dev
   ```
2. Open http://localhost:3000
3. The app should load without errors

### 5.2 Test Authentication

1. Go to http://localhost:3000/signup
2. Create a test account:
   - Email: `test@example.com`
   - Password: `testpassword123`
   - Display Name: `Test User`
3. Click **Sign Up**
4. You should be redirected to `/dashboard`
5. Check Supabase Dashboard → **Authentication** → **Users** - you should see your new user
6. Check **Table Editor** → `profiles` - you should see a profile automatically created

### 5.3 Test Recipe Creation

1. While logged in, go to `/recipes/new`
2. Fill in a test recipe
3. Try uploading an image
4. Submit the recipe
5. Check **Table Editor** → `recipes` - you should see your recipe
6. Check **Storage** → `recipe-images` - you should see the uploaded image

**✅ Everything is working!**

---

## Troubleshooting

### Issue: "relation does not exist" error

**Solution**: Make sure you ran the entire `schema.sql` file in Step 2.1

### Issue: "Row Level Security policy violation"

**Solution**:

- Verify RLS policies exist (Step 2.3)
- Make sure you're logged in when creating recipes
- Check that the user_id matches in the database

### Issue: Images not uploading

**Solution**:

- Verify storage buckets are created and public (Step 3)
- Check storage policies are set up (Step 4)
- Make sure you're logged in (images require authentication)
- Check browser console for errors

### Issue: "Invalid API key" error

**Solution**:

- Verify `.env.local` has correct credentials
- Restart dev server after changing `.env.local`
- Check Supabase Dashboard → Settings → API for correct values

### Issue: Can't sign up / login

**Solution**:

- Check Authentication → Providers → Email is enabled
- Verify URL Configuration has `http://localhost:3000`
- Check browser console for specific error messages
- Verify email confirmation is disabled for development (if needed)

### Issue: Profile not created automatically

**Solution**:

- Verify the trigger was created in schema.sql (Step 2.1)
- Check Supabase Dashboard → Database → Functions → `handle_new_user` exists
- Check Database → Triggers → `on_auth_user_created` exists

---

## Next Steps

Once everything is set up:

1. ✅ Test all features (signup, login, create recipe, upload images)
2. ✅ Create some sample recipes
3. ✅ Test search and filter functionality
4. ✅ Test profile editing and avatar upload
5. 🚀 Deploy to production (Vercel recommended)

---

## Production Deployment Checklist

When deploying to production:

1. Update `.env.local` → `NEXT_PUBLIC_SITE_URL` to your production URL
2. In Supabase → Authentication → URL Configuration:
   - Update **Site URL** to your production URL
   - Add production URLs to **Redirect URLs**
3. Deploy to Vercel (or your preferred platform)
4. Add environment variables in your hosting platform
5. Test authentication in production

---

## Summary Checklist

- [ ] Authentication configured (Email provider enabled)
- [ ] URL Configuration set (localhost URLs added)
- [ ] Database schema executed (schema.sql run successfully)
- [ ] Tables verified (profiles and recipes exist)
- [ ] RLS policies verified (all policies exist)
- [ ] Storage buckets created (recipe-images and avatars)
- [ ] Storage policies configured (upload and read policies)
- [ ] Test signup works
- [ ] Test recipe creation works
- [ ] Test image upload works

**You're all set! 🎉**

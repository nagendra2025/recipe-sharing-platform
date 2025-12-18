# Quick Start Guide - Supabase Setup

Follow these steps in order. Each step takes 2-5 minutes.

---

## 🔐 Step 1: Configure Authentication (5 minutes)

### 1.1 Configure Email Provider
1. Supabase Dashboard → **Authentication** (left sidebar)
2. In **CONFIGURATION** section → Click **Sign In / Providers**
3. Click on **Email** provider
4. **Note**: Email is enabled by default - no toggle needed! ✅
5. Review settings (defaults are fine for development):
   - **Secure email change**: Keep ON ✅
   - **Minimum password length**: 8 (default is fine)
6. Click **Save** (bottom right)

### 1.2 Set URL Configuration
1. **Authentication** → **URL Configuration**
2. **Site URL**: `http://localhost:3000`
3. **Redirect URLs** (add each on a new line):
   ```
   http://localhost:3000
   http://localhost:3000/dashboard
   http://localhost:3000/auth/callback
   ```
4. Click **Save**

**Note**: Email confirmation is NOT needed for development. Users can sign up and use the app immediately!

✅ **Authentication ready!**

---

## 🗄️ Step 2: Create Database Tables (3 minutes)

### 2.1 Run SQL Schema
1. Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Open `supabase/schema.sql` from your project
4. **Copy ALL 108 lines** of SQL
5. Paste into SQL Editor
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for: **"Success. No rows returned"** ✅

### 2.2 Verify
1. **Table Editor** → Should see:
   - ✅ `profiles` table
   - ✅ `recipes` table

✅ **Database ready!**

---

## 📦 Step 3: Create Storage Buckets (2 minutes)

### 3.1 Create Recipe Images Bucket
1. **Storage** → **New bucket**
2. Name: `recipe-images` (exact spelling)
3. **Public bucket**: Toggle **ON** ✅
4. Click **Create bucket**

### 3.2 Create Avatars Bucket
1. **Storage** → **New bucket** (again)
2. Name: `avatars` (exact spelling)
3. **Public bucket**: Toggle **ON** ✅
4. Click **Create bucket**

✅ **Storage ready!**

---

## 🔒 Step 4: Storage Policies (Optional - 5 minutes)

**Note**: If buckets are public, basic read access works. Policies add upload security.

### For `recipe-images` bucket:
1. Click bucket → **Policies** tab → **New Policy**
2. **Policy name**: `Users can upload recipe images`
3. **Operation**: `INSERT`
4. **Roles**: `authenticated`
5. **WITH CHECK**: `bucket_id = 'recipe-images'`
6. Save

### For `avatars` bucket:
1. Click bucket → **Policies** tab → **New Policy**
2. **Policy name**: `Users can upload avatars`
3. **Operation**: `INSERT`
4. **Roles**: `authenticated`
5. **WITH CHECK**: `bucket_id = 'avatars'`
6. Save

✅ **Policies ready!**

---

## ✅ Step 5: Test Everything (3 minutes)

1. **Restart dev server**:
   ```bash
   npm run dev
   ```

2. **Test signup**:
   - Go to http://localhost:3000/signup
   - Create account
   - Should redirect to dashboard ✅

3. **Test recipe creation**:
   - Go to `/recipes/new`
   - Create a recipe with image
   - Submit ✅

4. **Verify in Supabase**:
   - **Authentication** → **Users**: See your user ✅
   - **Table Editor** → **profiles**: See profile ✅
   - **Table Editor** → **recipes**: See recipe ✅
   - **Storage** → **recipe-images**: See image ✅

---

## 🎉 Done!

Your app is now fully configured and ready to use!

**Next**: Start creating recipes and exploring the platform!

---

## 📚 Need More Details?

- **Detailed guide**: See `SUPABASE_SETUP_GUIDE.md`
- **Checklist**: See `SETUP_CHECKLIST.md`
- **Troubleshooting**: See `SUPABASE_SETUP_GUIDE.md` → Troubleshooting section


# Next Steps After Database Schema Setup ✅

Great! You've completed the database schema. Now let's make sure everything else is set up and test your signup.

---

## ✅ What You've Completed

- [x] Database schema run successfully
- [x] `profiles` table created
- [x] `recipes` table created
- [x] RLS policies set up
- [x] Triggers configured

---

## 🔍 Quick Verification

Before testing signup, let's verify a few things:

### 1. Verify Tables Exist

1. Go to Supabase Dashboard → **Table Editor**
2. You should see:
   - ✅ `profiles` table
   - ✅ `recipes` table

If you see both → ✅ Good!

---

### 2. Verify URL Configuration (Important!)

This is **critical** for signup to work properly:

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration** (in CONFIGURATION section)
2. Check:
   - **Site URL**: Should be `http://localhost:3000`
   - **Redirect URLs**: Should include:
     ```
     http://localhost:3000
     http://localhost:3000/dashboard
     http://localhost:3000/auth/callback
     ```
3. If not set, add them and click **Save**

---

### 3. Verify Email Provider

1. Go to **Authentication** → **Sign In / Providers** → **Email**
2. Make sure settings are saved (defaults are fine)
3. Click **Save** if you made any changes

---

## 🧪 Test Signup Now!

Now that the database is set up, try signing up:

1. Go to http://localhost:3000/signup
2. Fill in the form:
   - Display Name: Your name
   - Email: test@example.com (or any email)
   - Password: (at least 6 characters)
3. Click **Sign Up**

### What Should Happen:

✅ **Success**: 
- No error message appears
- Page redirects to `/dashboard`
- You see your dashboard

✅ **In Supabase Dashboard**:
- **Authentication** → **Users**: Your new user appears
- **Table Editor** → **profiles**: Your profile automatically created

### If You See an Error:

The error message will now be visible in a red box. Common issues:

- **"relation does not exist"** → Database schema issue (but you said it's done, so unlikely)
- **"permission denied"** → RLS policy issue (check policies exist)
- **"invalid API key"** → Check `.env.local` file
- **"email already registered"** → Try different email

---

## 📦 Optional: Set Up Storage (For Images)

If you want to upload recipe images and avatars, set up storage buckets:

### Create Recipe Images Bucket

1. Supabase Dashboard → **Storage**
2. Click **New bucket**
3. Name: `recipe-images` (exact spelling)
4. **Public bucket**: Toggle **ON** ✅
5. Click **Create bucket**

### Create Avatars Bucket

1. Still in **Storage** → Click **New bucket** again
2. Name: `avatars` (exact spelling)
3. **Public bucket**: Toggle **ON** ✅
4. Click **Create bucket**

**Note**: You can do this later if you just want to test signup first!

---

## 🎯 Current Status Checklist

- [x] Database schema run
- [ ] URL Configuration verified
- [ ] Signup tested successfully
- [ ] Storage buckets created (optional)

---

## 🚀 Try Signup Now!

1. Make sure your dev server is running: `npm run dev`
2. Go to http://localhost:3000/signup
3. Fill in the form and click **Sign Up**
4. **Check for error messages** (now visible!)
5. If successful, you should be redirected to `/dashboard`

---

## 💡 What to Check After Signup

If signup works:

1. ✅ You're redirected to `/dashboard`
2. ✅ In Supabase → **Authentication** → **Users**: See your user
3. ✅ In Supabase → **Table Editor** → **profiles**: See your profile

If signup doesn't work:

1. ❌ Check the **error message** (now visible in red box)
2. ❌ Check **browser console** (F12 → Console tab)
3. ❌ Check **terminal** (where `npm run dev` is running)
4. ❌ Verify **URL Configuration** is set correctly

---

**Go ahead and test signup now!** Let me know what happens - whether it works or if you see any error messages! 🎉


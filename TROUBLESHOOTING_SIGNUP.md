# Troubleshooting Signup Issues

## ✅ What I Just Fixed

I've updated the signup and login pages to **display errors** so you can see what's going wrong. Now when you try to sign up, any errors will be shown in a red error box at the top of the form.

---

## 🔍 Most Common Issue: Database Schema Not Set Up

**If signup fails or doesn't redirect, the most likely cause is that the database schema hasn't been run yet.**

### How to Check:

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** (left sidebar)
3. Check if you see:
   - ✅ `profiles` table
   - ✅ `recipes` table

**If these tables don't exist**, that's your problem!

### Solution:

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Open `supabase/schema.sql` from your project
4. **Copy ALL 108 lines** of SQL
5. Paste into SQL Editor
6. Click **Run** (or press `Ctrl+Enter`)
7. Wait for: **"Success. No rows returned"** ✅

### Verify It Worked:

1. Go to **Table Editor**
2. You should now see:
   - ✅ `profiles` table
   - ✅ `recipes` table
3. Click on `profiles` → **Policies** tab
4. You should see 3 policies listed

---

## 🔍 Other Common Issues

### Issue: "relation 'profiles' does not exist"

**Cause**: Database schema not run

**Solution**: Run the SQL schema (see above)

---

### Issue: "new row violates row-level security policy"

**Cause**: RLS policies not set up correctly

**Solution**: 
1. Verify you ran the complete `schema.sql` file
2. Check **Table Editor** → `profiles` → **Policies** tab
3. Should see 3 policies
4. Check **Table Editor** → `recipes` → **Policies** tab  
5. Should see 4 policies

---

### Issue: "duplicate key value violates unique constraint"

**Cause**: User already exists

**Solution**: Try a different email address, or delete the user from Supabase Dashboard → Authentication → Users

---

### Issue: Signup succeeds but no redirect

**Possible causes**:
1. Database schema not run (profile creation fails)
2. Middleware issue
3. URL Configuration not set

**Solution**:
1. **Check database**: Run schema.sql if not done
2. **Check URL Configuration**: 
   - Go to Authentication → URL Configuration
   - Site URL: `http://localhost:3000`
   - Redirect URLs: Add `http://localhost:3000/dashboard`
3. **Check browser console**: Look for JavaScript errors
4. **Check server logs**: Look at your terminal where `npm run dev` is running

---

### Issue: Error message shows but I don't know what it means

**Common error messages**:

- **"relation does not exist"** → Database schema not run
- **"permission denied"** → RLS policies not set up
- **"invalid API key"** → Check `.env.local` file
- **"email already registered"** → User already exists, try different email
- **"password should be at least 6 characters"** → Password too short

---

## 🧪 Testing Steps

After fixing issues, test in this order:

1. **Try signup again**
   - Fill in the form
   - Click "Sign Up"
   - **Check for error message** (now visible!)
   - If error appears, read it and fix the issue

2. **Check Supabase Dashboard**:
   - **Authentication** → **Users**: Should see your new user
   - **Table Editor** → **profiles**: Should see your profile automatically created

3. **If signup succeeds**:
   - Should redirect to `/dashboard`
   - Should see your dashboard page

---

## 📋 Quick Checklist

Before trying signup, make sure:

- [ ] Database schema has been run (see `profiles` and `recipes` tables)
- [ ] URL Configuration is set (Site URL and Redirect URLs)
- [ ] `.env.local` has correct Supabase credentials
- [ ] Dev server is running (`npm run dev`)
- [ ] No errors in browser console
- [ ] No errors in terminal (where dev server is running)

---

## 🆘 Still Not Working?

1. **Check the error message** (now visible on the signup page!)
2. **Check browser console** (F12 → Console tab)
3. **Check terminal** (where `npm run dev` is running)
4. **Check Supabase Dashboard**:
   - Authentication → Users (see if user was created)
   - Table Editor → profiles (see if profile was created)
   - SQL Editor → Check for any error logs

5. **Share the error message** you see, and I can help you fix it!

---

## ✅ What Should Happen

When signup works correctly:

1. Fill in signup form
2. Click "Sign Up"
3. **No error message appears**
4. Page redirects to `/dashboard`
5. You see your dashboard
6. In Supabase Dashboard:
   - **Authentication** → **Users**: Your user appears
   - **Table Editor** → **profiles**: Your profile appears automatically

---

**The error messages will now help you identify exactly what's wrong!** 🎯

